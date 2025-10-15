import { toUIMessageStream } from '@ai-sdk/langchain';
import { ChatAnthropic } from '@langchain/anthropic';
import {
    createUIMessageStreamResponse,
    UIMessage,
    convertToModelMessages
} from 'ai';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const {
        messages,
        model,
        webSearch,
    }: {
        messages: UIMessage[];
        model: string;
        webSearch: boolean;
    } = await req.json();
    console.log(JSON.stringify(messages, null, 2));
    // Initialize LangChain's ChatAnthropic model
    const langchainModel = new ChatAnthropic({
        model: model,
        apiKey: process.env.ANTHROPIC_API_KEY,
        temperature: 0.7,
        streaming: true,
    });

    // Add system message if needed
    const systemMessage = new SystemMessage(
        'Your name is Kairos assistant that can answer questions and help with tasks'
    );

    // Convert UI messages to LangChain format
    const langchainMessages = messages.map((msg) => {
        switch (msg.role) {
            case 'user':
                return new HumanMessage(msg.parts.find(p => p.type === 'text')?.text || '');
            case 'assistant':
                return new AIMessage(msg.parts.find(p => p.type === 'text')?.text || '');
            case 'system':
                return new SystemMessage(msg.parts.find(p => p.type === 'text')?.text || '');
            default:
                return new HumanMessage('');
        }
    });


    // Stream the response
    const stream = await langchainModel.stream([
        systemMessage,
        ...langchainMessages
    ]);

    // Convert LangChain stream to UI Message Stream
    return createUIMessageStreamResponse({
        stream: toUIMessageStream(stream),
    });
}