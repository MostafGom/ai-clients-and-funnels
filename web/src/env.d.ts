/// <reference types="astro/client" />
type Runtime = import('@astrojs/cloudflare').Runtime<Record<string, string | undefined>>;
declare namespace App {
  interface Locals extends Runtime {}
}

interface Window {
  funnel?: {
    ctx: { client: string; funnel: string | null; step: string | null };
    track: (event: string, props?: Record<string, unknown>) => void;
  };
  posthog?: { capture: (e: string, p?: Record<string, unknown>) => void; [k: string]: unknown };
  dataLayer?: Record<string, unknown>[];
}
