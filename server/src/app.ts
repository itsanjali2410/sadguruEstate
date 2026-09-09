import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config, missingEnv } from './config.js';
import { connectDB } from './db.js';

import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import leadRoutes from './routes/leads.js';
import uploadRoutes from './routes/upload.js';
import importRoutes from './routes/import.js';
import extractRoutes from './routes/extract.js';
import revisionRoutes from './routes/revisions.js';

export const app = express();

// Behind Render's/Vercel's proxy: trust X-Forwarded-For so rate limiting
// sees the real client IP, not the proxy's.
app.set('trust proxy', 1);

// Served same-origin in production, so CORS only matters for the local
// Vite dev server on :5173. An empty CORS_ORIGINS reflects any origin.
app.use(
  cors({
    origin: config.corsOrigins.length ? config.corsOrigins : true,
  })
);
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  if (missingEnv.length) {
    return res.status(500).json({
      ok: false,
      error: 'Missing environment variables',
      missing: missingEnv,
    });
  }
  res.json({ ok: true, db: mongoose.connection.readyState === 1 });
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/import', importRoutes);
app.use('/api/extract', extractRoutes);
app.use('/api/revisions', revisionRoutes);

// Central error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
);

// Serverless invocations reuse a warm container: connect once and hand
// every later call the same in-flight promise.
let connecting: Promise<unknown> | null = null;

export function ready(): Promise<unknown> {
  if (missingEnv.length) return Promise.resolve(null);
  if (!connecting) {
    // Reset on failure so a later invocation can retry instead of being
    // stuck with a permanently rejected promise.
    connecting = connectDB().catch((e) => {
      connecting = null;
      throw e;
    });
  }
  return connecting;
}
