import { Schema, model, InferSchemaType } from 'mongoose';

/**
 * Property schema.
 *
 * A small fixed CORE (the fields every listing has) plus a flexible
 * `details` map for the parts that vary from one brochure/PDF to the next.
 * `strict: false` also lets us keep any extra fields a bulk import brings in
 * without losing data.
 */
const ConfigurationSchema = new Schema(
  {
    type: String,
    size: String,
    price: String,
  },
  { _id: false }
);

const LinkSchema = new Schema(
  {
    label: String,
    url: String,
  },
  { _id: false }
);

const PropertySchema = new Schema(
  {
    // Human-friendly slug used by the frontend routes (kept from properties.ts)
    slug: { type: String, required: true, unique: true, index: true },

    // ── Core ──────────────────────────────────────────────
    name: { type: String, required: true },
    developer: { type: String, default: '' },
    location: { type: String, default: '', index: true },
    type: { type: String, default: '' },
    category: {
      type: String,
      enum: ['buy', 'rent', 'commercial'],
      default: 'buy',
      index: true,
    },
    price: { type: String, default: '' },
    description: { type: String, default: '' },

    // ── Media ─────────────────────────────────────────────
    image: { type: String, default: '' }, // main image URL (Cloudinary)
    gallery: { type: [String], default: [] },
    video: { type: String, default: '' },
    brochureUrl: { type: String, default: '' }, // uploaded PDF (Cloudinary)

    // ── Flags ─────────────────────────────────────────────
    featured: { type: Boolean, default: false, index: true },
    verified: { type: Boolean, default: false },
    status: { type: String, default: '' }, // e.g. "New Launch"
    published: { type: Boolean, default: true, index: true },

    // ── Common-but-optional structured fields ─────────────
    size: { type: String, default: '' },
    carpetArea: { type: String, default: '' },
    superArea: { type: String, default: '' },
    possession: { type: String, default: '' },
    amenities: { type: [String], default: [] },
    configurations: { type: [ConfigurationSchema], default: [] },
    links: { type: [LinkSchema], default: [] },
    contact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
    },

    // ── Flexible bucket for anything that isn't uniform ───
    // e.g. { "RERA No": "...", "Bank Approvals": "...", ... }
    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, strict: false }
);

export type PropertyDoc = InferSchemaType<typeof PropertySchema>;
export const Property = model('Property', PropertySchema);
