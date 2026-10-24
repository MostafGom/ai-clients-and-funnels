import type { FunnelType } from './funnels';

export interface ClientFonts {
  display: string;
  body: string;
  /** Google Fonts stylesheet URL (or any font CSS URL). Omit for system fonts. */
  stylesheet?: string;
}

export interface Client {
  slug: string;
  name: string;
  legalName: string;
  tagline: string;
  /** Default meta description when a page does not set one. */
  description: string;
  supportEmail: string;
  fonts: ClientFonts;
  calendar: { provider: 'cal' | 'calendly'; url: string };
  /** Lead magnet delivered by the ebook funnel. */
  leadMagnet?: { title: string; downloadUrl: string };
  /** Resend audience to add leads to (optional). */
  resendAudienceId?: string;
  /** Funnels this client has built. Drives / index and tests. */
  funnels: FunnelType[];
  /** Social proof used across funnels. */
  socials?: { label: string; href: string }[];
  /** True when public/<slug>/og/<funnel>.png + default.png exist (rendered by `pnpm images`). */
  ogImages?: boolean;
  /** Regulated-category disclaimer printed in the footer of every page (e.g. finance: not advice, risk of loss). */
  disclaimer?: string;
}

export const clients: Client[] = [
  {
    slug: 'lumen',
    name: 'Lumen Sleep',
    legalName: 'Lumen Sleep Co.',
    tagline: 'Baby sleeps. You sleep. Everybody wins.',
    description:
      'Lumen Sleep helps exhausted parents of 0–3 year olds get their tiny human sleeping through the night in 7 nights, no cry-it-out, no guilt.',
    supportEmail: 'hello@lumensleep.example.com',
    fonts: {
      display: 'Fredoka',
      body: 'Nunito',
      stylesheet:
        'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap',
    },
    calendar: { provider: 'cal', url: 'https://cal.com/lumen-sleep/clarity-call' },
    leadMagnet: { title: 'The 7-Night Bedtime Reset', downloadUrl: '/lumen/assets/bedtime-reset.pdf' },
    funnels: ['ebook', 'calendar', 'vsl-call', 'vsl-checkout', 'checkout'],
    ogImages: true,
  },
  {
    slug: 'forge',
    name: 'Forge Fitness Online',
    legalName: 'Forge Fitness Online Ltd.',
    tagline: 'Stronger at 45 than you were at 30. Three sessions a week, six lifts, 12 weeks.',
    description:
      'Forge Fitness Online is the 12-week strength program for men 35–50: three 45-minute sessions a week, six lifts, progression that respects your calendar and your joints.',
    supportEmail: 'daniel@forgefitness.example.com',
    fonts: {
      display: 'Barlow Condensed',
      body: 'Inter Tight',
      stylesheet:
        'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800&family=Inter+Tight:wght@400;500;600;700&display=swap',
    },
    calendar: { provider: 'cal', url: 'https://cal.com/forge-fitness/strength-audit' },
    leadMagnet: { title: 'The 3-Session Week', downloadUrl: '/forge/assets/three-session-week.pdf' },
    funnels: ['ebook', 'calendar', 'vsl-call', 'vsl-checkout', 'checkout'],
    ogImages: true,
  },
  {
    slug: 'firstshares',
    name: 'First Shares',
    legalName: 'First Shares Education Ltd.',
    tagline: 'Late to investing? You are not too late. Set up your portfolio in six weeks.',
    description:
      'First Shares teaches 30–45 year olds with cash sitting in savings how to set up a simple, long-term portfolio in six weeks. Education, not investment advice.',
    supportEmail: 'hello@firstshares.example.com',
    fonts: {
      display: 'Bricolage Grotesque',
      body: 'Inter',
      stylesheet:
        'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Inter:wght@400;500;600;700&display=swap',
    },
    calendar: { provider: 'cal', url: 'https://cal.com/first-shares/intro' },
    leadMagnet: { title: 'The First $1,000 Plan', downloadUrl: '/firstshares/assets/first-1000-plan.pdf' },
    funnels: ['ebook'],
    disclaimer:
      'First Shares provides financial education only. Nothing on this site is investment, tax or legal advice, or a recommendation to buy or sell any security. First Shares is not a registered investment adviser or broker-dealer, does not manage money and receives no commissions. Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. Charts and figures are illustrative, not forecasts. Student stories describe actions taken; individual circumstances and results vary. Consider speaking with a licensed financial professional about your situation.',
  },
];

export function getClient(slug: string): Client {
  const c = clients.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown client "${slug}". Register it in src/lib/clients.ts`);
  return c;
}

/** Env var name holding a Stripe price id: STRIPE_PRICE_<CLIENT>_<KEY> */
export function priceEnvName(clientSlug: string, key: string): string {
  const norm = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '_');
  return `STRIPE_PRICE_${norm(clientSlug)}_${norm(key)}`;
}
