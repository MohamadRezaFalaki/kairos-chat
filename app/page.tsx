"use client"

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation"
import { Message, MessageContent } from "@/components/ai-elements/message"
import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    type PromptInputMessage,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from "@/components/ai-elements/prompt-input"
import { Action, Actions } from "@/components/ai-elements/actions"
import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Response } from "@/components/ai-elements/response"
import { CopyIcon, GlobeIcon, RefreshCcwIcon, MessageSquareIcon, PlusIcon } from "lucide-react"
import { Source, Sources, SourcesContent, SourcesTrigger } from "@/components/ai-elements/sources"
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning"
import { Loader } from "@/components/ai-elements/loader"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const models = [
    {
        name: "Claude Haiku 3",
        value: "claude-3-haiku-20240307",
    },
    {
        name: "Claude Haiku 3.5",
        value: "claude-3-5-haiku-latest",
    },
    {
        name: "Claude Sonnet 3.7",
        value: "claude-3-7-sonnet-latest",
    },
    {
        name: "Claude Opus 4",
        value: "claude-opus-4-20250514",
    },
]

const ChatBotDemo = () => {
    const [input, setInput] = useState("")
    const [model, setModel] = useState<string>(models[0].value)
    const [webSearch, setWebSearch] = useState(false)
    const { messages, sendMessage, status, regenerate } = useChat()

    const chatSessions = [
        { id: "1", title: "New Chat", timestamp: "2 hours ago" },
        { id: "2", title: "Previous Conversation", timestamp: "Yesterday" },
        { id: "3", title: "Another Chat", timestamp: "2 days ago" },
    ]

    const handleSubmit = (message: PromptInputMessage) => {
        const hasText = Boolean(message.text)
        const hasAttachments = Boolean(message.files?.length)

        if (!(hasText || hasAttachments)) {
            return
        }

        sendMessage(
            {
                text: message.text || "Sent with attachments",
                files: message.files,
            },
            {
                body: {
                    model: model,
                    webSearch: webSearch,
                },
            },
        )
        setInput("")
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="offcanvas">
                <SidebarHeader className="border-b border-sidebar-border">
                    <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                        <PlusIcon className="size-4" />
                        New Chat
                    </Button>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {chatSessions.map((session) => (
                                    <SidebarMenuItem key={session.id}>
                                        <SidebarMenuButton>
                                            <MessageSquareIcon className="size-4" />
                                            <div className="flex flex-col items-start gap-0.5 overflow-hidden">
                                                <span className="truncate font-medium">{session.title}</span>
                                                <span className="text-xs text-sidebar-foreground/60 truncate">{session.timestamp}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <SidebarInset>
                <div className="flex flex-col h-screen">
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-semibold">AI Chatbot</h1>
                        </div>
                    </header>

                    <div className="flex-1 overflow-hidden p-6">
                        <div className="max-w-4xl mx-auto h-full flex flex-col">
                            <Conversation className="h-full">
                                <ConversationContent>
                                    {messages.map((message) => (
                                        <div key={message.id}>
                                            {message.role === "assistant" &&
                                                message.parts.filter((part) => part.type === "source-url").length > 0 && (
                                                    <Sources>
                                                        <SourcesTrigger count={message.parts.filter((part) => part.type === "source-url").length} />
                                                        {message.parts
                                                            .filter((part) => part.type === "source-url")
                                                            .map((part, i) => (
                                                                <SourcesContent key={`${message.id}-${i}`}>
                                                                    <Source key={`${message.id}-${i}`} href={part.url} title={part.url} />
                                                                </SourcesContent>
                                                            ))}
                                                    </Sources>
                                                )}
                                            {message.parts.map((part, i) => {
                                                switch (part.type) {
                                                    case "text":
                                                        return (
                                                            <Message key={`${message.id}-${i}`} from={message.role}>
                                                                <MessageContent>
                                                                    <Response>{part.text}</Response>
                                                                </MessageContent>
                                                            </Message>
                                                        )
                                                    case "reasoning":
                                                        return (
                                                            <Reasoning
                                                                key={`${message.id}-${i}`}
                                                                className="w-full"
                                                                isStreaming={
                                                                    status === "streaming" &&
                                                                    i === message.parts.length - 1 &&
                                                                    message.id === messages.at(-1)?.id
                                                                }
                                                            >
                                                                <ReasoningTrigger />
                                                                <ReasoningContent>{part.text}</ReasoningContent>
                                                            </Reasoning>
                                                        )
                                                    default:
                                                        return null
                                                }
                                            })}
                                            {message.role === "assistant" && (
                                                <Actions className="mt-2">
                                                    <Action
                                                        onClick={() => regenerate({ body: { model, webSearch } })}
                                                        label="Retry"
                                                        tooltip="Retry"
                                                    >
                                                        <RefreshCcwIcon className="size-3" />
                                                    </Action>
                                                    <Action
                                                        onClick={() => {
                                                            const textParts = message.parts
                                                                .filter((part) => part.type === "text")
                                                                .map((part) => part.text)
                                                                .join("\n")
                                                            navigator.clipboard.writeText(textParts)
                                                        }}
                                                        label="Copy"
                                                        tooltip="Copy"
                                                    >
                                                        <CopyIcon className="size-3" />
                                                    </Action>
                                                </Actions>
                                            )}
                                            {message.role === "user" && (
                                                <Actions className="mt-2 justify-end">
                                                    <Action
                                                        onClick={() => {
                                                            const textParts = message.parts
                                                                .filter((part) => part.type === "text")
                                                                .map((part) => part.text)
                                                                .join("\n")
                                                            navigator.clipboard.writeText(textParts)
                                                        }}
                                                        label="Copy"
                                                        tooltip="Copy"
                                                    >
                                                        <CopyIcon className="size-3" />
                                                    </Action>
                                                </Actions>
                                            )}
                                        </div>
                                    ))}
                                    {status === "submitted" && <Loader />}
                                </ConversationContent>
                                <ConversationScrollButton />
                            </Conversation>

                            <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
                                <PromptInputBody>
                                    <PromptInputAttachments>
                                        {(attachment) => <PromptInputAttachment data={attachment} />}
                                    </PromptInputAttachments>
                                    <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} />
                                </PromptInputBody>
                                <PromptInputToolbar>
                                    <PromptInputTools>
                                        <PromptInputActionMenu>
                                            <PromptInputActionMenuTrigger />
                                            <PromptInputActionMenuContent>
                                                <PromptInputActionAddAttachments />
                                            </PromptInputActionMenuContent>
                                        </PromptInputActionMenu>
                                        <PromptInputButton
                                            variant={webSearch ? "default" : "ghost"}
                                            onClick={() => setWebSearch(!webSearch)}
                                        >
                                            <GlobeIcon size={16} />
                                            <span>Search</span>
                                        </PromptInputButton>
                                        <PromptInputModelSelect
                                            onValueChange={(value) => {
                                                setModel(value)
                                            }}
                                            value={model}
                                        >
                                            <PromptInputModelSelectTrigger>
                                                <PromptInputModelSelectValue />
                                            </PromptInputModelSelectTrigger>
                                            <PromptInputModelSelectContent>
                                                {models.map((model) => (
                                                    <PromptInputModelSelectItem key={model.value} value={model.value}>
                                                        {model.name}
                                                    </PromptInputModelSelectItem>
                                                ))}
                                            </PromptInputModelSelectContent>
                                        </PromptInputModelSelect>
                                    </PromptInputTools>
                                    <PromptInputSubmit disabled={!input && !status} status={status} />
                                </PromptInputToolbar>
                            </PromptInput>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ChatBotDemo
