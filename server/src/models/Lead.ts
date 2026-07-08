import { Schema, model, InferSchemaType } from 'mongoose';

const LeadSchema = new Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, required: true },
    message: { type: String, default: '' },

    // What kind of submission this was
    formType: {
      type: String,
      enum: ['contact', 'property_inquiry', 'quick_info', 'brochure_download'],
      default: 'contact',
    },

    // Optional link back to a property
    propertySlug: { type: String, default: '' },
    propertyName: { type: String, default: '' },

    // Free-form extras (location interest, propertyType, source page, ...)
    meta: { type: Schema.Types.Mixed, default: {} },

    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true }
);

export type LeadDoc = InferSchemaType<typeof LeadSchema>;
export const Lead = model('Lead', LeadSchema);
