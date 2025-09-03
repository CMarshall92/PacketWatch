/**
 * @packetwatch/ui - UI utilities for Next.js applications
 * 
 * This package provides server and client-side networking utilities
 * with proper separation for Next.js applications.
 */

// Re-export everything from client and server modules
export * from "./client.js";
export * from "./server.js";

// Also export types from shared-types for convenience
export type { NetworkResponse } from '@packetwatch/shared-types';
