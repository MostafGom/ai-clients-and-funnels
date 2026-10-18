/** Forge · checkout funnel emails. Copy: clients/forge/funnels/checkout/COPY.md → "Emails". */
import { emailShell } from '../../lib/resend';
const BRAND = 'Forge Fitness Online';
const FOOT = 'You started or completed an order with Forge Fitness Online. Reply to reach Daniel directly.';
const sign = '<p>— Daniel</p>';
const site = (path: string, origin: string) => new URL(path, origin).toString();

export function abandonedCheckout(origin: string) {
  return [
    { delayHours: 0, subject: 'Your order is still open', html: emailShell({ brand: BRAND, heading: 'Session one, whenever you’re ready.', body: `<p>It’s Daniel. You got as far as checkout and stopped, which usually means a call or a child. No pressure.</p><p>Your order is still open and takes two minutes to finish. If something on the page didn’t answer your question, reply and ask. I read every message.</p>${sign}`, cta: { label: 'Finish my order', href: site('/forge/checkout/checkout', origin) }, footer: FOOT }) },
    { delayHours: 23, subject: 'The guarantee, in full', html: emailShell({ brand: BRAND, heading: 'If the bar doesn’t go up.', body: `<p>The question most men have before they buy: what if it doesn’t work for me. So here’s the guarantee in full.</p><p>Run weeks one to four as written, log your lifts. If all six haven’t gone up, send me the log within 45 days and I refund you. No call. The bar either went up or it didn’t.</p><p>If that settles it, the checkout is here.</p>${sign}`, cta: { label: 'Start Forge 12 · $197', href: site('/forge/checkout/checkout', origin) }, footer: FOOT }) },
  ];
}
export function onboarding(origin: string, programUrl = 'https://app.forgefitness.example.com') {
  return [
    { delayHours: 0, subject: 'Session one. Forty-five minutes.', html: emailShell({ brand: BRAND, heading: 'Three things, then the bar.', body: `<p>You’re in. Set your password, pick your equipment track, watch the six lifts (14 minutes).</p><p>Then session one: warm-up, squat, bench, row. Start lighter than you think; the rule will catch you up by week two.</p><p>Reply with your starting weights. I keep them.</p>${sign}`, cta: { label: 'Open session one', href: programUrl }, footer: FOOT }) },
    { delayHours: 72, subject: 'How did session one feel?', html: emailShell({ brand: BRAND, heading: 'Sore is fine. Sharp is not.', body: `<p>By now you’ve done one or two sessions. Sore muscles are expected and fade by week two. Sharp pain in a joint is not, and the “train around” table is for exactly that.</p><p>Reply if anything felt wrong and I’ll tell you what to swap. Otherwise: same lifts, add weight where the last set was clean.</p>${sign}`, cta: { label: 'The train-around table', href: programUrl }, footer: FOOT }) },
    { delayHours: 144, subject: 'Week two. The rule does the work now.', html: emailShell({ brand: BRAND, heading: 'Add when clean. Repeat when not.', body: `<p>From here the program is a rule, not a plan: when the last set is clean, add 2.5 kg next time. When it isn’t, repeat the weight. That’s the entire decision for the next ten weeks.</p><p>Your first check-in lands Friday; send your log. Men who send logs finish.</p>${sign}`, cta: { label: 'Open week two', href: programUrl }, footer: FOOT }) },
  ];
}
