"use client"

import { useState, useCallback } from "react"
import type { UIMessage } from "ai"

type CustomChatStatus = "idle" | "submitted" | "streaming" | "error"

interface SendMessageOptions {
    sessionId: string
    userId: string
    model: string
    webSearch: boolean
}

interface RegenerateOptions {
    sessionId: string
    userId: string
    model: string
    webSearch: boolean
}

export function useChat() {
    const [messages, setMessages] = useState<UIMessage[]>([])
    const [status, setStatus] = useState<CustomChatStatus>("idle")

    const sendMessage = useCallback(async (message: { text: string }, options: SendMessageOptions) => {
        // Create user message
        const userMessage: UIMessage = {
            id: `msg-${Date.now()}`,
            role: "user",
            parts: [
                {
                    type: "text",
                    text: message.text,
                },
            ],
        }

        // Add user message to UI immediately
        setMessages((prev) => [...prev, userMessage])
        setStatus("submitted")

        try {
            // Send to backend
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [userMessage],
                    sessionId: options.sessionId,
                    userId: options.userId,
                    model: options.model,
                    webSearch: options.webSearch,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to send message")
            }

            setStatus("streaming")

            // Create assistant message placeholder
            const assistantMessage: UIMessage = {
                id: `msg-${Date.now()}-assistant`,
                role: "assistant",
                parts: [],
            }

            let currentTextBlockId: string | null = null
            let currentTextContent = ""

            // Read stream
            const reader = response.body?.getReader()
            const decoder = new TextDecoder()

            if (!reader) {
                throw new Error("No reader available")
            }

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split("\n")

                for (const line of lines) {
                    if (!line.trim() || !line.startsWith("data: ")) continue

                    const data = line.slice(6) // Remove 'data: ' prefix

                    if (data === "[DONE]") continue

                    try {
                        const parsed = JSON.parse(data)

                        if (parsed.type === "text-start") {
                            currentTextBlockId = parsed.id
                            currentTextContent = ""
                        } else if (parsed.type === "text-delta" && currentTextBlockId) {
                            currentTextContent += parsed.delta

                            // Update assistant message with streaming text
                            setMessages((prev) => {
                                const newMessages = [...prev]
                                const lastMessage = newMessages[newMessages.length - 1]

                                if (lastMessage?.role === "assistant") {
                                    // Update existing assistant message
                                    lastMessage.parts = [
                                        {
                                            type: "text",
                                            text: currentTextContent,
                                        },
                                    ]
                                } else {
                                    // Add new assistant message
                                    newMessages.push({
                                        ...assistantMessage,
                                        parts: [
                                            {
                                                type: "text",
                                                text: currentTextContent,
                                            },
                                        ],
                                    })
                                }

                                return newMessages
                            })
                        } else if (parsed.type === "text-end") {
                            currentTextBlockId = null
                        }
                    } catch (e) {
                        console.error("[v0] Error parsing stream chunk:", e)
                    }
                }
            }

            setStatus("idle")
        } catch (error) {
            console.error("[v0] Error sending message:", error)
            setStatus("error")

            // Add error message
            setMessages((prev) => [
                ...prev,
                {
                    id: `msg-${Date.now()}-error`,
                    role: "assistant",
                    parts: [
                        {
                            type: "text",
                            text: "Sorry, I encountered an error processing your request.",
                        },
                    ],
                },
            ])
        }
    }, [])

    const regenerate = useCallback(
        async (options: RegenerateOptions) => {
            // Remove last assistant message
            setMessages((prev) => {
                const newMessages = [...prev]
                if (newMessages[newMessages.length - 1]?.role === "assistant") {
                    newMessages.pop()
                }
                return newMessages
            })

            // Get last user message
            const lastUserMessage = messages
                .slice()
                .reverse()
                .find((m) => m.role === "user")

            if (!lastUserMessage) return

            // Resend
            await sendMessage(
                {
                    text: lastUserMessage.parts.find((p) => p.type === "text")?.text || "",
                },
                options,
            )
        },
        [messages, sendMessage],
    )

    return {
        messages,
        setMessages,
        sendMessage,
        regenerate,
        status,
    }
}
