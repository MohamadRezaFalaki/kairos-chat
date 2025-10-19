import { pgTable, serial, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// CHATS TABLE
// ============================================
export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), // Frontend-generated UUID
    title: text('title').default('New Chat'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// MESSAGES TABLE
// ============================================
export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id')
        .notNull()
        .references(() => chats.id, { onDelete: 'cascade' }),
    role: text('role').notNull(), // 'user' | 'assistant' | 'system'
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// PARTS TABLE (Message content parts)
// ============================================
export const parts = pgTable('parts', {
    id: serial('id').primaryKey(),
    messageId: integer('message_id')
        .notNull()
        .references(() => messages.id, { onDelete: 'cascade' }),
    partIndex: integer('part_index').notNull(), // Order of parts in message

    // Text content
    textContent: text('text_content'),

    // File attachment (Phase 2)
    fileName: text('file_name'),
    fileUrl: text('file_url'),
    fileType: text('file_type'),
    fileData: text('file_data'), // Base64 or URL

    // Reasoning/thinking
    reasoningContent: text('reasoning_content'),

    // Tool calls (Phase 5)
    toolName: text('tool_name'),
    toolInput: jsonb('tool_input'),
    toolOutput: jsonb('tool_output'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// RELATIONS
// ============================================
export const chatsRelations = relations(chats, ({ many }) => ({
    messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one, many }) => ({
    chat: one(chats, {
        fields: [messages.chatId],
        references: [chats.id],
    }),
    parts: many(parts),
}));

export const partsRelations = relations(parts, ({ one }) => ({
    message: one(messages, {
        fields: [parts.messageId],
        references: [messages.id],
    }),
}));

// ============================================
// TYPES
// ============================================
export type Chat = typeof chats.$inferSelect;
export type NewChat = typeof chats.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type Part = typeof parts.$inferSelect;
export type NewPart = typeof parts.$inferInsert;