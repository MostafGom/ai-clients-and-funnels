---
name: funnel-review
description: Review a client's funnel in a real browser at mobile and desktop widths — brand fit, token-only styling, conversion (CRO) checklist, accessibility, performance hints — and report ranked findings with fixes. Use before sending traffic, after copy or design changes, or when asked how a funnel looks.
argument-hint: "<slug> <funnel-type>"
---

# /funnel-review

Arguments: `$ARGUMENTS` → `<slug> <type>`. Pages come from `FUNNELS[type].pages` in `web/src/lib/funnels.ts`.

1. Start the dev server if not running: `pnpm --dir web astro dev --background` (check `astro dev status`).
2. For each page, with the Playwright MCP: open at 390×844 and 1440×900, full-page screenshot, check console errors, confirm exactly one `h1`, no horizontal scroll, every form has labels, every interactive element has a visible focus state (Tab through the first 8).
3. **CRO checklist** per page: headline states outcome + for whom; one primary CTA per screen (sticky counts as the same); proof within first viewport on start pages; friction (fields, steps) justified; price anchoring present on offer pages; thank-you pages push exactly one next step; upsell/downsell have a clear decline path.
4. **Brand**: compare against `clients/<slug>/brand.md` do/don't list; grep the pages for raw colors (see `/design review`).
5. **Performance**: fonts preconnected, VSL click-to-play (no autoplaying iframe), images sized, no layout shift on reveal.
6. Report: ranked findings (severity: blocks launch / should fix / polish), each with the file and a concrete fix. Offer to apply. Use `design:design-critique`, `design:accessibility-review`, and `searchfit-seo:on-page-seo` for depth where useful.
