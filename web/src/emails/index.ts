/** Registry of lead-capture sequences per client and funnel. /api/lead looks up `[client][funnel]`. */
import { ebookSequence } from './lumen/ebook';

export type Step = { delayHours: number; subject: string; html: string; text?: string };
export type LeadSequence = (origin: string, lead: { email: string; name?: string; age?: string }) => Step[];

export const LEAD_SEQUENCES: Record<string, Record<string, LeadSequence>> = {
  lumen: { ebook: (origin, lead) => ebookSequence(origin, lead) },
};
