# AI Clients & Funnels — studio conventions

Standalone multi-client funnel studio. One Astro site (`web/`) hosts every client under its own
path. Each client has a persona, a brand/design system, and a set of funnels. Nothing here depends
on any other project.

## Layout

```
clients/<slug>/            persona.md · brand.md · offer.md · funnels/<type>.md   (strategy + copy, source of truth)
design/TOKENS.md           the token contract every client theme must satisfy
design/contrast.mjs        WCAG AA check:  node design/contrast.mjs web/src/styles/clients/<slug>.css
funnels/blueprints/<type>/ page map + copy framework + component list per funnel type
web/                       Astro 7 · Tailwind v4 · @astrojs/cloudflare · Stripe · Resend · PostHog
  src/styles/base.css      @theme defaults (the contract) — imports every clients/<slug>.css
  src/styles/clients/      :root[data-client="<slug>"] { token overrides }  ← ONLY place a client's colors live
  src/lib/clients.ts       client registry (name, fonts, calendar, lead magnet, funnels list)
  src/lib/funnels.ts       funnel types + page maps
  src/layouts/FunnelLayout.astro   every funnel page; sets data-client, fonts, SEO, analytics, no nav
  src/components/ui/       Button Input Card Badge Section Container Eyebrow  (token-driven primitives)
  src/components/funnel/   Hero VideoPlayer OptInForm CalendarEmbed CheckoutForm OrderBump OneClickOffer
                           PriceCard Benefits Steps Testimonials FAQ Guarantee Countdown StickyCTA CTASection ThankYou Footer Analytics
  src/pages/<slug>/<funnel>/…      funnel pages (prerendered)
  src/pages/<slug>/design-system.astro   living gallery of that client's tokens/components
  src/pages/api/           lead.ts · checkout.ts · upsell.ts · webhooks/stripe.ts  (SSR on Workers)
  public/<slug>/           favicon.svg, assets/ (lead magnets, posters, images)
```

## Rules

- **URL rule**: everything for a client lives under `/<slug>/…`. Funnel pages: `/<slug>/<funnel-type>/<page>`.
- **Tokens only**: components and pages use semantic utilities (`bg-bg`, `text-fg`, `bg-primary`,
  `text-primary-fg`, `border-border`, `font-display`, `rounded-lg`, `shadow-card` …). Never raw colors,
  never `bg-blue-500`, never hex in a page. The default palette is disabled (`--color-*: initial`), so
  a raw Tailwind color simply won't compile. Add a token to `design/TOKENS.md` + `base.css` if one is missing.
- **Client theme** = `web/src/styles/clients/<slug>.css` overriding contract variables under
  `:root[data-client='<slug>']`, imported in `base.css`. Fonts are declared in the registry and loaded by the layout.
- **No navigation on funnel pages.** One path forward. Legal links live in the footer only.
- **Every page has exactly one `<h1>`**, works at 390px without horizontal scroll, and passes the contrast script.
- **Astro routing**: files/folders starting with `_` are NOT routes (that's why the gallery is `design-system.astro`).
- **API routes** set `export const prerender = false`. Secrets come from `astro:env/server`; per-client
  Stripe prices from runtime env `STRIPE_PRICE_<CLIENT>_<KEY>` (see `src/lib/stripe.ts`).
- **Analytics**: call `window.funnel.track(event, props)` from client scripts. Standard events:
  `lead_captured`, `application_submitted`, `vsl_play`, `vsl_cta_revealed`, `checkout_started`,
  `offer_accepted`, `offer_declined`, `booking_confirmed`.

## Funnel types and page maps (see `funnels/blueprints/`)

| type | pages |
|---|---|
| `ebook` | `/` opt-in → `/thanks` |
| `calendar` | `/` → `/book` → `/confirmed` |
| `vsl-call` | `/` VSL → `/apply` → `/book` → `/confirmed` |
| `vsl-checkout` | `/` VSL → `/checkout` → `/upsell` → `/downsell` → `/thanks` |
| `checkout` | `/` sales page → `/checkout` (+bump) → `/upsell` → `/downsell` → `/thanks` |

Checkout flow: `CheckoutForm` → `/api/checkout` → Stripe Checkout (card saved with
`setup_future_usage: off_session`) → `/upsell?session_id=` → `OneClickOffer` posts to `/api/upsell`
which charges the saved card → `/downsell` → `/thanks`.

## Commands (repo skills in `.claude/skills/`)

| command | use |
|---|---|
| `/new-client <slug> "<Name>"` | scaffold `clients/<slug>/`, theme file, registry entry, pages folder, favicon |
| `/persona <slug>` | interview → `clients/<slug>/persona.md` |
| `/design <slug> [init\|tokens\|components\|review]` | brand brief → tokens → gallery → review |
| `/new-funnel <slug> <type>` | copy blueprint, write copy brief, generate pages |
| `/funnel-review <slug> <funnel>` | Playwright pass: brand, CRO, a11y, performance |
| `/deploy` | build + `wrangler deploy` |

Plugin skills worth reaching for: `frontend-design` (visual quality), `design:design-critique`,
`design:accessibility-review`, `marketing:draft-content` / `marketing:email-sequence`,
`brand-voice:*`, `searchfit-seo:on-page-seo`, `stripe:*`, `resend:*`, `cloudflare:wrangler`, `posthog`.

## Dev

```
cd web
pnpm dev                 # http://localhost:4321   (/ is the internal index of clients + funnels)
pnpm check               # astro check (types)
pnpm build               # cloudflare adapter build → dist/
pnpm preview             # build + wrangler dev (real Workers runtime)
pnpm test                # Playwright: every registered funnel page @ mobile + desktop, screenshots in tests/__screenshots__
pnpm deploy              # build + wrangler deploy  (pnpm cf:login first)
node ../design/contrast.mjs src/styles/clients/<slug>.css
```
Local secrets: copy `web/.dev.vars.example` → `web/.dev.vars`. Production: `pnpm wrangler secret put <NAME>`.
