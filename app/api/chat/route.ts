import { ChatAnthropic } from '@langchain/anthropic';
import {
    createUIMessageStream,
    createUIMessageStreamResponse,
    type UIMessage
} from 'ai';
import { getChat, createChat, loadChatMessages, saveMessages } from '@/db/actions';
import { uiMessagesToLangChain } from '@/lib/utils/message-conversion';

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
                // Convert to LangChain format
                const langChainMessages = uiMessagesToLangChain(allMessages);
                console.log('🔗 Converted to LangChain format:', langChainMessages.length, 'messages');

                // Initialize LangChain model
                const model = new ChatAnthropic({
                    apiKey: process.env.ANTHROPIC_API_KEY!,
                    model: 'claude-sonnet-4-5-20250929',
                    temperature: 0.7,
                    streaming: true,
                });

                console.log('🤖 Calling Claude API...');

                try {
                    // Stream from LangChain
                    const langChainStream = await model.stream(langChainMessages);

                    // Generate unique text block ID
                    const textBlockId = `text-${Date.now()}`;

                    // Send text-start chunk
                    writer.write({
                        type: 'text-start',
                        id: textBlockId,
                    });

                    // Stream text deltas
                    let fullResponse = '';

                    for await (const chunk of langChainStream) {
                        const content = chunk.content as string;
                        fullResponse += content;

                        // Write text-delta chunk (incremental text)
                        writer.write({
                            type: 'text-delta',
                            id: textBlockId,
                            delta: content,
                        });
                    }

                    // Send text-end chunk
                    writer.write({
                        type: 'text-end',
                        id: textBlockId,
                    });

                    console.log('✅ Stream completed');

                    // Create assistant message for saving
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

                    // Save to database
                    console.log('💾 Saving messages to database...');
                    await saveMessages(chat.id, [newUserMessage, assistantMessage]);
                    console.log('✅ Messages saved successfully');

                } catch (error) {
                    console.error('❌ Error during streaming:', error);

                    // Send error as text
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

        // ============================================
        // STEP 5: Return streaming response
        // ============================================
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