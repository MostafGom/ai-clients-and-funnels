/** Lumen · checkout funnel emails. Copy: clients/lumen/funnels/checkout/COPY.md → "Emails". */
import { emailShell } from '../../lib/resend';

const BRAND = 'Lumen Sleep';
const FOOT = 'You’re receiving this because you started or completed an order with Lumen Sleep. Reply to reach Maya directly.';
const sign = '<p>— Maya</p>';
const site = (path: string, origin: string) => new URL(path, origin).toString();

export function abandonedCheckout(origin: string) {
  return [
    {
      delayHours: 0,
      subject: 'You left the plan open on the counter',
      html: emailShell({ brand: BRAND, heading: 'Still want tonight to be night one?', body: `<p>Hi, it’s Maya. You got as far as the checkout for the Lumen Sleep Method and stopped, which at 11 p.m. with a baby usually means the baby. No pressure.</p><p>Your checkout is still open and you can finish it in two minutes. If something on the page didn’t answer your question, reply to this email. I read every one.</p>${sign}`, cta: { label: 'Finish my order', href: site('/lumen/checkout/checkout', origin) }, footer: FOOT }),
    },
    {
      delayHours: 23,
      subject: 'The guarantee, in one paragraph',
      html: emailShell({ brand: BRAND, heading: 'What if it doesn’t work for your baby?', body: `<p>The question I get most from parents who nearly bought: “what if my baby is the one it doesn’t work for?” So here’s the guarantee in full.</p><p>Run nights one to seven as written. If nights six and seven aren’t the best two nights since she was born, email me within 30 days and I refund you. No forms, no call. I’d rather refund you than have you keep a plan that didn’t fit your baby.</p><p>If that makes the decision easier, the checkout is still here.</p>${sign}`, cta: { label: 'Start tonight · $497', href: site('/lumen/checkout/checkout', origin) }, footer: FOOT }),
    },
  ];
}

export function onboarding(origin: string, programUrl = 'https://app.lumensleep.example.com') {
  return [
    {
      delayHours: 0,
      subject: 'Welcome. Here’s night one.',
      html: emailShell({ brand: BRAND, heading: 'You’re in. Three things before bedtime tonight.', body: `<ol><li>Set your password and open the program.</li><li>Pick your age track and print the wake-window chart.</li><li>Watch Night 1 (15 minutes).</li></ol><p>Then set bedtime from the chart, earlier than feels normal, and run the script. That’s the whole night.</p><p>Reply with your baby’s age and I’ll make sure you’re on the right track.</p>${sign}`, cta: { label: 'Open Night 1', href: programUrl }, footer: FOOT }),
    },
    {
      delayHours: 48,
      subject: 'Night 3 is the one people quit on',
      html: emailShell({ brand: BRAND, heading: 'Here’s exactly what tonight will look like.', body: `<p>Tonight you add the Kind Response Plan. Expect some protest at the first waking, and expect it to be shorter than you fear. You go in, you do the plan, you stay.</p><p>Most families see the first long stretch on night three or four. If tonight is rough, it’s working: her body is learning the new timing.</p><p>The video is 14 minutes. Watch it before bedtime, not during.</p>${sign}`, cta: { label: 'Watch Night 3', href: programUrl }, footer: FOOT }),
    },
    {
      delayHours: 144,
      subject: 'Night 7. Lock it in.',
      html: emailShell({ brand: BRAND, heading: 'How to keep this through teeth, travel and the next regression.', body: `<p>If you’re here, you’ve done six nights. Tonight’s video is about keeping it: early mornings, sick nights, and what to do when a regression tries to undo your work.</p><p>Two asks. One: reply and tell me night one versus night six, in hours. I keep those. Two: if the method worked, a sentence for other parents who are where you were a week ago.</p>${sign}`, cta: { label: 'Watch Night 7', href: programUrl }, footer: FOOT }),
    },
  ];
}
