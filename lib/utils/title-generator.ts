import {ChatAnthropic} from '@langchain/anthropic';
import {HumanMessage} from '@langchain/core/messages';

export async function generateChatTitle(
    userMessage: string,
    assistantMessage: string
): Promise<string> {
    try {
        const model = new ChatAnthropic({
            modelName: 'claude-haiku-4-5',
            anthropicApiKey: process.env.ANTHROPIC_API_KEY,
            temperature: 0.7,
            maxTokens: 50,
        });

        const prompt = `Generate a concise, descriptive title (maximum 6 words) for this conversation.
The title should capture the main topic or question.

User: ${userMessage}
Assistant: ${assistantMessage}

Title (6 words max, no quotes):`;

        const response = await model.invoke([new HumanMessage(prompt)]);

        let title = response.content.toString().trim();

        title = title.replace(/^["']|["']$/g, '');
        title = title.replace(/^Title:\s*/i, '');

        const words = title.split(' ');
        if (words.length > 6) {
            title = words.slice(0, 6).join(' ') + '...';
        }

        if (title.length > 50) {
            title = title.substring(0, 47) + '...';
        }

        return title || 'New Chat';
    } catch (error) {
        console.error('❌ Error generating title:', error);
        return 'New Chat';
    }
}