import { Router } from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PDFParse } from 'pdf-parse';
import { config } from '../config.js';
import { requireAuth } from '../middleware/auth.js';
import { parseBrochureText } from '../lib/brochureParser.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

const PROMPT = `You are extracting real-estate listing data from a property brochure PDF.
Return ONLY a JSON object with these fields (omit a field entirely if the brochure doesn't mention it):
{
  "name": "project name",
  "developer": "builder/developer name",
  "location": "locality name only, e.g. Nerul, Panvel, Kharghar, Ulwe, Taloja",
  "type": "one of: Residential, Commercial, Office Spaces, Residential Township",
  "category": "one of: buy, rent, commercial (commercial for offices/shops, otherwise buy)",
  "price": "starting price as shown, e.g. ₹42 Lakhs+",
  "size": "size range, e.g. 450 - 900 sq.ft",
  "carpetArea": "carpet area if stated",
  "possession": "possession date/status, e.g. Dec 2026",
  "status": "e.g. New Launch, Under Construction, Ready to Move",
  "description": "2-3 sentence summary of the project written for a property listing",
  "amenities": ["list", "of", "amenities"],
  "configurations": [{"type": "1 BHK", "size": "450 sq.ft", "price": "₹40 Lakhs"}],
  "contact": {"name": "", "phone": ""},
  "details": {"RERA No": "...", "any other key facts": "..."}
}
Use Indian price formatting (Lakhs/Cr) as printed in the brochure. Do not invent data.`;

/** No-AI fallback: extract the PDF's text and parse fields heuristically. */
async function scriptExtract(buffer: Buffer) {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const { text } = await parser.getText();
    if (text.trim().length < 100) {
      return null; // scanned/image-only PDF — nothing to parse
    }
    return parseBrochureText(text);
  } finally {
    await parser.destroy();
  }
}

// POST /api/extract/brochure  (field: "file")  — PDF → property fields.
// Uses Gemini when GEMINI_API_KEY is set; otherwise a local script parser.
router.post('/brochure', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'Only PDF brochures are supported' });
  }

  if (!config.gemini.apiKey) {
    const fields = await scriptExtract(req.file.buffer);
    if (!fields) {
      return res.status(422).json({
        error:
          'This brochure has no readable text (scanned/image PDF). Add a GEMINI_API_KEY in server/.env to read image-based brochures.',
      });
    }
    return res.json(fields);
  }

  const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
  const model = genAI.getGenerativeModel({
    model: config.gemini.model,
    generationConfig: { responseMimeType: 'application/json' },
  });

  let result;
  try {
    result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: req.file.buffer.toString('base64'),
        },
      },
      PROMPT,
    ]);
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status === 429 || status === 400 || status === 403) {
      // Quota hit or key problem — fall back to the local script parser
      console.warn(`Gemini unavailable (${status}), using script parser`);
      const fields = await scriptExtract(req.file.buffer);
      if (fields) return res.json(fields);
      return res.status(status === 429 ? 429 : 502).json({
        error:
          status === 429
            ? `Gemini free-tier quota reached for "${config.gemini.model}" and this PDF has no readable text. Wait a minute, or set GEMINI_MODEL=gemini-2.0-flash-lite in server/.env.`
            : 'Gemini rejected the request (check GEMINI_API_KEY) and this PDF has no readable text.',
      });
    }
    throw err;
  }

  const text = result.response.text().replace(/^```(json)?|```$/g, '').trim();
  let fields: Record<string, unknown>;
  try {
    fields = JSON.parse(text);
  } catch {
    return res.status(502).json({ error: 'AI returned unreadable data — try again' });
  }

  res.json(fields);
});

export default router;
