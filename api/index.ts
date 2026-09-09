// Vercel serverless entrypoint. Wraps the existing Express app so every
// /api/* request is served from the same origin as the site — no CORS.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app, ready } from '../server/src/app.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Lambdas freeze between invocations: reuse the Mongo connection rather
  // than opening a new one per request.
  await ready();
  return app(req as never, res as never);
}
