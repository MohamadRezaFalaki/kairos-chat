import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Disable prefetch in serverless environments
const queryClient = postgres(process.env.DATABASE_URL!, {
    prepare: false,
    max: 1, // Important for serverless
});

export const db = drizzle(queryClient, { schema });