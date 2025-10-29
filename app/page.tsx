"use client"

import type React from "react"

import {Conversation, ConversationContent, ConversationScrollButton} from "@/components/ai-elements/conversation"
import {Message, MessageContent} from "@/components/ai-elements/message"
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
import {Action, Actions} from "@/components/ai-elements/actions"
import {useState, useEffect} from "react"
import {Response} from "@/components/ai-elements/response"
import {CopyIcon, GlobeIcon, RefreshCcwIcon, MessageSquareIcon, PlusIcon, Trash2Icon} from "lucide-react"
import {Source, Sources, SourcesContent, SourcesTrigger} from "@/components/ai-elements/sources"
import {Reasoning, ReasoningContent, ReasoningTrigger} from "@/components/ai-elements/reasoning"
import {Loader} from "@/components/ai-elements/loader"
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
import {Button} from "@/components/ui/button"
import {getUserId} from "@/lib/utils/user"
import {getUserChats, createChat, deleteChat, loadChatMessages} from "@/db/actions"
import type {Chat} from "@/db/schema"
import {useChat} from "@/hooks/use-chat-stream"
import {DisplayBox} from "@/components/display-box"

const models = [
    {
        name: "K1",
        value: "claude-3-haiku-20240307",
    },
]

const ChatBotDemo = () => {
    const [input, setInput] = useState("")
    const [model, setModel] = useState<string>(models[0].value)
    const [webSearch, setWebSearch] = useState(false)

    const [userId, setUserId] = useState<string>("")
    const [chats, setChats] = useState<Chat[]>([])
    const [currentChatId, setCurrentChatId] = useState<number | null>(null)
    const [isLoadingChats, setIsLoadingChats] = useState(true)

    const {messages, sendMessage, status, regenerate, setMessages, boxState} = useChat()
    useEffect(() => {
        const initializeUser = async () => {
            const id = getUserId()
            setUserId(id)
            console.log("[v0] User ID:", id)

            if (id) {
                console.log(2)
                await loadUserChats(id)
            }
        }

        initializeUser()
    }, [])

    const loadUserChats = async (uid: string) => {
        setIsLoadingChats(true)
        try {
            const userChats = await getUserChats(uid)
            setChats(userChats)
            console.log("[v0] Loaded chats:", userChats.length)

            // If there are chats, load the most recent one
            if (userChats.length > 0 && !currentChatId) {
                await switchToChat(userChats[0].id)
            }
        } catch (error) {
            console.error("[v0] Error loading chats:", error)
        } finally {
            setIsLoadingChats(false)
        }
    }

    const handleNewChat = async () => {
        if (!userId) return

        try {
            const newChat = await createChat(userId, "New Chat")
            setChats([newChat, ...chats])
            setCurrentChatId(newChat.id)
            setMessages([])
            console.log("[v0] Created new chat:", newChat.id)
        } catch (error) {
            console.error("[v0] Error creating chat:", error)
        }
    }

    const switchToChat = async (chatId: number) => {
        setCurrentChatId(chatId)

        try {
            const chatMessages = await loadChatMessages(chatId)
            setMessages(chatMessages)
            console.log("[v0] Loaded messages for chat:", chatId, chatMessages.length)
        } catch (error) {
            console.error("[v0] Error loading chat messages:", error)
            setMessages([])
        }
    }

    const handleDeleteChat = async (chatId: number, e: React.MouseEvent) => {
        e.stopPropagation()

        try {
            await deleteChat(chatId)
            const updatedChats = chats.filter((c) => c.id !== chatId)
            setChats(updatedChats)

            // If deleted current chat, switch to another or create new
            if (currentChatId === chatId) {
                if (updatedChats.length > 0) {
                    await switchToChat(updatedChats[0].id)
                } else {
                    setCurrentChatId(null)
                    setMessages([])
                }
            }

            console.log("[v0] Deleted chat:", chatId)
        } catch (error) {
            console.error("[v0] Error deleting chat:", error)
        }
    }

    const handleSubmit = async (message: PromptInputMessage) => {
        if (!userId) {
            console.error("[v0] No user ID available")
            return
        }

        // If no current chat, create one
        if (!currentChatId) {
            const newChat = await createChat(userId, "New Chat")
            setChats([newChat, ...chats])
            setCurrentChatId(newChat.id)
            console.log("[v0] Created new chat for message:", newChat.id)
        }

        console.log("[v0] Sending message:", message)

        await sendMessage(
            {text: message.text ?? ""}, // Provides empty string if undefined
            {
                sessionId: currentChatId?.toString() || "0",
                userId: userId,
                model: model,
                webSearch: webSearch,
            }
        )

        setInput("")
    }

    const handleRegenerate = async () => {
        if (!currentChatId || !userId) return

        console.log("[v0] Regenerating last response")

        await regenerate({
            sessionId: currentChatId.toString(),
            userId: userId,
            model: model,
            webSearch: webSearch,
        })
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center justify-between p-2">
                        <h2 className="text-lg font-semibold">KAIROS</h2>
                        <Button size="sm" variant="ghost" onClick={handleNewChat}>
                            <PlusIcon className="size-4"/>
                        </Button>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Chats</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {isLoadingChats ? (
                                    <div className="p-4 text-center text-sm text-muted-foreground">Loading
                                        chats...</div>
                                ) : chats.length === 0 ? (
                                    <div className="p-4 text-center text-sm text-muted-foreground">No chats yet</div>
                                ) : (
                                    chats.map((chat) => (
                                        <SidebarMenuItem key={chat.id}>
                                            <SidebarMenuButton
                                                onClick={() => switchToChat(chat.id)}
                                                isActive={currentChatId === chat.id}
                                                className="w-full justify-between group"
                                            >
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <MessageSquareIcon className="size-4 shrink-0"/>
                                                    <span className="truncate">{chat.title}</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="opacity-0 group-hover:opacity-100 shrink-0"
                                                    onClick={(e) => handleDeleteChat(chat.id, e)}
                                                >
                                                    <Trash2Icon className="size-3"/>
                                                </Button>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <SidebarInset className="flex flex-col h-screen">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-6">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger/>
                            <h1 className="text-lg font-semibold">Chat</h1>
                            {currentChatId && (
                                <span className="text-sm text-muted-foreground">
                  - {chats.find((c) => c.id === currentChatId)?.title}
                </span>
                            )}
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
                                                        <SourcesTrigger
                                                            count={message.parts.filter((part) => part.type === "source-url").length}/>
                                                        {message.parts
                                                            .filter((part) => part.type === "source-url")
                                                            .map((part, i) => (
                                                                <SourcesContent key={`${message.id}-${i}`}>
                                                                    <Source
                                                                        key={`${message.id}-${i}`}
                                                                        href={(part as any).url}
                                                                        title={(part as any).url}
                                                                    />
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
                                                                    <Response>{(part as any).text}</Response>
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
                                                                <ReasoningTrigger/>
                                                                <ReasoningContent>{(part as any).text}</ReasoningContent>
                                                            </Reasoning>
                                                        )

                                                    // case "data-toolCall":
                                                    //     return (
                                                    //         <div key={`${message.id}-${i}`} className="my-2">
                                                    //             <div
                                                    //                 className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                                                    //                 <div className="flex items-center gap-2">
                                                    //                     {((part as any).data.state === 'calling' || (part as any).data.state === 'executing') && (
                                                    //                         <Loader className="size-4"/>
                                                    //                     )}
                                                    //                     <span className="font-medium">
                                                    //                         🔧 Tool: {(part as any).data.toolName}
                                                    //                     </span>
                                                    //                 </div>
                                                    //                 {(part as any).data.state === 'calling' && (
                                                    //                     <span className="text-xs">Preparing...</span>
                                                    //                 )}
                                                    //                 {(part as any).data.state === 'executing' && (
                                                    //                     <span className="text-xs">Executing...</span>
                                                    //                 )}
                                                    //             </div>
                                                    //         </div>
                                                    //     )

                                                    case "data-toolResult":
                                                        return (
                                                            <div key={`${message.id}-${i}`} className="my-2">
                                                                <div className="rounded-lg border bg-muted/50 p-4">
                                                                    <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">
                        ✅ {(part as any).data.toolName}
                    </span>
                                                                    </div>

                                                                    {/* Input */}
                                                                    <div className="mb-2">
                                                                        <p className="text-xs text-muted-foreground mb-1">Input:</p>
                                                                        <pre
                                                                            className="text-xs bg-background p-2 rounded overflow-auto">
                        {JSON.stringify((part as any).data.toolInput, null, 2)}
                    </pre>
                                                                    </div>

                                                                    {/* Output - PROPERLY STRINGIFIED */}
                                                                    <div>
                                                                        <p className="text-xs text-muted-foreground mb-1">Result:</p>
                                                                        <pre
                                                                            className="text-xs bg-background p-2 rounded overflow-auto max-h-64">
                        {JSON.stringify((part as any).data.toolResult, null, 2)}
                    </pre>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )

                                                    default:
                                                        return null
                                                }
                                            })}
                                            {message.role === "assistant" && (
                                                <Actions className="mt-2">
                                                    <Action onClick={handleRegenerate} label="Retry" tooltip="Retry">
                                                        <RefreshCcwIcon className="size-3"/>
                                                    </Action>
                                                    <Action
                                                        onClick={() => {
                                                            const textParts = message.parts
                                                                .filter((part) => part.type === "text")
                                                                .map((part) => (part as any).text)
                                                                .join("\n")
                                                            navigator.clipboard.writeText(textParts)
                                                        }}
                                                        label="Copy"
                                                        tooltip="Copy"
                                                    >
                                                        <CopyIcon className="size-3"/>
                                                    </Action>
                                                </Actions>
                                            )}
                                            {message.role === "user" && (
                                                <Actions className="mt-2 justify-end">
                                                    <Action
                                                        onClick={() => {
                                                            const textParts = message.parts
                                                                .filter((part) => part.type === "text")
                                                                .map((part) => (part as any).text)
                                                                .join("\n")
                                                            navigator.clipboard.writeText(textParts)
                                                        }}
                                                        label="Copy"
                                                        tooltip="Copy"
                                                    >
                                                        <CopyIcon className="size-3"/>
                                                    </Action>
                                                </Actions>
                                            )}
                                        </div>
                                    ))}
                                    {status === "submitted" && (
                                        <Message from="assistant">
                                            <MessageContent>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <Loader size={20}/>
                                                    <span className="text-sm">Kairos is thinking...</span>
                                                </div>
                                            </MessageContent>
                                        </Message>
                                    )}

                                    {status === "streaming" && messages.length > 0 && messages[messages.length - 1].role === "assistant" && messages[messages.length - 1].parts.length === 0 && (
                                        <Message from="assistant">
                                            <MessageContent>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <Loader size={20}/>
                                                    <span className="text-sm">Processing...</span>
                                                </div>
                                            </MessageContent>
                                        </Message>
                                    )}                                </ConversationContent>
                                <ConversationScrollButton/>
                            </Conversation>

                            <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
                                <PromptInputBody>
                                    <PromptInputAttachments>
                                        {(attachment) => <PromptInputAttachment data={attachment}/>}
                                    </PromptInputAttachments>
                                    <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input}/>
                                </PromptInputBody>
                                <PromptInputToolbar>
                                    <PromptInputTools>
                                        <PromptInputActionMenu>
                                            <PromptInputActionMenuTrigger/>
                                            <PromptInputActionMenuContent>
                                                <PromptInputActionAddAttachments/>
                                            </PromptInputActionMenuContent>
                                        </PromptInputActionMenu>
                                        {/*<PromptInputButton*/}
                                        {/*    variant={webSearch ? "default" : "ghost"}*/}
                                        {/*    onClick={() => setWebSearch(!webSearch)}*/}
                                        {/*>*/}
                                        {/*    <GlobeIcon size={16} />*/}
                                        {/*    <span>Search</span>*/}
                                        {/*</PromptInputButton>*/}
                                        <PromptInputModelSelect
                                            onValueChange={(value) => {
                                                setModel(value)
                                            }}
                                            value={model}
                                        >
                                            <PromptInputModelSelectTrigger>
                                                <PromptInputModelSelectValue/>
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
                                    <PromptInputSubmit disabled={!input && !status} status={status}/>
                                </PromptInputToolbar>
                            </PromptInput>
                        </div>
                    </div>
                </div>
            </SidebarInset>

            {boxState && (
                <DisplayBox
                    backgroundColor={boxState.backgroundColor}
                    text={boxState.text}
                />
            )}
        </SidebarProvider>
    )
}

export default ChatBotDemo