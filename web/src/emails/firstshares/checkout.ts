/** First Shares · checkout funnel emails. Copy: clients/firstshares/funnels/checkout/COPY.md → "Emails". Education only. */
import { emailShell } from '../../lib/resend';
const BRAND = 'First Shares';
const FOOT = 'You started or completed an order with First Shares. Education only, not investment advice. Reply to reach Richard.';
const sign = '<p>— Richard</p>';
const site = (path: string, origin: string) => new URL(path, origin).toString();

export function abandonedCheckout(origin: string) {
  return [
    { delayHours: 0, subject: 'Your seat is still open', html: emailShell({ brand: BRAND, heading: 'Two minutes to finish, whenever you’re ready.', body: `<p>It’s Richard. You got as far as checkout and stopped, which usually means a kid needed you, or a question the page didn’t answer.</p><p>Your order is still open. If it was the question, reply and ask it. I read every message, and I’d rather you ask than guess.</p>${sign}`, cta: { label: 'Finish my order', href: site('/firstshares/checkout/checkout', origin) }, footer: FOOT }) },
    { delayHours: 23, subject: 'The guarantee, in full', html: emailShell({ brand: BRAND, heading: 'What if I don’t open the account?', body: `<p>The question most people have before they buy is “what if I don’t follow through?” So here’s the guarantee, in full.</p><p>Work through weeks 1 and 2. If your first account isn’t open and funded within 30 days of buying, email me and I refund every cent. No forms, no call. The account is either open or it isn’t.</p><p>It’s education, not advice: I teach, you decide. If that settles it, the checkout is here.</p>${sign}`, cta: { label: 'Start the six-week setup · $297', href: site('/firstshares/checkout/checkout', origin) }, footer: FOOT }) },
  ];
}

export function onboarding(origin: string, courseUrl = 'https://learn.firstshares.example.com') {
  return [
    { delayHours: 0, subject: 'Lesson 1 is 12 minutes', html: emailShell({ brand: BRAND, heading: 'You’re in. Here’s Saturday.', body: `<p>Welcome. Three things: set your password, download the Money Map worksheet, and watch lesson 1 (12 minutes).</p><p>Then put Saturday morning in your calendar. That’s when the accounts get opened.</p><p>Reply with your emergency-fund number once you’ve worked it out. I like seeing them.</p>${sign}`, cta: { label: 'Open lesson 1', href: courseUrl }, footer: FOOT }) },
    { delayHours: 72, subject: 'The money map, done?', html: emailShell({ brand: BRAND, heading: 'The one number to write down.', body: `<p>The order in week 1 is the order of everything: emergency fund first, then high-interest debt, then invest. If the card balance is 24%, paying it off is the best “return” you’ll find, and it’s guaranteed.</p><p>There’s no right amount to invest. There’s a steady one. Write it down before Saturday.</p>${sign}`, cta: { label: 'The Money Map', href: courseUrl }, footer: FOOT }) },
    { delayHours: 144, subject: 'Week 2: the 40 minutes', html: emailShell({ brand: BRAND, heading: 'Accounts open this weekend.', body: `<p>The walkthroughs are unlocked. Do the 401(k) match first: it’s usually one screen in your benefits portal. Then the Roth IRA, screen by screen.</p><p>Reply “done” when the first one is open. It’s the box that matters most, and the one people put off longest.</p>${sign}`, cta: { label: 'Open week 2', href: courseUrl }, footer: FOOT }) },
  ];
}
