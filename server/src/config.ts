import 'dotenv/config';

/** Env vars that are missing at import time; reported by /api/health. */
export const missingEnv: string[] = [];

// Throwing here would kill the serverless function during module import,
// before any route runs — the client then sees an opaque crash with no clue
// which variable is missing. Record it instead and let the request handler
// report it. The local server still refuses to start (see assertConfig).
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    missingEnv.push(name);
    return '';
  }
  return value;
}

/** Fail fast in long-running (non-serverless) processes. */
export function assertConfig(): void {
  if (missingEnv.length) {
    throw new Error(
      `Missing required env var(s): ${missingEnv.join(', ')}. See server/.env.example`
    );
  }
}

export const config = {
  mongoUri: required('MONGODB_URI'),
  jwtSecret: required('JWT_SECRET'),
  admin: {
    email: (process.env.ADMIN_EMAIL || '').toLowerCase().trim(),
    password: process.env.ADMIN_PASSWORD || '',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  },
  port: Number(process.env.PORT) || 4000,
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    notifyTo: process.env.LEAD_NOTIFY_TO || process.env.ADMIN_EMAIL || '',
  },
};
