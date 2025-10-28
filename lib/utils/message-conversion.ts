import type { UIMessage } from 'ai';
import {
    BaseMessage,
    HumanMessage,
    AIMessage,
    SystemMessage, ToolMessage,
} from '@langchain/core/messages';

export function uiMessagesToLangChain(uiMessages: UIMessage[]): BaseMessage[] {
    const langChainMessages: BaseMessage[] = [];

    for (const message of uiMessages) {
        switch (message.role) {
            case 'user': {
                const textContent = message.parts
                    .filter((part) => part.type === 'text')
                    .map((part) => (part as any).text)
                    .join('\n');

                if (textContent.trim()) {
                    langChainMessages.push(new HumanMessage(textContent));
                }
                break;
            }

            case 'assistant': {
                const textContent = message.parts
                    .filter((part) => part.type === 'text')
                    .map((part) => (part as any).text)
                    .join('\n');

                const toolCalls = message.parts
                    .filter((part) => part.type === 'data-toolCall')
                    .map((part) => {
                        const data = (part as any).data;
                        return {
                            name: data.toolName,
                            args: data.toolInput,
                            id: data.id || `tool-${Date.now()}`,
                        };
                    });

                if (textContent.trim() || toolCalls.length > 0) {
                    langChainMessages.push(new AIMessage({
                        content: textContent || '',
                        tool_calls: toolCalls.length > 0 ? toolCalls : undefined,
                    }));
                }

                const toolResults = message.parts.filter((part) => part.type === 'data-toolResult');
                for (const toolPart of toolResults) {
                    const data = (toolPart as any).data;
                    langChainMessages.push(new ToolMessage({
                        content: typeof data.toolResult === 'string'
                            ? data.toolResult
                            : JSON.stringify(data.toolResult),
                        tool_call_id: data.id || `tool-${Date.now()}`,
                    }));
                }
                break;
            }

            case 'system': {
                const textContent = message.parts
                    .filter((part) => part.type === 'text')
                    .map((part) => (part as any).text)
                    .join('\n');

                if (textContent.trim()) {
                    langChainMessages.push(new SystemMessage(textContent));
                }
                break;
            }

            default:
                console.warn('Unknown message role:', message.role);
        }
    }
    return langChainMessages;
}

export function langChainResponseToUIMessage(
    responseText: string,
    messageId?: string
): UIMessage {
    return {
        id: messageId || `msg-${Date.now()}`,
        role: 'assistant',
        parts: [
            {
                type: 'text',
                text: responseText,
            },
        ],
    };
}

export function getLastUserMessage(messages: UIMessage[]): string {
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
            const textParts = messages[i].parts.filter((p) => p.type === 'text');
            return textParts.map((p) => (p as any).text).join('\n');
        }
    }
    return '';
}

export function createTextMessage(
    text: string,
    role: 'user' | 'assistant' | 'system' = 'user'
): UIMessage {
    return {
        id: `msg-${Date.now()}`,
        role,
        parts: [
            {
                type: 'text',
                text,
            },
        ],
    };
}