// Vercel serverless entrypoint. Wraps the existing Express app so every
// /api/* request is served from the same origin as the site — no CORS.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app, ready } from '../server/src/app.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Lambdas freeze between invocations: reuse the Mongo connection rather
    // than opening a new one per request.
    await ready();
  } catch (e) {
    // A DB failure used to crash the whole function, which surfaced as an
    // opaque platform error. Report it as JSON so the cause is visible.
    console.error('DB connection failed:', e);
    return res.status(503).json({
      error: 'Database unavailable',
      detail: e instanceof Error ? e.message : String(e),
    });
  }
  return app(req as never, res as never);
}
