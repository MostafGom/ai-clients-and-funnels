import { test, expect } from '@playwright/test';
import { clients } from '../src/lib/clients';
import { funnelPages } from '../src/lib/funnels';

// Every registered client funnel page: loads, has one H1, no horizontal overflow, screenshot saved.
for (const client of clients) {
  test(`${client.slug} design-system`, async ({ page: p }, info) => {
    const res = await p.goto(`/${client.slug}/design-system`, { waitUntil: 'domcontentloaded' });
    expect(res?.ok()).toBeTruthy();
    await p.screenshot({ path: `tests/__screenshots__/${client.slug}/design-system.${info.project.name}.png`, fullPage: true });
  });
  for (const funnel of client.funnels) {
    for (const page of funnelPages(client.slug, funnel)) {
      test(`${client.slug} ${funnel} ${page}`, async ({ page: p }, info) => {
        // domcontentloaded: third-party embeds (Cal.com, video) may never fire 'load' in CI.
        const res = await p.goto(page, { waitUntil: 'domcontentloaded' });
        expect(res?.ok()).toBeTruthy();
        await expect(p.locator('main h1:not([data-calendar] *)')).toHaveCount(1); // scope to main: dev toolbar + embeds inject their own h1
        const overflow = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        expect(overflow, 'no horizontal scroll').toBeFalsy();
        await p.screenshot({ path: `tests/__screenshots__/${client.slug}/${funnel}${page.replace(/^.*\/(\w[\w-]*)\/?$/, '/$1')}.${info.project.name}.png`, fullPage: true });
      });
    }
  }
}
