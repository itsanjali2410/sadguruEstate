import { Router } from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import { Property } from '../models/Property.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Known columns map directly; everything else is dropped into `details`.
const CORE_FIELDS = new Set([
  'name',
  'developer',
  'location',
  'type',
  'category',
  'price',
  'size',
  'possession',
  'status',
  'description',
  'image',
  'featured',
  'verified',
]);

function toBool(v: unknown): boolean {
  return ['true', 'yes', '1', 'y'].includes(String(v).toLowerCase().trim());
}

// POST /api/import  (field: "file")  — Excel/CSV bulk create
// Returns { created, skipped, errors: [{ row, reason }] }
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });

  let rows: Record<string, unknown>[];
  try {
    const wb = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  } catch {
    return res.status(400).json({ error: 'Could not parse file' });
  }

  let created = 0;
  let skipped = 0;
  const errors: { row: number; reason: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i];
    const name = String(raw.name || raw.Name || '').trim();
    if (!name) {
      skipped++;
      errors.push({ row: i + 2, reason: 'Missing name' });
      continue;
    }

    const doc: Record<string, unknown> = { details: {} };
    for (const [key, value] of Object.entries(raw)) {
      const k = key.trim();
      if (value === '' || value == null) continue;
      const lower = k.toLowerCase();
      if (lower === 'featured' || lower === 'verified') {
        doc[lower] = toBool(value);
      } else if (CORE_FIELDS.has(lower)) {
        doc[lower] = value;
      } else {
        (doc.details as Record<string, unknown>)[k] = value;
      }
    }

    let slug = slugify(name);
    if (await Property.findOne({ slug })) slug = `${slug}-${Date.now().toString().slice(-5)}`;
    doc.slug = slug;

    try {
      await Property.create(doc);
      created++;
    } catch (e) {
      skipped++;
      errors.push({ row: i + 2, reason: (e as Error).message });
    }
  }

  res.json({ created, skipped, total: rows.length, errors });
});

export default router;
