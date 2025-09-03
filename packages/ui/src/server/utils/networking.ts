/**
 * Server-side networking utilities
 * These functions run on the server and can access server-only APIs
 */

import type { NetworkResponse } from '@packetwatch/shared-types';

export interface ServerFetcherOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
}

export async function fetcher<T = any>(
  url: string,
  options: ServerFetcherOptions = {}
): Promise<NetworkResponse<T>> {
  const { method = 'GET', headers = {}, body, cache = 'default' } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache,
  };

  if (body && method !== 'GET') {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    status: response.status,
    data,
    message: response.statusText
  };
}
