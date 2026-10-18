# Funnel plan — lumen / vsl-call (scripted VSL → application → book → confirmed)

## Traffic & stage
- Source: **cold to lukewarm, higher intent.** Ads and content aimed at the hard cases ("twins and sleep", "reflux baby won't sleep", "daycare naps ruining nights"), retargeting of parents who watched the main VSL but didn't buy, the guide's page 12.
- Awareness: **problem-aware with a complication.** They believe their baby is the exception. The video must show that the exception is a known pattern with a known adjustment, then invite them to a call, not a checkout.
- What the call sells: 4-week 1:1 coaching ($1,200 [CLIENT]) for the cases that need it; the $497 method otherwise. The page sells the application + call only.

## Big idea
**"Different" has a plan.** Twins, reflux, daycare, two kids in one room, travel: each is a named adjustment on top of the same timing mechanism. The video walks through four of them in two minutes each, so the viewer recognises their baby, then applies.

## Script (VSL-SCRIPT.md, ~1,100 spoken words; 4–5 min in the scripted player)
Hook 0:00 (for the parent who's been told "every baby is different") → the pattern 0:40 (same mechanism, different adjustment) → four cases 1:40 (twins, reflux, daycare, two-in-one-room; each: the trap, the adjustment, the result) → what 1:1 looks like 5:30 **(reveal)** → who it's for / not for → apply 7:00.

## Application (`/apply`), conversational multi-step
Step 1: Your baby (age band; one or more "buts": twins / reflux / daycare / sibling in room / travel soon / none of these). Step 2: Your nights (bedtime, typical wakings, what you've tried, free text). Step 3: You (first name, email, best time to call). Progress bar, back button, conditional follow-up (if twins: "same room?"; if daycare: "days per week"). Posts to `/api/lead` with `funnel=vsl-call` (fields kept as metadata in the email to Maya), redirects to `/book`.
Why this shape: fewer fields per screen = more completions; the "but" checkboxes make the applicant feel seen; Maya gets a real brief.

## Page map
`/lumen/vsl-call` (plum stage; VSL; hidden until reveal: who it's for / not for, three case stories as monitor frames, the apply CTA, sticky) → `/apply` → `/book` (Cal.com, reads "Maya reads your application first") → `/confirmed`.

## Events
`vsl_play`, `vsl_chapter`, `vsl_cta_revealed`, `application_step` (1/2/3), `application_submitted`, `booking_started`, `booking_confirmed`.

## Emails
Application received (immediately, to the applicant: "Maya is reading it; here's the booking link if you haven't picked a time") + an internal notification to Maya with the application [CLIENT: inbox]. Call prep/reminder/cancel: shared with the calendar funnel via the Cal.com webhook.

## Open client inputs
Record the video · coaching offer and price for the call · Maya's inbox for applications · real case stories.
