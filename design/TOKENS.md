# Token contract

Every client theme (`web/src/styles/clients/<slug>.css`) may override **only** these variables,
scoped as `[data-client='<slug>'] { … }` (matches `<html data-client>` on funnel pages and any element that opts in, e.g. the studio home page's per-client bands). Defaults live in `web/src/styles/base.css` (`@theme`).
Components never use anything else. If a design needs a new token, add it here first, then to `base.css`.

## Color (oklch preferred; hex accepted)

| token | role | contrast requirement |
|---|---|---|
| `--color-bg` | page background | — |
| `--color-surface` | cards, inputs | — |
| `--color-surface-2` | muted bands, hover | — |
| `--color-inverse` / `--color-inverse-fg` | dark closing bands, inverse cards | fg on inverse ≥ 4.5 |
| `--color-inverse-2` | raised card/panel on the inverse surface | inverse-fg on inverse-2 ≥ 4.5 |
| `--color-fg` | body text | on bg, surface, surface-2 ≥ 7 (AAA target), min 4.5 |
| `--color-fg-muted` | secondary text | on bg & surface ≥ 4.5 |
| `--color-fg-subtle` | placeholders, strikethrough prices | on surface ≥ 3 |
| `--color-border` / `--color-border-strong` | hairlines / input borders | strong on surface ≥ 3 |
| `--color-primary` / `--color-primary-hover` / `--color-primary-fg` | main CTA | primary-fg on primary ≥ 4.5; primary as text on bg ≥ 4.5 |
| `--color-primary-soft` | tints, focus rings, badges | primary on primary-soft ≥ 4.5 |
| `--color-accent` / `--color-accent-fg` | order bumps, upsell CTA, highlights | accent-fg on accent ≥ 4.5 |
| `--color-accent-2` / `--color-accent-2-fg` | secondary brand color (illustration, charts, secondary text on inverse) | accent-2-fg on accent-2 ≥ 4.5 |
| `--color-success` `--color-warning` `--color-danger` | feedback | as text on surface ≥ 4.5 (success/danger) |
| `--color-focus` | focus outline | on bg ≥ 3 |

## Type
`--font-display`, `--font-body`, `--font-mono`, `--font-cta` (button face; defaults to body) (families).
`--cta-case` (`none` | `uppercase`), `--cta-tracking` and `--cta-scale` (font-size multiplier, default 1) style button text.
`--display-case` (`none` | `uppercase`) sets text-transform on h1–h4, so shared components follow the client's headline style. Scale is fixed in base.css
(`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`) and may be overridden per client if the display face needs it.

## Shape & elevation
`--radius-sm | md | lg | xl | pill`, `--shadow-card | pop | cta`.

## Motion & layout
`--ease-out-expo`, `--ease-spring`; `--container-prose | content | wide`.

## Checking
```
node design/contrast.mjs web/src/styles/clients/<slug>.css
```
Prints every required pair with its ratio and PASS/FAIL. The `/design <slug> review` skill runs it.
