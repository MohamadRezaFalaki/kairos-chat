import { ChatAnthropic } from '@langchain/anthropic';
import {
    createUIMessageStream,
    createUIMessageStreamResponse,
    type UIMessage
} from 'ai';
import { getChat, createChat, loadChatMessages, saveMessages } from '@/db/actions';
import { uiMessagesToLangChain } from '@/lib/utils/message-conversion';
import { searchSimilarChunks } from '@/lib/rag/document-processor';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';

// ============================================
// STATIC SYSTEM PROMPT (role/behavior only)
// ============================================
const SYSTEM_PROMPT = `You are KAIROS, an AI trading assistant.

Your role is to help traders and investors with:
- Market analysis and trading strategies
- Risk management and position sizing
- Understanding trading concepts
- Interpreting the User Handbook

**Instructions:**
- Answer questions based on the provided context from the User Handbook
- If the context doesn't contain the answer, clearly state "I don't have information about that in the User Handbook"
- Be helpful, concise, and professional
- Reference specific sections when relevant`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages, sessionId, userId } = body as {
            messages: UIMessage[];
            sessionId: string;
            userId: string;
        };

        console.log('📨 Received request:', {
            sessionId,
            userId,
            messageCount: messages.length,
        });

        // ============================================
        // STEP 1: Ensure chat exists in database
        // ============================================
        let chat = await getChat(parseInt(sessionId));

        if (!chat) {
            console.log('🆕 Creating new chat...');
            chat = await createChat(userId, 'New Chat');
            console.log('✅ Chat created:', chat.id);
        }

        // ============================================
        // STEP 2: Load previous messages from database
        // ============================================
        const previousMessages = await loadChatMessages(chat.id);
        console.log('📚 Loaded', previousMessages.length, 'previous messages');

        // ============================================
        // STEP 3: Combine previous + new messages
        // ============================================
        const newUserMessage = messages[messages.length - 1];
        const allMessages = [...previousMessages, newUserMessage];
        console.log('💬 Total messages for context:', allMessages.length);

        // ============================================
        // STEP 4: Create UI Message Stream
        // ============================================
        const stream = createUIMessageStream({
            execute: async ({ writer }) => {
                // ============================================
                // RAG: EXTRACT USER QUERY FROM LAST MESSAGE
                // ============================================
                const userQuery = newUserMessage.parts
                    .filter(p => p.type === 'text')
                    .map(p => (p as any).text)
                    .join(' ');

                console.log('🔍 User query for RAG:', userQuery);

                // ============================================
                // RAG: RETRIEVE RELEVANT CONTEXT
                // ============================================
                console.log('📚 Searching knowledge base...');
                const relevantChunks = await searchSimilarChunks(userQuery, 3);

                // Build context section
                let contextSection = '';
                if (relevantChunks.length > 0) {
                    contextSection = '**Relevant sections from User Handbook:**\n\n' +
                        relevantChunks
                            .map((chunk, i) => `[Source ${i + 1}]:\n${chunk.content}`)
                            .join('\n\n---\n\n');

                    console.log('✅ Found', relevantChunks.length, 'relevant chunks');
                    console.log('📊 Similarities:', relevantChunks.map(c => c.similarity.toFixed(3)));
                } else {
                    console.log('⚠️ No relevant context found in knowledge base');
                    contextSection = '**Note:** No relevant information found in the User Handbook for this query.';
                }

                // ============================================
                // PATTERN B: BUILD USER MESSAGE WITH CONTEXT
                // ============================================
                // Reconstruct user's actual question with context prepended
                const augmentedUserMessage = `${contextSection}\n\n**User Question:** ${userQuery}`;

                // ============================================
                // CONVERT MESSAGES TO LANGCHAIN FORMAT
                // ============================================
                // Convert previous messages (all except the new one)
                const previousLangChainMessages = uiMessagesToLangChain(previousMessages);

                // Build full conversation:
                // 1. System message (static, defined once)
                // 2. Previous conversation history
                // 3. New user message WITH context
                const messagesWithContext = [
                    new SystemMessage(SYSTEM_PROMPT),
                    ...previousLangChainMessages,
                    new HumanMessage(augmentedUserMessage),
                ];

                console.log('🔗 Built conversation with', messagesWithContext.length, 'messages');

                // ============================================
                // INITIALIZE LANGCHAIN MODEL
                // ============================================
                const model = new ChatAnthropic({
                    apiKey: process.env.ANTHROPIC_API_KEY!,
                    model: 'claude-sonnet-4-5-20250929',
                    temperature: 0.7,
                    streaming: true,
                });

                console.log('🤖 Calling Claude API...');

                try {
                    // ============================================
                    // STREAM FROM LANGCHAIN
                    // ============================================
                    const langChainStream = await model.stream(messagesWithContext);

                    const textBlockId = `text-${Date.now()}`;

                    writer.write({
                        type: 'text-start',
                        id: textBlockId,
                    });

                    let fullResponse = '';

                    for await (const chunk of langChainStream) {
                        const content = chunk.content as string;
                        fullResponse += content;

                        writer.write({
                            type: 'text-delta',
                            id: textBlockId,
                            delta: content,
                        });
                    }

                    writer.write({
                        type: 'text-end',
                        id: textBlockId,
                    });

                    console.log('✅ Stream completed');

                    // ============================================
                    // SAVE ORIGINAL MESSAGES (WITHOUT RAG CONTEXT)
                    // ============================================
                    // Important: Save the ORIGINAL user message, not the augmented one
                    // This keeps the database clean
                    const assistantMessage: UIMessage = {
                        id: `msg-${Date.now()}`,
                        role: 'assistant',
                        parts: [
                            {
                                type: 'text',
                                text: fullResponse,
                            },
                        ],
                    };

                    console.log('💾 Saving messages to database...');
                    await saveMessages(chat.id, [newUserMessage, assistantMessage]);
                    console.log('✅ Messages saved successfully');

                } catch (error) {
                    console.error('❌ Error during streaming:', error);

                    const errorTextId = `text-${Date.now()}`;
                    writer.write({ type: 'text-start', id: errorTextId });
                    writer.write({
                        type: 'text-delta',
                        id: errorTextId,
                        delta: 'Sorry, I encountered an error processing your request.',
                    });
                    writer.write({ type: 'text-end', id: errorTextId });
                }
            },
        });

        return createUIMessageStreamResponse({
            stream,
        });

    } catch (error) {
        console.error('❌ Error in chat route:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to process chat request',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}