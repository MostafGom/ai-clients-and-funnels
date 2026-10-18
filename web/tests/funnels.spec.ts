import { test, expect } from '@playwright/test';
import { clients } from '../src/lib/clients';
import { funnelPages } from '../src/lib/funnels';

// Every registered client funnel page: loads, has one H1, no horizontal overflow, screenshot saved.
for (const client of clients) {
  for (const funnel of client.funnels) {
    for (const page of funnelPages(client.slug, funnel)) {
      test(`${client.slug} ${funnel} ${page}`, async ({ page: p }, info) => {
        // domcontentloaded: third-party embeds (Cal.com, video) may never fire 'load' in CI.
        const res = await p.goto(page, { waitUntil: 'domcontentloaded' });
        expect(res?.ok()).toBeTruthy();
        await expect(p.locator('h1:not([data-calendar] *)')).toHaveCount(1); // third-party embeds may inject their own h1
        const overflow = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        expect(overflow, 'no horizontal scroll').toBeFalsy();
        await p.screenshot({ path: `tests/__screenshots__/${client.slug}/${funnel}${page.replace(/^.*\/(\w[\w-]*)\/?$/, '/$1')}.${info.project.name}.png`, fullPage: true });
      });
    }
  }
}
