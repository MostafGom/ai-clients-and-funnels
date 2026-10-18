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
