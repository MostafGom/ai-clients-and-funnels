# Blueprint: ebook (lead magnet opt-in)

**Goal** — trade a high-value PDF/guide for an email, then immediately offer ONE next step.
**Pages** — `/` (opt-in) → `/thanks`
**Traffic** — cold/warm social, ads, content. Visitor is problem-aware, not solution-aware.

## Page `/` — opt-in
Components: `Hero` (headline + `OptInForm` + proof line + mockup in `media` slot) → `Section(muted)` + `Benefits` (3 things they'll learn) → `Testimonials` → `CTASection` with inline `OptInForm`.
Copy framework:
- Headline = outcome + timeframe + without the thing they hate (“Fill your pipeline for 90 days without ads or cold DMs”).
- Subheadline = what it is, who it's for, proof number.
- 3 bullets “Inside” = curiosity + specificity (numbers, scripts, templates).
- Proof line under form: count + time to complete.
- Form: email only unless the nurture needs a first name. Consent line.

## Page `/thanks`
Components: `ThankYou` + `Card` with the ONE next step (book a call / low-ticket offer). Direct download link as secondary.
Email (Resend): delivered by `/api/lead` using `client.leadMagnet`. Follow with a 5-email nurture (`marketing:email-sequence`).

## Metrics
Opt-in rate (target 30–50% warm, 15–25% cold), thanks-page CTA click rate, email open rate.
