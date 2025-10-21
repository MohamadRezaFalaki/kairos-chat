// ✅ Load environment variables FIRST, before anything else
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

// Now import and use DATABASE_URL
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('❌ DATABASE_URL is not set in environment variables');
}

console.log('🔌 DB Connection:', connectionString.replace(/:[^:@]+@/, ':****@'));

const queryClient = postgres(connectionString, {
    prepare: false,
    max: 1,
});

export const db = drizzle(queryClient, { schema });