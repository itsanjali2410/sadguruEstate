/**
 * Admin API client — authenticated calls for the /admin panel.
 * The JWT from /api/auth/login is kept in localStorage.
 */
import { API_URL } from './api';
import { Property, Lead, Revision } from '../types/property';

const TOKEN_KEY = 'admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const isLoggedIn = () => Boolean(getToken());

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      ...(init.headers || {}),
    },
  });
  if (res.status === 401) {
    clearToken();
    throw new Error('Session expired. Please log in again.');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

function json(body: unknown, method: string): RequestInit {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

// ── Auth ──────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Login failed');
  setToken(body.token);
}

// ── Properties ────────────────────────────────────────────────

export const getAllProperties = () =>
  request<Property[]>('/api/properties/admin/all');

export const createProperty = (data: Partial<Property>) =>
  request<Property>('/api/properties', json(data, 'POST'));

export const updateProperty = (id: string, data: Partial<Property>) =>
  request<Property>(`/api/properties/${id}`, json(data, 'PUT'));

export const deleteProperty = (id: string) =>
  request<{ ok: boolean }>(`/api/properties/${id}`, { method: 'DELETE' });

// ── Revisions (change history / undo) ─────────────────────────

export const getRevisions = (propertyId: string) =>
  request<Revision[]>(`/api/revisions/property/${propertyId}`);

export const getDeletedRevisions = () =>
  request<Revision[]>('/api/revisions/deleted');

export const revertRevision = (id: string) =>
  request<Property>(`/api/revisions/${id}/revert`, { method: 'POST' });

// ── Leads ─────────────────────────────────────────────────────

export const getLeads = (status?: string) =>
  request<Lead[]>(`/api/leads${status ? `?status=${status}` : ''}`);

export const updateLeadStatus = (id: string, status: string) =>
  request<Lead>(`/api/leads/${id}`, json({ status }, 'PATCH'));

export const deleteLead = (id: string) =>
  request<{ ok: boolean }>(`/api/leads/${id}`, { method: 'DELETE' });

// ── Uploads / import ──────────────────────────────────────────

function formData(field: string, files: File | File[]): FormData {
  const fd = new FormData();
  if (Array.isArray(files)) files.forEach((f) => fd.append(field, f));
  else fd.append(field, files);
  return fd;
}

export const uploadImage = (file: File) =>
  request<{ url: string }>('/api/upload/image', {
    method: 'POST',
    body: formData('file', file),
  });

export const uploadImages = (files: File[]) =>
  request<{ url: string }[]>('/api/upload/images', {
    method: 'POST',
    body: formData('files', files),
  });

export const uploadBrochure = (file: File) =>
  request<{ url: string }>('/api/upload/brochure', {
    method: 'POST',
    body: formData('file', file),
  });

/** AI-extract listing fields from a PDF brochure (server-side Gemini). */
export const extractBrochure = (file: File) =>
  request<Partial<Property>>('/api/extract/brochure', {
    method: 'POST',
    body: formData('file', file),
  });

export const importExcel = (file: File) =>
  request<{
    created: number;
    skipped: number;
    total: number;
    errors: { row: number; reason: string }[];
  }>('/api/import', { method: 'POST', body: formData('file', file) });
