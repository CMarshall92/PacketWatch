/**
 * Client-side networking utilities
 * These functions run in the browser and are optimized for client-side usage
 */

import type {
  ClientFetcherOptions,
  NetworkResponse,
} from "@packetwatch/shared-types";

export async function fetcher<T = any>(
  url: string,
  options: ClientFetcherOptions = {},
  successCallback?: () => void
): Promise<NetworkResponse<T>> {
  const { method = "GET", headers = {}, body, signal } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    signal,
  };

  if (body && method !== "GET") {
    config.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    return {
      status: 500,
      message: response.statusText,
    } as NetworkResponse<T>;
  }

  const data = await response.json();

  if (successCallback) successCallback();

  return {
    status: response.status,
    data,
  } as NetworkResponse<T>;
}
