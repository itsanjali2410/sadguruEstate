import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectDB } from './db.js';

import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import leadRoutes from './routes/leads.js';
import uploadRoutes from './routes/upload.js';
import importRoutes from './routes/import.js';
import extractRoutes from './routes/extract.js';
import revisionRoutes from './routes/revisions.js';

const app = express();

// Behind Render's proxy: trust X-Forwarded-For so rate limiting sees the
// real client IP, not the proxy's.
app.set('trust proxy', 1);

app.use(
  cors({
    origin: config.corsOrigins.length ? config.corsOrigins : true,
  })
);
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

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

async function start() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`✓ API listening on http://localhost:${config.port}`);
  });
}

start().catch((e) => {
  console.error('Failed to start server:', e);
  process.exit(1);
});
