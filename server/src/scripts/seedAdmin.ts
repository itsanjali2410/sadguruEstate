/**
 * Creates (or updates the password of) the single owner admin account
 * using ADMIN_EMAIL / ADMIN_PASSWORD from server/.env.
 *
 *   npm run seed:admin
 */
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { connectDB } from '../db.js';
import { Admin } from '../models/Admin.js';
import mongoose from 'mongoose';

async function run() {
  if (!config.admin.email || !config.admin.password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env first');
  }
  await connectDB();

  const passwordHash = await bcrypt.hash(config.admin.password, 12);
  const existing = await Admin.findOne({ email: config.admin.email });

  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`✓ Updated password for admin: ${config.admin.email}`);
  } else {
    await Admin.create({ email: config.admin.email, passwordHash });
    console.log(`✓ Created admin: ${config.admin.email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
