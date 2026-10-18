import type { Client } from './clients';

export interface PageSeo { title: string; description?: string; image?: string; noindex?: boolean }

export function buildTitle(client: Client, title: string): string {
  return title.includes(client.name) ? title : `${title} | ${client.name}`;
}
