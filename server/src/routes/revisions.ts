import { Router } from 'express';
import { Property } from '../models/Property.js';
import { Revision, recordRevision } from '../models/Revision.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Strip Mongo bookkeeping fields before writing a snapshot back
function cleanSnapshot(before: Record<string, unknown>) {
  const { _id, __v, createdAt, updatedAt, ...data } = before;
  return data;
}

// GET /api/revisions/property/:propertyId — history of one property
router.get('/property/:propertyId', requireAuth, async (req, res) => {
  const revisions = await Revision.find({ propertyId: req.params.propertyId })
    .sort({ createdAt: -1 })
    .select('-before')
    .lean();
  res.json(revisions);
});

// GET /api/revisions/deleted — recently deleted properties (restorable)
router.get('/deleted', requireAuth, async (_req, res) => {
  const revisions = await Revision.find({ action: 'delete' })
    .sort({ createdAt: -1 })
    .limit(20)
    .select('-before')
    .lean();
  // Only offer restore for slugs that don't exist again already
  const slugs = revisions.map((r) => r.slug).filter(Boolean);
  const existing = await Property.find({ slug: { $in: slugs } })
    .select('slug')
    .lean();
  const taken = new Set(existing.map((p) => p.slug));
  res.json(revisions.filter((r) => !taken.has(r.slug)));
});

// POST /api/revisions/:id/revert — restore the snapshot
router.post('/:id/revert', requireAuth, async (req, res) => {
  const rev = await Revision.findById(req.params.id).lean();
  if (!rev) return res.status(404).json({ error: 'Revision not found' });
  const data = cleanSnapshot(rev.before as Record<string, unknown>);

  if (rev.action === 'delete') {
    // Bring the deleted property back as a new document
    if (await Property.findOne({ slug: data.slug })) {
      return res
        .status(409)
        .json({ error: 'A property with this slug already exists' });
    }
    const restored = await Property.create(data);
    return res.status(201).json(restored);
  }

  // action === 'update': snapshot the current state first, so the revert
  // itself can be undone, then write the old values back.
  const current = await Property.findById(rev.propertyId).lean();
  if (!current) {
    return res
      .status(404)
      .json({ error: 'Property no longer exists — restore it from Deleted first' });
  }
  await recordRevision('update', current);
  const restored = await Property.findByIdAndUpdate(rev.propertyId, data, {
    new: true,
    runValidators: true,
  });
  res.json(restored);
});

export default router;
