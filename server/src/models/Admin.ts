import { Schema, model, InferSchemaType } from 'mongoose';

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export type AdminDoc = InferSchemaType<typeof AdminSchema>;
export const Admin = model('Admin', AdminSchema);
