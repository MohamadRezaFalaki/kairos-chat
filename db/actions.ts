"use server"

import {db} from "@/db"
import {chats, messages, parts} from "@/db/schema"
import {eq, desc} from "drizzle-orm"
import type {UIMessage} from "ai"

export async function createChat(userId: string, title?: string) {
    try {
        const [chat] = await db
            .insert(chats)
            .values({
                userId,
                title: title || "New Chat",
            })
            .returning()

        return chat
    } catch (error) {
        console.error("❌ Error creating chat:", error)
        throw new Error("Failed to create chat")
    }
}

export async function getChat(chatId: number) {
    try {
        const [chat] = await db.select().from(chats).where(eq(chats.id, chatId)).limit(1)

        return chat
    } catch (error) {
        console.error("❌ Error getting chat:", error)
        return null
    }
}

export async function getUserChats(userId: string) {
    try {
        const userChats = await db.select().from(chats).where(eq(chats.userId, userId)).orderBy(desc(chats.updatedAt))

        return userChats
    } catch (error) {
        console.error("❌ Error getting user chats:", error)
        return []
    }
}

export async function updateChatTitle(chatId: number, title: string) {
    try {
        await db
            .update(chats)
            .set({
                title,
                updatedAt: new Date(),
            })
            .where(eq(chats.id, chatId))

        console.log("✅ Chat title updated:", chatId)
    } catch (error) {
        console.error("❌ Error updating chat title:", error)
        throw new Error("Failed to update chat title")
    }
}

export async function deleteChat(chatId: number) {
    try {
        await db.delete(chats).where(eq(chats.id, chatId))
    } catch (error) {
        console.error("❌ Error deleting chat:", error)
        throw new Error("Failed to delete chat")
    }
}

export async function saveMessages(chatId: number, uiMessages: UIMessage[]) {
    try {
        await db.update(chats).set({updatedAt: new Date()}).where(eq(chats.id, chatId))

        for (const uiMessage of uiMessages) {

            const [savedMessage] = await db
                .insert(messages)
                .values({
                    chatId,
                    role: uiMessage.role,
                })
                .returning()

            for (let i = 0; i < uiMessage.parts.length; i++) {
                const part = uiMessage.parts[i]

                const partData: any = {
                    messageId: savedMessage.id,
                    partIndex: i,
                    textContent: null,
                    fileName: null,
                    fileUrl: null,
                    fileType: null,
                    reasoningContent: null,
                    toolName: null,
                    toolInput: null,
                    toolOutput: null,
                }

                if (part.type === "text") {
                    partData.textContent = part.text
                } else if (part.type === "file") {
                    partData.fileName = (part as any).filename
                    partData.fileUrl = (part as any).url
                    partData.fileType = (part as any).mediaType
                } else if (part.type === "reasoning") {
                    partData.reasoningContent = part.text
                } else if (part.type === "data-toolCall") {
                    const toolData = (part as any).data;
                    partData.toolName = toolData.toolName;
                    partData.toolInput = toolData.toolInput
                        ? (typeof toolData.toolInput === 'string'
                            ? toolData.toolInput
                            : JSON.stringify(toolData.toolInput))
                        : '{}';
                } else if (part.type === "data-toolResult") {
                    const toolData = (part as any).data;
                    partData.toolName = toolData.toolName;
                    partData.toolInput = toolData.toolInput
                        ? (typeof toolData.toolInput === 'string'
                            ? toolData.toolInput
                            : JSON.stringify(toolData.toolInput))
                        : '{}';
                    partData.toolOutput = toolData.toolResult
                        ? (typeof toolData.toolResult === 'string'
                            ? toolData.toolResult
                            : JSON.stringify(toolData.toolResult))
                        : 'null';
                } else if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
                    continue
                }
                await db.insert(parts).values(partData)
            }
        }

    } catch (error) {
        console.error("❌ Error saving messages:", error)
        throw new Error("Failed to save messages")
    }
}

export async function loadChatMessages(chatId: number): Promise<UIMessage[]> {
    try {
        const chatMessages = await db.select().from(messages).where(eq(messages.chatId, chatId)).orderBy(messages.createdAt)

        const uiMessages: UIMessage[] = []
        for (const message of chatMessages) {

            const messageParts = await db.select().from(parts).where(eq(parts.messageId, message.id)).orderBy(parts.partIndex)
            const convertedParts: any[] = []

            for (const part of messageParts) {
                if (part.textContent) {
                    convertedParts.push({
                        type: "text",
                        text: part.textContent,
                    })
                } else if (part.fileName) {
                    convertedParts.push({
                        type: "file",
                        filename: part.fileName,
                        url: part.fileUrl || "",
                        mediaType: part.fileType || "",
                    })
                } else if (part.reasoningContent) {
                    convertedParts.push({
                        type: "reasoning",
                        text: part.reasoningContent,
                    })
                } else if (part.toolName && !part.toolOutput) {
                    try {
                        const toolInput = typeof part.toolInput === 'string'
                            ? JSON.parse(part.toolInput)
                            : part.toolInput || {};

                        convertedParts.push({
                            type: "data-toolCall",
                            data: {
                                toolName: part.toolName,
                                toolInput: toolInput,
                                state: 'complete',
                            },
                        });
                    } catch (e) {
                        console.error('❌ Error parsing tool input:', part.toolInput, e);
                    }
                }
                else if (part.toolName && part.toolOutput) {
                    try {
                        const toolInput = typeof part.toolInput === 'string'
                            ? JSON.parse(part.toolInput)
                            : part.toolInput || {};

                        const toolResult = typeof part.toolOutput === 'string'
                            ? JSON.parse(part.toolOutput)
                            : part.toolOutput || null;

                        convertedParts.push({
                            type: "data-toolResult",
                            data: {
                                toolName: part.toolName,
                                toolInput: toolInput,
                                toolResult: toolResult,
                                state: 'complete',
                            },
                        });
                    } catch (e) {
                        console.error('❌ Error parsing tool result:', part.toolOutput, e);
                    }
                }

            }
            uiMessages.push({
                id: `msg-${message.id}`,
                role: message.role as "user" | "assistant" | "system",
                parts: convertedParts,
                createdAt: message.createdAt,
            } as UIMessage)
        }
        return uiMessages
    } catch (error) {
        console.error("❌ Error loading messages:", error)
        return []
    }
}
