import { ChatAnthropic } from '@langchain/anthropic';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

interface ConversationExchange {
    userMessage: string;
    assistantMessage: string;
}

export async function generateChatTitle(
    exchanges: ConversationExchange[]
): Promise<string> {
    try {
        const model = new ChatAnthropic({
            modelName: 'claude-haiku-4-5',
            anthropicApiKey: process.env.ANTHROPIC_API_KEY,
            temperature: 0.7,
            maxTokens: 50,
        });

        const systemPrompt = `You are a title generator. Your only job is to create short, descriptive titles for conversations.

Rules:
- Output ONLY the title (no explanations, no quotes, no prefix)
- Maximum 6 words
- Look at the FULL conversation to understand the topic
- Even if conversation starts with greetings, find the actual topic
- Be specific and descriptive
- Examples of GOOD titles:
  * "Bitcoin Price Analysis"
  * "Trading Strategy Discussion"
  * "Platform Features Overview"
  * "Casual Greeting Conversation" (if truly only greetings)
- NEVER output: "New Conversation", "New Chat", or generic phrases`;

        const conversationText = exchanges
            .map((ex, i) => `Exchange ${i + 1}:\nUser: ${ex.userMessage}\nAssistant: ${ex.assistantMessage}`)
            .join('\n\n');

        const userPrompt = `Full conversation:\n\n${conversationText}\n\nGenerate a descriptive title (6 words max):`;

        const response = await model.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(userPrompt),
        ]);

        let title = response.content.toString().trim();
        console.log("Raw title:", title);

        title = title.replace(/^["']|["']$/g, '');
        title = title.replace(/^Title:\s*/i, '');
        title = title.replace(/^Here's?\s+a?\s+title:\s*/i, '');

        const lines = title.split('\n');
        if (lines.length > 1) {
            title = lines[0];
        }

        const words = title.split(' ').filter(w => w.length > 0);
        if (words.length > 6) {
            title = words.slice(0, 6).join(' ') + '...';
        }

        if (title.length > 50) {
            title = title.substring(0, 47) + '...';
        }

        if (!title || title.length < 3) {
            return 'General Conversation';
        }

        console.log("Final title:", title);
        return title;
    } catch (error) {
        console.error('❌ Error generating title:', error);
        return 'General Conversation';
    }
}