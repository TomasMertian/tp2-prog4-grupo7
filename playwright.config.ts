import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  retries: 1,
  reporter: [['html'], ['list']],
  outputDir: 'playwright-results',

  use: {
    baseURL: 'http://localhost:4000',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run start:e2e',
    url: 'http://localhost:4000/health',
    reuseExistingServer: true,
    timeout: 20_000
  }
});
