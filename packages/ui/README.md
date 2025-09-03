# @packetwatch/ui

A UI library with server and client-side utilities for Next.js applications.

## Installation

```bash
npm install @packetwatch/ui
```

## Usage

### Server-side (Server Components, API Routes)

```typescript
import { serverFetcher } from '@packetwatch/ui';

// In a server component or API route
const response = await serverFetcher('/api/data', {
  method: 'POST',
  body: { key: 'value' },
  cache: 'no-store' // Server-specific option
});

// Response structure: { status: number, data?: T, message?: string }
console.log(response.status); // 200
console.log(response.data);   // Your data
console.log(response.message); // "OK"
```

### Client-side (Client Components, Browser)

```typescript
'use client';
import { clientFetcher } from '@packetwatch/ui';

// In a client component
const response = await clientFetcher('/api/data', {
  method: 'POST',
  body: { key: 'value' },
  signal: abortController.signal // Client-specific option
});

// Response structure: { status: number, data?: T, message?: string }
console.log(response.status); // 200
console.log(response.data);   // Your data
console.log(response.message); // "OK"
```

### Direct imports (for specific use cases)

```typescript
// Server-side only
import { fetcher } from '@packetwatch/ui/server';

// Client-side only  
import { fetcher } from '@packetwatch/ui/client';
```

## API

### ServerFetcherOptions

- `method`: HTTP method (default: 'GET')
- `headers`: Additional headers
- `body`: Request body
- `cache`: Request cache strategy (server-only)

### ClientFetcherOptions

- `method`: HTTP method (default: 'GET')
- `headers`: Additional headers
- `body`: Request body
- `signal`: AbortSignal for request cancellation (client-only)
