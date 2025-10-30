"use client"

import {useState, useCallback} from "react"
import type {UIMessage} from "ai"

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

    const [boxState, setBoxState] = useState<{
        backgroundColor: string
        text: string
    } | null>(null)


    const sendMessage = useCallback(async (message: { text: string }, options: SendMessageOptions) => {
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

        setMessages((prev) => [...prev, userMessage])
        setStatus("submitted")

        try {
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

            const assistantMessage: UIMessage = {
                id: `msg-${Date.now()}-assistant`,
                role: "assistant",
                parts: [],
            }

            let currentTextBlockId: string | null = null
            let currentTextContent = ""

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()

            if (!reader) {
                throw new Error("No reader available")
            }

            while (true) {
                const {done, value} = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, {stream: true})
                const lines = chunk.split("\n")

                for (const line of lines) {
                    if (!line.trim() || !line.startsWith("data: ")) continue

                    const data = line.slice(6)

                    if (data === "[DONE]") continue

                    try {
                        const parsed = JSON.parse(data)

                        if (parsed.type === "text-start") {
                            currentTextBlockId = parsed.id
                            currentTextContent = ""
                        } else if (parsed.type === "text-delta" && currentTextBlockId) {
                            currentTextContent += parsed.delta

                            setMessages((prev) => {
                                const newMessages = [...prev]
                                const lastMessage = newMessages[newMessages.length - 1]

                                if (lastMessage?.role === "assistant") {
                                    const textPartIndex = lastMessage.parts.findIndex((p: any) => p.type === "text")

                                    if (textPartIndex >= 0) {
                                        lastMessage.parts[textPartIndex] = {
                                            type: "text",
                                            text: currentTextContent,
                                        }
                                    } else {
                                        lastMessage.parts.push({
                                            type: "text",
                                            text: currentTextContent,
                                        })
                                    }
                                } else {
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
                        } else if (parsed.type === "data-toolCall") {
                            console.log("[v0] Tool call:", parsed.data.toolName, parsed.data.state)

                            setMessages((prev) => {
                                const newMessages = [...prev]
                                const lastMessage = newMessages[newMessages.length - 1]

                                if (lastMessage?.role === "assistant") {
                                    const existingPartIndex = lastMessage.parts.findIndex(
                                        (p: any) => p.type === "data-toolCall" && p.data?.id === parsed.data.id
                                    )

                                    if (existingPartIndex >= 0) {
                                        lastMessage.parts[existingPartIndex] = {
                                            type: "data-toolCall",
                                            data: parsed.data,
                                        }
                                    } else {
                                        lastMessage.parts.push({
                                            type: "data-toolCall",
                                            data: parsed.data,
                                        })
                                    }
                                } else {
                                    newMessages.push({
                                        ...assistantMessage,
                                        parts: [
                                            {
                                                type: "data-toolCall",
                                                data: parsed.data,
                                            },
                                        ],
                                    })
                                }

                                return newMessages
                            })
                        }


                        else if (parsed.type === "data-toolResult") {

                            setMessages((prev) => {
                                const newMessages = [...prev]
                                const lastMessage = newMessages[newMessages.length - 1]

                                if (lastMessage?.role === "assistant") {
                                    const toolCallIndex = lastMessage.parts.findIndex(
                                        (p: any) => p.type === "data-toolCall" && p.data?.id === parsed.data.id
                                    )

                                    if (toolCallIndex >= 0) {
                                        lastMessage.parts.splice(toolCallIndex, 1)
                                    }

                                    // Then handle the result part
                                    const existingPartIndex = lastMessage.parts.findIndex(
                                        (p: any) => p.type === "data-toolResult" && p.data?.id === parsed.data.id
                                    )

                                    if (existingPartIndex >= 0) {
                                        lastMessage.parts[existingPartIndex] = {
                                            type: "data-toolResult",
                                            data: parsed.data,
                                        }
                                    } else {
                                        lastMessage.parts.push({
                                            type: "data-toolResult",
                                            data: parsed.data,
                                        })
                                    }
                                } else {
                                    newMessages.push({
                                        ...assistantMessage,
                                        parts: [
                                            {
                                                type: "data-toolResult",
                                                data: parsed.data,
                                            },
                                        ],
                                    })
                                }

                                return newMessages
                            })
                        }

                        else if (parsed.type === "data-box-update") {
                            setBoxState({
                                backgroundColor: parsed.data.backgroundColor,
                                text: parsed.data.text,
                            })
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
            setMessages((prev) => {
                const newMessages = [...prev]
                if (newMessages[newMessages.length - 1]?.role === "assistant") {
                    newMessages.pop()
                }
                return newMessages
            })

            const lastUserMessage = messages
                .slice()
                .reverse()
                .find((m) => m.role === "user")

            if (!lastUserMessage) return

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
        boxState,
    }
}