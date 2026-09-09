import { app, ready } from './app.js';
import { config, assertConfig } from './config.js';

async function start() {
  assertConfig();
  await ready();
  app.listen(config.port, () => {
    console.log(`✓ API listening on http://localhost:${config.port}`);
  });
}

start().catch((e) => {
  console.error('Failed to start server:', e);
  process.exit(1);
});
