import { Property } from '../types/property';

export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

/** API documents use `slug`; the frontend routes use `id`. Normalise here. */
export function toProperty(doc: Record<string, unknown>): Property {
  return {
    ...(doc as unknown as Property),
    id: String(doc.slug || doc._id),
  };
}

// ── Public: properties ────────────────────────────────────────

export async function fetchProperties(params?: {
  category?: string;
  location?: string;
  featured?: boolean;
  search?: string;
}): Promise<Property[]> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.location) qs.set('location', params.location);
  if (params?.featured) qs.set('featured', 'true');
  if (params?.search) qs.set('search', params.search);
  const query = qs.toString() ? `?${qs}` : '';
  const docs = await request<Record<string, unknown>[]>(
    `/api/properties${query}`
  );
  return docs.map(toProperty);
}

export async function fetchProperty(slug: string): Promise<Property> {
  const doc = await request<Record<string, unknown>>(
    `/api/properties/${encodeURIComponent(slug)}`
  );
  return toProperty(doc);
}

// ── Public: leads ─────────────────────────────────────────────

export interface LeadPayload {
  name: string;
  email?: string;
  phone: string;
  message?: string;
  formType: 'contact' | 'property_inquiry' | 'quick_info' | 'brochure_download';
  propertySlug?: string;
  propertyName?: string;
  meta?: Record<string, string>;
  /** Honeypot — must stay empty; bots that fill it are silently dropped. */
  website?: string;
}

export async function submitLead(
  payload: LeadPayload
): Promise<{ ok: boolean; id: string }> {
  return request('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
