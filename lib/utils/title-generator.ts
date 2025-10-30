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
        console.log("444444444response", response);
        let title = response.content.toString().trim();
        console.log("5555555555title", title);

        title = title.replace(/^["']|["']$/g, '');
        console.log("6666666666title", title);

        title = title.replace(/^Title:\s*/i, '');
        console.log("6666666666title", title);

        const words = title.split(' ');
        console.log("77777777777words", words);

        if (words.length > 6) {
            title = words.slice(0, 6).join(' ') + '...';
        }
        console.log("88888888888title", title);

        if (title.length > 50) {
            title = title.substring(0, 47) + '...';
        }
        console.log("88888888888title", title);

        return title || 'New Chat';
    } catch (error) {
        console.error('❌ Error generating title:', error);
        return 'New Chat';
    }
}