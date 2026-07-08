import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';
import { uploadBuffer, cloudinaryReady } from '../lib/cloudinary.js';

const router = Router();

// Keep files in memory; we stream the buffer straight to Cloudinary.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB (brochures can be large)
});

// POST /api/upload/image   (field: "file")  → single image
router.post('/image', requireAuth, upload.single('file'), async (req, res) => {
  if (!cloudinaryReady())
    return res.status(503).json({ error: 'Cloudinary not configured' });
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const result = await uploadBuffer(req.file.buffer, 'sadguru/images', 'image');
  res.json(result);
});

// POST /api/upload/images  (field: "files")  → gallery (multiple)
router.post(
  '/images',
  requireAuth,
  upload.array('files', 20),
  async (req, res) => {
    if (!cloudinaryReady())
      return res.status(503).json({ error: 'Cloudinary not configured' });
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) return res.status(400).json({ error: 'No files' });
    const results = await Promise.all(
      files.map((f) => uploadBuffer(f.buffer, 'sadguru/images', 'image'))
    );
    res.json(results);
  }
);

// POST /api/upload/brochure  (field: "file")  → PDF / document
router.post(
  '/brochure',
  requireAuth,
  upload.single('file'),
  async (req, res) => {
    if (!cloudinaryReady())
      return res.status(503).json({ error: 'Cloudinary not configured' });
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const result = await uploadBuffer(
      req.file.buffer,
      'sadguru/brochures',
      'raw'
    );
    res.json(result);
  }
);

export default router;
