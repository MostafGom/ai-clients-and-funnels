---
paths:
  - "web/src/components/**"
  - "web/src/layouts/**"
  - "web/src/styles/**"
  - "web/src/pages/**"
---

# UI and theme

> Token contract: the brand plugin's `references/contracts/<contract>.md` (studio.json `contract`). Layout and
> composition come from the design plan in the brand dir, not from other projects.

- **Tokens are the only source** of colours, fonts, radii and shadows (the token file in studio.json `tokens`).
  Need a new colour or role? Add a token named by role, not an arbitrary value (`bg-[#…]`). No hex in components;
  inline SVG uses `var(--color-…)` or `currentColor`.
- **Reusable classes** are Tailwind v4 `@utility` blocks in the token file. Use them before inventing new ones; add
  new shared patterns as `@utility`, not `@apply` sprawl in components.
- **Interactive feedback:** every clickable element has hover and visible focus states and a pointer cursor. Every
  async action disables its control, sets `aria-busy`, and shows a spinner on that control (not a page overlay).
- **Images:** explicit `alt` (from i18n when the site is multilingual), `width`/`height` or an `aspect-*` box,
  `loading="lazy"` below the fold, `fetchpriority="high"` on the hero. Their status (final / stand-in) is in the
  imagery manifest; illustrations are token-only SVG components.
- **Composition** follows the plan's section maps; no two neighbouring sections share a pattern. A deliberate
  deviation is written into the plan in the same change.
- Before calling UI work done: `node <brand plugin>/scripts/ui-lint.mjs` has no new errors (`/brand:review` runs it).
- **This repo:** a client's colours live only in `web/src/styles/clients/<slug>.css` under `[data-client='<slug>']`
  (contract in `design/TOKENS.md` + `base.css`). Email templates and `src/lib/resend.ts` keep inline hex because email
  clients don't support CSS variables; they're outside studio.json `lint.dirs` on purpose.
