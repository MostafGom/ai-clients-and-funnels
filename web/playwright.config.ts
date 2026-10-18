import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: process.env.BASE_URL || 'http://localhost:4321', trace: 'retain-on-failure' },
  webServer: process.env.BASE_URL
    ? undefined
    : // Tests run against the real production build on the Workers runtime (astro dev daemonizes without a TTY).
      { command: 'pnpm astro build && pnpm wrangler dev --port 4321', url: 'http://localhost:4321/', reuseExistingServer: true, timeout: 180_000 },
  projects: [
    { name: 'mobile', use: { ...devices['iPhone 14'], browserName: 'chromium' } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
});
