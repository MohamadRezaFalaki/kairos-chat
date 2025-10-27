// ============================================
// MCP SERVER TEST SCRIPT
// ============================================
// This script tests the Butterfly MCP server standalone
// Run with: node mcp-server/test-mcp-server.js

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testMCPServer() {
    console.log('🧪 Testing Butterfly MCP Server...\n');

    let client;

    try {
        // ============================================
        // STEP 1: Connect to MCP Server
        // ============================================
        console.log('📡 Step 1: Connecting to MCP server...');

        const serverPath = path.join(__dirname, 'dist', 'butterfly-server.js');
        console.log('   Server path:', serverPath);

        const transport = new StdioClientTransport({
            command: 'node',
            args: [serverPath],
        });

        client = new Client(
            {
                name: 'test-client',
                version: '1.0.0',
            },
            {
                capabilities: {},
            }
        );

        await client.connect(transport);
        console.log('✅ Connected!\n');

        // ============================================
        // STEP 2: List Available Tools
        // ============================================
        console.log('📋 Step 2: Listing available tools...');
        const toolsList = await client.listTools();

        console.log('   Found', toolsList.tools.length, 'tool(s):');
        toolsList.tools.forEach((tool, index) => {
            console.log(`   ${index + 1}. ${tool.name}`);
            console.log(`      Description: ${tool.description}`);
        });
        console.log('');

        // ============================================
        // STEP 3: Test get_candles Tool
        // ============================================
        console.log('🔧 Step 3: Testing get_candles tool...');
        console.log('   Calling: get_candles(BTC, 1h, 10)');

        const result = await client.callTool({
            name: 'get_candles',
            arguments: {
                symbol: 'BTC',
                timeframe: '1h',
                limit: 10,
            },
        });

        console.log('   Result type:', result.content[0].type);

        if (result.content[0].type === 'text') {
            const data = JSON.parse(result.content[0].text);
            console.log('   ✅ Success!');
            console.log('   Symbol:', data.symbol);
            console.log('   Timeframe:', data.timeframe);
            console.log('   Candles count:', data.candles_count);
            console.log('   Latest price:', data.latest_price);
            console.log('   Price change:', data.price_change_percent);
            console.log('');
            console.log('   Sample candles (first 3):');
            data.candles.slice(0, 3).forEach((candle, i) => {
                console.log(`   ${i + 1}. Time: ${candle.time}, Close: ${candle.close}`);
            });
        }

        console.log('\n✅ All tests passed!');
        console.log('🎉 MCP server is working correctly!\n');

    } catch (error) {
        console.error('\n❌ Test failed:', error);
        console.error('\nTroubleshooting tips:');
        console.error('1. Make sure you ran: npm run build:mcp');
        console.error('2. Check that /mcp-server/dist/butterfly-server.js exists');
        console.error('3. Verify Node.js version is 18 or higher');
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log('🔌 Connection closed');
        }
    }
}

testMCPServer();