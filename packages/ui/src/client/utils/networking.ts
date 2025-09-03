/**
 * Client-side networking utilities
 * These functions run in the browser and are optimized for client-side usage
 */

import type { NetworkResponse } from '@packetwatch/shared-types';

export interface ClientFetcherOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

export async function fetcher<T = any>(
  url: string,
  options: ClientFetcherOptions = {}
): Promise<NetworkResponse<T>> {
  const { method = 'GET', headers = {}, body, signal } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal,
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
