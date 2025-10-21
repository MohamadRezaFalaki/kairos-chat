"use server"

import { db } from "@/db"
import { chats, messages, parts } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import type { UIMessage } from "ai"

// ============================================
// CHAT OPERATIONS
// ============================================

export async function createChat(userId: string, title?: string) {
    try {
        const [chat] = await db
            .insert(chats)
            .values({
                userId,
                title: title || "New Chat",
            })
            .returning()

        console.log("✅ Chat created:", chat.id)
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
        console.log("✅ Chat deleted:", chatId)
    } catch (error) {
        console.error("❌ Error deleting chat:", error)
        throw new Error("Failed to delete chat")
    }
}

// ============================================
// MESSAGE OPERATIONS - SIMPLIFIED FOR PHASE 1
// ============================================

/**
 * Save messages to database
 * PHASE 1: Only handles text, file, and reasoning parts
 * Tool parts will be added in Phase 5
 */
export async function saveMessages(chatId: number, uiMessages: UIMessage[]) {
    try {
        await db.update(chats).set({ updatedAt: new Date() }).where(eq(chats.id, chatId))

        for (const uiMessage of uiMessages) {
            // Insert message
            const [savedMessage] = await db
                .insert(messages)
                .values({
                    chatId,
                    role: uiMessage.role,
                })
                .returning()

            // Insert parts - ONLY text, file, reasoning (Phase 1-2)
            for (let i = 0; i < uiMessage.parts.length; i++) {
                const part = uiMessage.parts[i]

                // PHASE 1: Only handle text and reasoning parts
                // PHASE 2: Will add file parts
                // PHASE 5: Will add tool parts

                const partData: any = {
                    messageId: savedMessage.id,
                    partIndex: i,
                    textContent: null,
                    fileName: null,
                    fileUrl: null,
                    fileType: null,
                    reasoningContent: null,
                    // Tool columns left NULL for Phase 1
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
                }
                // Skip all tool-* types for Phase 1
                else if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
                    console.log("⏭️  Skipping tool part (Phase 5 feature):", part.type)
                    continue
                }

                await db.insert(parts).values(partData)
            }
        }

        console.log("✅ Messages saved to database")
    } catch (error) {
        console.error("❌ Error saving messages:", error)
        throw new Error("Failed to save messages")
    }
}

/**
 * Load all messages for a chat
 * PHASE 1: Returns text and reasoning parts only
 */
export async function loadChatMessages(chatId: number): Promise<UIMessage[]> {
    try {
        const chatMessages = await db.select().from(messages).where(eq(messages.chatId, chatId)).orderBy(messages.createdAt)

        const uiMessages: UIMessage[] = []
        for (const message of chatMessages) {

            // Get parts for this message
            const messageParts = await db.select().from(parts).where(eq(parts.messageId, message.id)).orderBy(parts.partIndex)
            const convertedParts: any[] = []

            for (const part of messageParts) {
                // Text part
                if (part.textContent) {
                    convertedParts.push({
                        type: "text",
                        text: part.textContent,
                    })
                }
                // File part (Phase 2)
                else if (part.fileName) {
                    convertedParts.push({
                        type: "file",
                        filename: part.fileName,
                        url: part.fileUrl || "",
                        mediaType: part.fileType || "",
                    })
                }
                // Reasoning part
                else if (part.reasoningContent) {
                    convertedParts.push({
                        type: "reasoning",
                        text: part.reasoningContent,
                    })
                }
                // Skip tool parts for Phase 1
            }
            uiMessages.push({
                id: `msg-${message.id}`,
                role: message.role as "user" | "assistant" | "system",
                parts: convertedParts,
                createdAt: message.createdAt,
            } as UIMessage)
        }
        console.log("✅ Loaded", uiMessages.length, "messages from database")
        return uiMessages
    } catch (error) {
        console.error("❌ Error loading messages:", error)
        return []
    }
}
