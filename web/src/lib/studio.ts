/** The studio itself: drives the public home page at /. Swap the [STUDIO] placeholders for the real values. */
export const studio = {
  name: 'AI Clients & Funnels',
  tagline: 'Funnels built for one business at a time: persona, brand, copy and pages, wired to Stripe and live on Cloudflare.',
  /** [STUDIO] Primary CTA destination (booking link or mailto). */
  contactHref: 'mailto:hello@studio.example.com',
  contactLabel: 'Start a funnel',
  fonts:
    'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap',
};

/** One-line category per client for the showcase. Clients without an entry just show their tagline. */
export const clientCategory: Record<string, string> = {
  lumen: 'Baby sleep coaching',
  forge: 'Strength training for men 35–50',
  firstshares: 'Investing education',
};
