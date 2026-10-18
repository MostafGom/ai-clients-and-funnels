# Blueprint: vsl-call (video sales letter → application → call)

**Goal** — a video does the selling; an application qualifies; the calendar books.
**Pages** — `/` (VSL) → `/apply` → `/book` → `/confirmed`

## Page `/`
Top: `Eyebrow` (who it's for) + H1 (the promise of the video, written as a result) + one-line “no X, no Y” + `VideoPlayer` with `revealAfter` (seconds into the video where the offer is introduced) + hidden CTA block `[data-reveal]` → `/apply`.
Below: `Benefits` (what the video covers) → `Testimonials` (clients who applied). No pricing, no FAQ (the call does that).
Video script: hook (15s) → problem/agitation → mechanism → proof → offer the call → CTA.

## Page `/apply`
`Card` with 4-question form (name, email, revenue band, one open question). POST `/api/lead` with `funnel=vsl-call`, redirect `/book`. Fewer questions = more applicants; add questions only to filter.

## `/book`, `/confirmed`
Same as calendar blueprint; copy references the application (“we read it before the call”).

## Metrics
Play rate, % reaching reveal time, apply rate, booking rate.
