# Blueprint: calendar (book a call)

**Goal** — get a qualified prospect to book a call with the client.
**Pages** — `/` (landing) → `/book` (embed) → `/confirmed`

## Page `/`
`Hero` (eyebrow: call type + duration, headline = what they walk out with, `Button` → `/book`, proof line: scarcity + lead time) → `Steps` (what happens on the call, with minutes) → `Testimonials` (“said after the call”) → `FAQ` (is it a sales call? who is it for? prep?) → `CTASection` → `StickyCTA`.
Copy: sell the CALL, not the service. Make the output of the call tangible (“leave with X filled in”).

## Page `/book`
`Eyebrow` “Step 2 of 2”, H1, one-line expectation, `CalendarEmbed` (client.calendar; `confirmedPath` set).

## Page `/confirmed`
`ThankYou` + prep checklist card. Nothing else to click except prep.

## Metrics
Landing → book click, booking rate on `/book`, show-up rate (track in CRM).
