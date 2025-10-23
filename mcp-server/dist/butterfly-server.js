// ============================================
// BUTTERFLY MCP SERVER
// ============================================
// This MCP server exposes tools to interact with Butterfly API
// Currently using MOCK DATA for testing - replace with real API calls
import { FastMCP } from "fastmcp";
import { z } from "zod";
// ============================================
// CONFIGURATION
// ============================================
const SERVER_NAME = "Butterfly";
const SERVER_VERSION = "1.0.0";
// TODO: Add your Butterfly API configuration here
const BUTTERFLY_API_URL = process.env.BUTTERFLY_API_URL || "http://localhost:8000";
const BUTTERFLY_API_KEY = process.env.BUTTERFLY_API_KEY || "";
// ============================================
// MOCK DATA - Replace with real API calls
// ============================================
function generateMockCandles(symbol, timeframe, limit) {
    const candles = [];
    const now = Date.now();
    const intervalMs = timeframe === "1h" ? 3600000 :
        timeframe === "4h" ? 14400000 :
            timeframe === "1d" ? 86400000 : 3600000;
    let basePrice = symbol === "BTC" ? 42000 :
        symbol === "ETH" ? 2200 :
            symbol === "SOL" ? 95 : 1000;
    for (let i = limit - 1; i >= 0; i--) {
        const time = new Date(now - (i * intervalMs)).toISOString();
        const volatility = basePrice * 0.02; // 2% volatility
        const open = basePrice + (Math.random() - 0.5) * volatility;
        const close = basePrice + (Math.random() - 0.5) * volatility;
        const high = Math.max(open, close) + Math.random() * volatility * 0.5;
        const low = Math.min(open, close) - Math.random() * volatility * 0.5;
        const volume = Math.floor(Math.random() * 1000000) + 500000;
        candles.push({
            time,
            open: Math.round(open * 100) / 100,
            high: Math.round(high * 100) / 100,
            low: Math.round(low * 100) / 100,
            close: Math.round(close * 100) / 100,
            volume,
        });
        basePrice = close; // Next candle starts where this one closed
    }
    return candles;
}
// ============================================
// REAL API CALL FUNCTION (TODO)
// ============================================
async function fetchButterflyCandles(symbol, timeframe, limit) {
    // TODO: Replace this with actual Butterfly API call
    // Example implementation:
    /*
    const response = await fetch(
        `${BUTTERFLY_API_URL}/api/candles?symbol=${symbol}&timeframe=${timeframe}&limit=${limit}`,
        {
            headers: {
                'Authorization': `Bearer ${BUTTERFLY_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );

    if (!response.ok) {
        throw new Error(`Butterfly API error: ${response.statusText}`);
    }

    return await response.json();
    */
    // For now, return mock data
    console.log(`🔧 [MOCK] Fetching candles for ${symbol} ${timeframe} (limit: ${limit})`);
    return {
        symbol,
        timeframe,
        candles: generateMockCandles(symbol, timeframe, limit)
    };
}
// ============================================
// CREATE MCP SERVER
// ============================================
const server = new FastMCP({
    name: SERVER_NAME,
    version: SERVER_VERSION,
});
console.log(`🚀 Initializing ${SERVER_NAME} MCP Server v${SERVER_VERSION}`);
// ============================================
// TOOL: get_candles
// ============================================
server.addTool({
    name: "get_candles",
    description: "Get candle data from Butterfly API for technical analysis",
    parameters: z.object({
        symbol: z.string().describe("Trading pair symbol (e.g., BTC, ETH, SOL)"),
        timeframe: z.string().describe("Candle timeframe (e.g., 1h, 4h, 1d)"),
        limit: z.number().min(1).max(1000).default(100).describe("Number of candles to retrieve"),
    }),
    execute: async (args) => {
        try {
            console.log(`📊 Tool called: get_candles(${args.symbol}, ${args.timeframe}, ${args.limit})`);
            // Fetch data from Butterfly API (currently mock)
            const data = await fetchButterflyCandles(args.symbol.toUpperCase(), args.timeframe.toLowerCase(), args.limit);
            // Calculate some basic statistics for the response
            const candles = data.candles;
            const latestCandle = candles[candles.length - 1];
            const oldestCandle = candles[0];
            const priceChange = latestCandle.close - oldestCandle.close;
            const priceChangePercent = ((priceChange / oldestCandle.close) * 100).toFixed(2);
            // Return formatted response as string (FastMCP requires string return)
            return JSON.stringify({
                success: true,
                symbol: data.symbol,
                timeframe: data.timeframe,
                candles_count: candles.length,
                period: {
                    from: oldestCandle.time,
                    to: latestCandle.time
                },
                latest_price: latestCandle.close,
                price_change: priceChange,
                price_change_percent: `${priceChangePercent}%`,
                candles: candles.slice(-10), // Return last 10 for preview
                full_data_summary: `Retrieved ${candles.length} candles from ${oldestCandle.time} to ${latestCandle.time}. Latest price: ${latestCandle.close}, Change: ${priceChangePercent}%`
            }, null, 2);
        }
        catch (error) {
            console.error("❌ Error in get_candles:", error);
            return JSON.stringify({
                error: "Failed to fetch candle data",
                details: error instanceof Error ? error.message : "Unknown error",
                symbol: args.symbol,
                timeframe: args.timeframe,
                limit: args.limit
            });
        }
    }
});
// ============================================
// TODO: Add more tools here
// ============================================
// Examples of additional tools you might want:
/*
server.addTool({
    name: "get_market_indicators",
    description: "Get technical indicators (RSI, MACD, etc.)",
    parameters: z.object({
        symbol: z.string(),
        indicators: z.array(z.string())
    }),
    execute: async (args) => {
        // Implement Butterfly API call for indicators
        return JSON.stringify({ indicators: [] });
    }
});
*/
// ============================================
// START SERVER
// ============================================
console.log("✅ Butterfly MCP Server ready");
console.log("📡 Waiting for connections via stdio...");
console.log("🔧 Tools available:");
console.log("  - get_candles: Get candle data for technical analysis");
// Run the server with stdio transport
server.start({
    transportType: "stdio",
});
//# sourceMappingURL=butterfly-server.js.map