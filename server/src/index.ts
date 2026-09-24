import { app, ready } from './app.js';
import { config, assertConfig } from './config.js';
import { mailReady } from './lib/mailer.js';

async function start() {
  assertConfig();
  if (!mailReady()) {
    console.warn('⚠ SMTP not configured — lead notification emails are disabled');
  }
  await ready();
  app.listen(config.port, () => {
    console.log(`✓ API listening on http://localhost:${config.port}`);
  });
}

start().catch((e) => {
  console.error('Failed to start server:', e);
  process.exit(1);
});
