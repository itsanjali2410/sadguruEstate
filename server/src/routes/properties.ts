import { Router } from 'express';
import { Property } from '../models/Property.js';
import { recordRevision } from '../models/Revision.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// ── PUBLIC ────────────────────────────────────────────────────

// GET /api/properties  — list (published only), with optional filters
// ?category=buy&location=Nerul&featured=true&search=raheja
router.get('/', async (req, res) => {
  const q: Record<string, unknown> = { published: true };
  if (req.query.category) q.category = req.query.category;
  if (req.query.location) q.location = req.query.location;
  if (req.query.featured === 'true') q.featured = true;

  let query = Property.find(q).sort({ createdAt: -1 });
  const properties = await query.lean();

  const search = String(req.query.search || '').toLowerCase().trim();
  const filtered = search
    ? properties.filter((p) =>
        [p.name, p.developer, p.location, p.description]
          .join(' ')
          .toLowerCase()
          .includes(search)
      )
    : properties;

  res.json(filtered);
});

// GET /api/properties/:slug — single property
router.get('/:slug', async (req, res) => {
  const property = await Property.findOne({
    slug: req.params.slug,
    published: true,
  }).lean();
  if (!property) return res.status(404).json({ error: 'Not found' });
  res.json(property);
});

// ── ADMIN (auth required) ─────────────────────────────────────

// GET /api/properties/admin/all — every property incl. unpublished
router.get('/admin/all', requireAuth, async (_req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 }).lean();
  res.json(properties);
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// POST /api/properties — create
router.post('/', requireAuth, async (req, res) => {
  const body = { ...req.body };
  if (!body.slug && body.name) body.slug = slugify(body.name);
  if (!body.slug) return res.status(400).json({ error: 'name or slug required' });

  const exists = await Property.findOne({ slug: body.slug });
  if (exists) body.slug = `${body.slug}-${Date.now().toString().slice(-5)}`;

  const property = await Property.create(body);
  res.status(201).json(property);
});

// PUT /api/properties/:id — update (snapshots the old version first)
router.put('/:id', requireAuth, async (req, res) => {
  const existing = await Property.findById(req.params.id).lean();
  if (!existing) return res.status(404).json({ error: 'Not found' });
  await recordRevision('update', existing);

  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json(property);
});

// DELETE /api/properties/:id — (snapshots the doc so it can be restored)
router.delete('/:id', requireAuth, async (req, res) => {
  const existing = await Property.findById(req.params.id).lean();
  if (!existing) return res.status(404).json({ error: 'Not found' });
  await recordRevision('delete', existing);

  await Property.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
