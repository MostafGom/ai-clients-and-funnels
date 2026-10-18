// @ts-check
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static by default: every funnel page is prerendered at build time.
// API routes (src/pages/api/**) opt out with `export const prerender = false`
// and run on Cloudflare Workers (Stripe, Resend, webhooks).
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://funnels.example.com',
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [
    sitemap({
      // Internal pages never go in the sitemap.
      filter: (page) => !page.includes('/design-system') && !/\/(upsell|downsell|thanks|confirmed)\/?$/.test(page) && page !== (process.env.PUBLIC_SITE_URL || 'https://funnels.example.com') + '/',
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_POSTHOG_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_POSTHOG_HOST: envField.string({ context: 'client', access: 'public', optional: true, default: 'https://us.i.posthog.com' }),
      STRIPE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      STRIPE_WEBHOOK_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
