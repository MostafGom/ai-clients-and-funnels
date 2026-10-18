---
name: new-client
description: Scaffold a new client in the funnel studio — clients/<slug>/ docs from templates, theme CSS, registry entry in web/src/lib/clients.ts, pages folder, favicon, and design-system gallery page. Use when onboarding a client before any funnel work.
argument-hint: "<slug> \"<Client Name>\""
disable-model-invocation: true
---

# /new-client

Arguments: `$ARGUMENTS` → `<slug>` (lowercase, dashes) and `"<Client Name>"`.

1. Refuse if `clients/<slug>/` or `web/src/pages/<slug>/` exists.
2. Copy `clients/_template/{persona.md,brand.md,offer.md,funnels/}` → `clients/<slug>/`, replacing `<slug>` / `<Client Name>` / `<SLUG>` placeholders.
3. Copy `clients/_template/theme.css` → `web/src/styles/clients/<slug>.css` (replace `<slug>`), and add `@import './clients/<slug>.css';` after the demo import in `web/src/styles/base.css`.
4. Append a client entry to `clients` in `web/src/lib/clients.ts` (copy the demo entry shape; `funnels: []`; placeholder calendar URL; supportEmail from the user if given).
5. `mkdir -p web/src/pages/<slug> web/public/<slug>/assets`; copy `web/src/pages/demo/{design-system,privacy,terms}.astro` into it and change `'demo'` → `'<slug>'`.
6. Write `web/public/<slug>/favicon.svg` (monogram, uses a placeholder primary; `/design` will recolor).
7. Add placeholder lines to `web/.dev.vars.example` for `STRIPE_PRICE_<SLUG>_{MAIN,BUMP,UPSELL,DOWNSELL}`.
8. `pnpm --dir web check && pnpm --dir web build`. Report the created paths and suggest the next steps: `/persona <slug>` → `/design <slug> init` → `/new-funnel <slug> <type>`.
