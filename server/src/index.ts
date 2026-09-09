import { app, ready } from './app.js';
import { config } from './config.js';

async function start() {
  await ready();
  app.listen(config.port, () => {
    console.log(`✓ API listening on http://localhost:${config.port}`);
  });
}

start().catch((e) => {
  console.error('Failed to start server:', e);
  process.exit(1);
});
