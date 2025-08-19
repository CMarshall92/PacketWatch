import { PrismaClient } from './generated/index.js';

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient();
} else {
    if (!(global as any).db) {
        (global as any).db = new PrismaClient();
    }
    db = (global as any).db;
}

export { db };
export * from './generated/index.js';
