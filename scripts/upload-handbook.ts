import { config } from 'dotenv';
import { resolve } from 'path';

// ✅ Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') });

// Now import the rest
import { uploadDocument } from '@/lib/rag/document-processor';

async function main() {
    console.log('🔌 Using DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

    const handbookContent = `
# KAIROS User Handbook

## What is KAIROS?
KAIROS is an AI-powered trading assistant designed to help traders make informed decisions about buying, holding, or selling assets.

## Key Features
- Real-time market analysis
- Risk assessment for trading positions
- Historical data analysis
- Trading signal generation

## How to Use KAIROS
1. Ask questions about market trends
2. Request analysis of specific assets
3. Get recommendations for position sizing
4. Learn about trading strategies

## Trading Strategies
KAIROS supports various trading strategies including:
- Day trading
- Swing trading
- Position trading
- Scalping

## Risk Management
Always use proper risk management:
- Never risk more than 2% per trade
- Use stop-loss orders
- Diversify your portfolio
- Don't trade with emotion
  `;

    try {
        console.log('📄 Starting document upload...');

        const result = await uploadDocument(
            'KAIROS User Handbook',
            handbookContent,
            'handbook.txt',
            {
                version: '1.0',
                category: 'user-guide',
            }
        );

        console.log('✅ SUCCESS! Document uploaded with ID:', result.id);
        process.exit(0);
    } catch (error) {
        console.error('❌ FAILED:', error);
        process.exit(1);
    }
}

main();