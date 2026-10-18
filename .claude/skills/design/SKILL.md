---
name: design
description: In-repo design-system manager for a client. `/design <slug> init` turns clients/<slug>/brand.md into Tailwind v4 tokens, `tokens` edits them, `components` refreshes the /<slug>/design-system gallery, `review` runs contrast + Playwright screenshots and reports token violations. Use whenever a client's look is being created, changed, or audited.
argument-hint: "<slug> [init|tokens|components|review]"
---

# /design — client design system (lives in this repo)

Arguments: `$ARGUMENTS` → `<slug>` and a mode (default `review` if the theme exists, `init` if not).
Read `design/TOKENS.md` first. Never introduce raw colors; only contract tokens.

## init
0. Run `/art-direction <slug> moodboard`, then `plan`: category energy, type chosen from its pairing table, shot list, signature moment and section maps go into DESIGN-PLAN.md. Run `/photos <slug>` for the shot list. Then write `clients/<slug>/DESIGN-PLAN.md` first, in the `frontend-design` format: the subject's world, named hex palette (4–6) with roles, type roles and scale, ASCII wireframes per page template, the one motion moment, the illustration system to build in `web/src/components/clients/<slug>/art/`, and a "what we removed" list. Reference: `clients/lumen/DESIGN-PLAN.md`.
1. Read `clients/<slug>/brand.md` and `clients/<slug>/persona.md`. If brand.md is still the template, interview the user (max 6 questions): personality adjectives, 2–3 reference brands/sites they admire, display vs body font preference (serif/sans/mono, warm/cool), primary hue + one accent, density (airy/compact), anything banned. Write the answers into brand.md.
2. Choose fonts (Google Fonts) and write `fonts` + `stylesheet` URL into the client entry in `web/src/lib/clients.ts`.
3. Write `web/src/styles/clients/<slug>.css` from `clients/_template/theme.css`, overriding tokens to express the brief (oklch values; keep lightness steps similar to the demo theme). Add `@import './clients/<slug>.css';` to `web/src/styles/base.css` if missing.
4. Run `node design/contrast.mjs web/src/styles/clients/<slug>.css`; adjust until all pairs pass.
5. Create `web/public/<slug>/favicon.svg` (simple monogram in primary) and `web/src/pages/<slug>/design-system.astro` by copying `web/src/pages/demo/design-system.astro` and changing `const client = 'demo'`.
6. Load the `frontend-design` plugin skill for taste guidance; then `pnpm --dir web build` and screenshot `/<slug>/design-system` with the Playwright MCP at 390 and 1440 wide. Show the user and iterate once.

## tokens
Apply the requested change to `web/src/styles/clients/<slug>.css` only, re-run the contrast script, rebuild, screenshot the gallery.

## components
Open `web/src/pages/<slug>/design-system.astro`; make sure every primitive in `web/src/components/ui/` and every funnel component that has a visual variant is represented. Add missing ones. Keep it a gallery: no copy decisions here.

## review
1. `node design/contrast.mjs web/src/styles/clients/<slug>.css`.
2. Grep for violations under `web/src/pages/<slug>/`: `grep -nE "#[0-9a-fA-F]{3,8}|rgb\(|oklch\(|bg-(red|blue|green|gray|slate|zinc|neutral|stone|amber|yellow|orange|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose)-" ` — any hit is a finding.
3. Playwright MCP: screenshot `/<slug>/design-system` and each funnel start page at 390 and 1440. Score `.claude/skills/art-direction/references/checklist.md`. Also check: hierarchy, spacing rhythm, one accent moment per screen, focus states, hover states, text-balance on headlines.
4. Report as a ranked list with a concrete fix each (use `design:design-critique` and `design:accessibility-review` plugin skills for depth). Apply fixes when the user agrees.
