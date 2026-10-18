---
name: deploy
description: Build the Astro site and deploy it to Cloudflare Workers with wrangler, checking secrets first. Use when the user asks to deploy, publish, or ship the funnels.
disable-model-invocation: true
---

# /deploy

1. `pnpm --dir web wrangler whoami`; if not logged in, ask the user to run `! pnpm --dir web wrangler login` and wait.
2. `pnpm --dir web check && pnpm --dir web build`. Stop on errors.
3. `pnpm --dir web wrangler secret list` — compare with the keys in `web/.dev.vars.example`. For any missing secret, tell the user the exact command: `pnpm --dir web wrangler secret put <NAME>`. Never print secret values.
4. `pnpm --dir web wrangler deploy`. Report the URL and remind: register `<url>/api/webhooks/stripe` in Stripe for `checkout.session.completed`, and set `PUBLIC_SITE_URL` in `wrangler.jsonc` vars to the real domain.
