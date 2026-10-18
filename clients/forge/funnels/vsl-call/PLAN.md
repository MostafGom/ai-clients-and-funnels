# Funnel plan — forge / vsl-call (scripted VSL → application → book → confirmed)

## Traffic & stage
- Source: **cold to lukewarm, higher intent.** Ads and content aimed at the complicated cases ("lifting with a bad back at 45", "strength training for travelling executives", "first time lifting at 50"), retargeting of men who watched the main VSL but didn't buy.
- Awareness: **problem-aware with a complication.** He believes his case is the exception: the back, the travel, the age, the fact he's never done this. The video shows each exception is a known adjustment, then invites him to apply for an audit, not a checkout.
- What the call sells: Forge 12 with coaching ($1,500) for the cases that need eyes on form; self-paced ($197) otherwise.

## Big idea
**"Your case isn't the exception. It's an adjustment."** Four cases, each with its trap and its swap, told in Daniel's calm clinic voice, then the audit.

## Script (VSL-SCRIPT.md)
Hook 0:00 → the pattern under the exceptions 0:40 → four cases: the old back 1:30, the travelling man 2:30, the first time under a bar at 50 3:20, the man who always quits at week three 4:10 → what an audit looks like **(reveal)** 5:00 → who it's for / apply 6:00. ~1,000 spoken words; player ~4 min.

## Application (`/apply`), three steps
Step 1: Your situation (age band; complications: old back / shoulder or knee / travel 2+ weeks a month / never lifted / over 50 / none; if injury: "seen a physio or doctor about it?"; if travel: "weeks a month"). Step 2: Your training (last two weeks: none / sporadic / consistent; equipment; hours a week). Step 3: You (first name, email, best time). Posts to `/api/lead` with `funnel=vsl-call`; applicant confirmation + internal brief to Daniel; redirect to `/book`.

## Page map
`/forge/vsl-call` (Onyx stage: VSL; hidden until reveal: for/not for, three case ledgers, apply CTA, sticky) → `/apply` → `/book` → `/confirmed`.

## Events
`vsl_play`, `vsl_chapter`, `vsl_cta_revealed`, `application_step`, `application_submitted`, `booking_started`, `booking_confirmed`.

## Emails
Application received (to applicant) + internal brief (to Daniel). Audit prep/reminder/cancel shared with the calendar funnel.

## Open client inputs
Record the video · coaching offer and price · Daniel's inbox · real case stories.
