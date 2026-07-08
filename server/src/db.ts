import mongoose from 'mongoose';
import { config } from './config.js';

let connected = false;

export async function connectDB(): Promise<typeof mongoose> {
  if (connected) return mongoose;
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri);
  connected = true;
  console.log('✓ MongoDB connected');
  return mongoose;
}
