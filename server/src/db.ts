import mongoose from 'mongoose';
import { config } from './config.js';

/**
 * Connect to MongoDB, reusing an existing live connection.
 *
 * We check mongoose's real connection state rather than latching a boolean:
 * a serverless container can stay warm across a cluster restart (e.g. an
 * Atlas cluster being paused and resumed), and a cached "connected" flag
 * would keep it serving a dead socket forever instead of reconnecting.
 */
export async function connectDB(): Promise<typeof mongoose> {
  // 1 = connected, 2 = connecting — both are usable.
  const state = mongoose.connection.readyState;
  if (state === 1) return mongoose;
  if (state === 2) {
    await mongoose.connection.asPromise();
    return mongoose;
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri, {
    // Fail fast instead of hanging until the platform kills the request,
    // so a paused/unreachable cluster surfaces as a clear 503.
    serverSelectionTimeoutMS: 10000,
  });
  console.log('✓ MongoDB connected');
  return mongoose;
}
