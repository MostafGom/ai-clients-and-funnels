/** Registry of lead-capture sequences per client and funnel. /api/lead looks up `[client][funnel]`. */
import { ebookSequence } from './lumen/ebook';
import { applicationReceived, applicationBrief } from './lumen/vsl-call';
import { ebookSequence as forgeEbook } from './forge/ebook';
import { applicationReceived as forgeApplied, applicationBrief as forgeBrief } from './forge/vsl-call';

export type Step = { delayHours: number; subject: string; html: string; text?: string };
export type LeadSequence = (origin: string, lead: { email: string; name?: string; age?: string; kit?: string }) => Step[];
/** Internal notification built from the raw form fields (multi-value fields arrive as arrays). */
export type InternalNotify = (fields: Record<string, string | string[]>) => { subject: string; html: string };

export const LEAD_SEQUENCES: Record<string, Record<string, LeadSequence>> = {
  lumen: { ebook: (origin, lead) => ebookSequence(origin, lead), 'vsl-call': (origin, lead) => applicationReceived(origin, lead) },
  forge: { ebook: (origin, lead) => forgeEbook(origin, lead), 'vsl-call': (origin, lead) => forgeApplied(origin, lead) },
};

export const INTERNAL_NOTIFY: Record<string, Record<string, InternalNotify>> = {
  lumen: { 'vsl-call': applicationBrief },
  forge: { 'vsl-call': forgeBrief },
};
