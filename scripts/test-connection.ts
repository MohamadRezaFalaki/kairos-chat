import { config } from 'dotenv';
import { resolve } from 'path';

// ✅ Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') });

// Now import the rest
import { db } from '@/db';
import { sql } from 'drizzle-orm';

async function test() {
    try {
        console.log('🔌 Testing connection with:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

        const result = await db.execute(sql`SELECT current_database(), current_user`);
        console.log('✅ Connected to:', result[0]);

        const tables = await db.execute(sql`
            SELECT tablename FROM pg_tables
            WHERE schemaname = 'public'
            ORDER BY tablename
        `);
        console.log('✅ Tables:', tables.map(t => (t as any).tablename));

        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
}

test();