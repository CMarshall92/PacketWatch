/**
 * Server-side networking utilities
 * These functions run on the server and can access server-only APIs
 */

import type {
  NetworkResponse,
  ServerFetcherOptions,
} from "@packetwatch/shared-types";

export async function fetcher<T = any>(
  url: string,
  options: ServerFetcherOptions = {},
  successCallback?: () => void
): Promise<NetworkResponse<T>> {
  const { method = "GET", headers = {}, body, cache = "default" } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache,
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
