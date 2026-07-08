import { Schema, model } from 'mongoose';

/**
 * A snapshot of a property taken just BEFORE an admin update or delete,
 * so any change can be undone from the admin UI.
 */
const RevisionSchema = new Schema(
  {
    propertyId: { type: String, required: true, index: true },
    slug: { type: String, default: '' },
    name: { type: String, default: '' }, // property name at snapshot time
    action: { type: String, enum: ['update', 'delete'], required: true },
    before: { type: Schema.Types.Mixed, required: true }, // full doc pre-change
  },
  { timestamps: true }
);

export const Revision = model('Revision', RevisionSchema);

const KEEP_PER_PROPERTY = 20;

/** Snapshot a property document before it is changed or deleted. */
export async function recordRevision(
  action: 'update' | 'delete',
  doc: { _id: unknown; slug?: string; name?: string }
) {
  await Revision.create({
    propertyId: String(doc._id),
    slug: doc.slug || '',
    name: doc.name || '',
    action,
    before: doc,
  });
  // Bound storage: keep only the most recent snapshots per property
  const stale = await Revision.find({ propertyId: String(doc._id) })
    .sort({ createdAt: -1 })
    .skip(KEEP_PER_PROPERTY)
    .select('_id')
    .lean();
  if (stale.length) {
    await Revision.deleteMany({ _id: { $in: stale.map((s) => s._id) } });
  }
}
