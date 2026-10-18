export type FunnelType = 'ebook' | 'calendar' | 'vsl-call' | 'vsl-checkout' | 'checkout';

export interface FunnelMeta {
  type: FunnelType;
  label: string;
  goal: string;
  /** Ordered page map, relative to /<client>/<type>/ */
  pages: string[];
}

export const FUNNELS: Record<FunnelType, FunnelMeta> = {
  ebook: {
    type: 'ebook',
    label: 'Free ebook',
    goal: 'Capture a lead in exchange for a lead magnet, then push one next step.',
    pages: ['', 'thanks'],
  },
  calendar: {
    type: 'calendar',
    label: 'Calendar booking',
    goal: 'Get a qualified prospect to book a call.',
    pages: ['', 'book', 'confirmed'],
  },
  'vsl-call': {
    type: 'vsl-call',
    label: 'VSL → book a call',
    goal: 'Video sales letter that sells the call, qualifies, then books.',
    pages: ['', 'apply', 'book', 'confirmed'],
  },
  'vsl-checkout': {
    type: 'vsl-checkout',
    label: 'VSL → checkout',
    goal: 'Video sales letter that sells directly into checkout, with upsell and downsell.',
    pages: ['', 'checkout', 'upsell', 'downsell', 'thanks'],
  },
  checkout: {
    type: 'checkout',
    label: 'Checkout + upsell/downsell',
    goal: 'Long-form sales page into checkout (with order bump), one-click upsell, downsell.',
    pages: ['', 'checkout', 'upsell', 'downsell', 'thanks'],
  },
};

export function funnelPath(client: string, type: FunnelType, page = ''): string {
  return `/${client}/${type}${page ? `/${page}` : ''}`;
}

export function funnelPages(client: string, type: FunnelType): string[] {
  return FUNNELS[type].pages.map((p) => funnelPath(client, type, p));
}
