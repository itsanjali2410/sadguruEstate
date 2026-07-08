/**
 * One-time migration: load the existing hardcoded properties from
 * ../../../src/data/properties.ts into MongoDB.
 *
 *   npm run migrate            # insert missing, skip existing
 *   npm run migrate -- --wipe  # delete all properties first, then insert
 *
 * Image paths (e.g. "/properties/foo.webp") are kept as-is — they still
 * resolve from the frontend's public/ folder. The owner can later replace
 * them with Cloudinary uploads via the admin panel.
 */
import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import { Property } from '../models/Property.js';

type OldProperty = {
  id: string;
  name: string;
  developer?: string;
  location?: string;
  type?: string;
  category?: 'buy' | 'rent' | 'commercial';
  price?: string;
  size?: string;
  carpetArea?: string;
  superArea?: string;
  possession?: string;
  status?: string;
  featured?: boolean;
  verified?: boolean;
  amenities?: string[];
  description?: string;
  image?: string;
  gallery?: string[];
  video?: string;
  links?: { label: string; url: string }[];
  contact?: { name: string; phone: string };
  configurations?: { type: string; size: string; price: string }[];
};

async function loadOldProperties(): Promise<OldProperty[]> {
  // Dynamic import so tsc doesn't pull frontend code into the server build.
  const url = new URL('../../../src/data/properties.ts', import.meta.url).href;
  const mod: any = await import(url);
  return mod.properties as OldProperty[];
}

function toDoc(p: OldProperty) {
  return {
    slug: p.id,
    name: p.name,
    developer: p.developer || '',
    location: p.location || '',
    type: p.type || '',
    category: p.category || 'buy',
    price: p.price || '',
    size: p.size || '',
    carpetArea: p.carpetArea || '',
    superArea: p.superArea || '',
    possession: p.possession || '',
    status: p.status || '',
    featured: Boolean(p.featured),
    verified: Boolean(p.verified),
    amenities: p.amenities || [],
    description: p.description || '',
    image: p.image || '',
    gallery: p.gallery || [],
    video: p.video || '',
    links: p.links || [],
    contact: p.contact || { name: '', phone: '' },
    configurations: p.configurations || [],
    brochureUrl: '',
    published: true,
    details: {},
  };
}

async function run() {
  const wipe = process.argv.includes('--wipe');
  await connectDB();

  if (wipe) {
    const { deletedCount } = await Property.deleteMany({});
    console.log(`✗ Wiped ${deletedCount} existing properties`);
  }

  const old = await loadOldProperties();
  console.log(`Found ${old.length} properties in properties.ts`);

  let created = 0;
  let skipped = 0;
  for (const p of old) {
    if (!p.id || !p.name) {
      skipped++;
      continue;
    }
    const exists = await Property.findOne({ slug: p.id });
    if (exists) {
      skipped++;
      continue;
    }
    await Property.create(toDoc(p));
    created++;
  }

  console.log(`✓ Migration done — created ${created}, skipped ${skipped}`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
