import { supabase } from './supabase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const api = {
  async fetch(endpoint, options = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
      ...options,
      headers,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || result.message || 'API request failed');
    }

    return result.data;
  },

  get(endpoint) {
    return this.fetch(endpoint, { method: 'GET' });
  },

  post(endpoint, body) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body) {
    return this.fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete(endpoint) {
    return this.fetch(endpoint, { method: 'DELETE' });
  },
};
