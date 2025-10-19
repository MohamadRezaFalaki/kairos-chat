import type { UIMessage } from 'ai';
import {
    BaseMessage,
    HumanMessage,
    AIMessage,
    SystemMessage,
} from '@langchain/core/messages';

// ============================================
// UIMessage → LangChain Format
// ============================================

/**
 * Convert Vercel AI SDK UIMessage[] to LangChain BaseMessage[]
 * Used when sending messages to Claude via LangChain
 */
export function uiMessagesToLangChain(uiMessages: UIMessage[]): BaseMessage[] {
    const langChainMessages: BaseMessage[] = [];

    for (const message of uiMessages) {
        // Extract text content from parts
        const textContent = message.parts
            .filter((part) => part.type === 'text')
            .map((part) => (part as any).text)
            .join('\n');

        // Skip empty messages
        if (!textContent.trim()) continue;

        // Convert based on role
        switch (message.role) {
            case 'user':
                langChainMessages.push(new HumanMessage(textContent));
                break;

            case 'assistant':
                langChainMessages.push(new AIMessage(textContent));
                break;

            case 'system':
                langChainMessages.push(new SystemMessage(textContent));
                break;

            default:
                console.warn('Unknown message role:', message.role);
        }
    }

    return langChainMessages;
}

// ============================================
// LangChain Response → UIMessage
// ============================================

/**
 * Convert LangChain response text to UIMessage
 * Used when receiving response from Claude
 * NOTE: createdAt removed - not part of UIMessage type
 */
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

// ============================================
// Helper: Extract Last User Message
// ============================================

/**
 * Get the last user message text from UIMessage array
 */
export function getLastUserMessage(messages: UIMessage[]): string {
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
            const textParts = messages[i].parts.filter((p) => p.type === 'text');
            return textParts.map((p) => (p as any).text).join('\n');
        }
    }
    return '';
}

// ============================================
// Helper: Create UIMessage from Text
// ============================================

/**
 * Create a simple text UIMessage
 * NOTE: createdAt removed - not part of UIMessage type
 */
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