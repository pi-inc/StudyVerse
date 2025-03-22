"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Mic, Image, Paperclip, ArrowLeft, X } from "lucide-react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { TutorSuggestions } from "@/components/tutor-suggestions"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function TutorPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm your AI Tutor. How can I help you with your learning today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm analyzing your question about " +
          inputValue.substring(0, 20) +
          "... Let me provide a helpful explanation.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleAttachment = (type: string) => {
    setIsAttachmentOpen(false)
    // In a real app, this would handle different attachment types
    const message = `[Attached a ${type}]`
    setInputValue(message)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "new",
        content: "Hello! I'm your AI Tutor. How can I help you with your learning today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold gradient-text">AI Tutor</h1>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Badge className="bg-study-purple/20 text-study-purple">Data Structures</Badge>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[40vh]">
                <div className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Select Topic</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Data Structures",
                      "Algorithms",
                      "Web Development",
                      "Machine Learning",
                      "Mathematics",
                      "Physics",
                    ].map((topic) => (
                      <Button
                        key={topic}
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => {
                          clearChat()
                        }}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-12rem)]">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-1">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-study-purple" : "bg-study-blue"}`}>
                    <AvatarFallback>{message.sender === "user" ? "U" : "AI"}</AvatarFallback>
                  </Avatar>

                  <motion.div className="space-y-1" whileTap={{ scale: 0.98 }}>
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-study-purple/20 text-foreground"
                          : "bg-study-blue/20 text-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-line text-sm">{message.content}</div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(message.timestamp)}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8 bg-study-blue">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>

                  <div className="px-3 py-2 rounded-lg bg-study-blue/20 text-foreground">
                    <div className="flex space-x-2">
                      <div
                        className="h-2 w-2 rounded-full bg-study-blue animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-study-blue animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-study-blue animate-bounce"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length < 2 && <TutorSuggestions setInputValue={setInputValue} />}

          {/* Input area */}
          <div className="sticky bottom-0 bg-background pt-2">
            <Card className="border-none shadow-md">
              <CardContent className="p-2">
                <div className="flex gap-2">
                  <Sheet open={isAttachmentOpen} onOpenChange={setIsAttachmentOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[30vh]">
                      <div className="pt-6">
                        <h3 className="text-lg font-medium mb-4">Add Attachment</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            variant="outline"
                            className="flex flex-col h-auto py-4 gap-2"
                            onClick={() => handleAttachment("image")}
                          >
                            <Image className="h-6 w-6 text-study-blue" />
                            <span className="text-xs">Image</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col h-auto py-4 gap-2"
                            onClick={() => handleAttachment("document")}
                          >
                            <Paperclip className="h-6 w-6 text-study-purple" />
                            <span className="text-xs">Document</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col h-auto py-4 gap-2"
                            onClick={() => handleAttachment("voice")}
                          >
                            <Mic className="h-6 w-6 text-study-green" />
                            <span className="text-xs">Voice</span>
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      placeholder="Ask your AI Tutor anything..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="pr-10 h-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    >
                      <Send className={`h-4 w-4 ${inputValue.trim() ? "text-primary" : "text-muted-foreground"}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

