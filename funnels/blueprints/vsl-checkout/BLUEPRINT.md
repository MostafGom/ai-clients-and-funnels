# Blueprint: vsl-checkout (video sales letter → direct purchase → upsell → downsell)

**Goal** — sell a product directly from a video; maximize AOV with one order bump, one upsell, one downsell.
**Pages** — `/` (VSL) → `/checkout` → `/upsell` → `/downsell` → `/thanks`
**Stripe prices (env)** — `STRIPE_PRICE_<CLIENT>_MAIN`, `_BUMP`, `_UPSELL`, `_DOWNSELL`

## Page `/`
`Eyebrow` + H1 + `VideoPlayer revealAfter={N}` + revealed CTA → `#offer`. Offer section (`[data-reveal]` too): `PriceCard` with compareAt + badge, `Button` → `/checkout`. Then `Guarantee`, `Testimonials`, `FAQ`.

## Page `/checkout`
Two columns: order summary `Card` (+ `Countdown` evergreen) and `CheckoutForm` (highlighted card) containing `OrderBump` (priceKey `bump`). success → `/upsell`, cancel → `/checkout`.

## Page `/upsell` (bare layout)
`OneClickOffer kind="upsell"`: a bigger, complementary offer (coaching, done-with-you). accept → `/thanks`, decline → `/downsell`.

## Page `/downsell` (bare layout)
`OneClickOffer kind="downsell"`: a cheaper version of the upsell (group, lite, payment plan). accept/decline → `/thanks`.

## Page `/thanks`
`ThankYou` + “first 3 steps” card. Receipt/access email sent by Stripe webhook (`/api/webhooks/stripe`).

## Metrics
Play rate, CTA reveal → checkout click, checkout conversion, bump take rate (target 20–40%), upsell take (10–25%), downsell take, AOV.
