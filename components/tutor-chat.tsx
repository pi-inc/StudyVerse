"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Paperclip, Mic, Image, ThumbsUp, ThumbsDown, Bookmark, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  attachments?: string[]
  isCode?: boolean
}

export function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Tutor. How can I help you with your learning today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      content: "I'm having trouble understanding the difference between arrays and linked lists. Can you explain?",
      sender: "user",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "3",
      content:
        "Great question! Arrays and linked lists are both linear data structures, but they differ in how they store and access elements.\n\nArrays store elements in contiguous memory locations, which allows for constant-time access to any element using an index. However, insertion and deletion operations can be costly as they may require shifting elements.\n\nLinked lists, on the other hand, store elements at scattered memory locations, with each element pointing to the next one. This makes insertion and deletion efficient, but accessing elements requires traversing the list from the beginning.",
      sender: "ai",
      timestamp: new Date(Date.now() - 15000),
    },
    {
      id: "4",
      content: "Can you show me an example of how to implement a linked list in JavaScript?",
      sender: "user",
      timestamp: new Date(Date.now() - 10000),
    },
    {
      id: "5",
      content: "Here's a simple implementation of a singly linked list in JavaScript:",
      sender: "ai",
      timestamp: new Date(Date.now() - 5000),
      isCode: true,
      content: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add a node to the end of the list
  append(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.size++;
  }
  
  // Get element at specific index
  getAt(index) {
    if (index < 0 || index >= this.size) return null;
    
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    
    return current.value;
  }
}

// Usage example
const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
console.log(list.getAt(1)); // Output: 20`,
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
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
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing your question and preparing a response...",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste the code in your editor.",
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  const handleFeedback = (type: "positive" | "negative", messageId: string) => {
    toast({
      title: type === "positive" ? "Thank you for your feedback!" : "We'll improve based on your feedback",
      description:
        type === "positive"
          ? "We're glad you found this response helpful."
          : "Please let us know how we can improve this response.",
      className:
        type === "positive"
          ? "bg-gradient-to-r from-study-green/20 to-study-teal/20 border-study-green"
          : "bg-gradient-to-r from-study-orange/20 to-study-red/20 border-study-orange",
    })
  }

  const handleSaveResponse = (messageId: string) => {
    toast({
      title: "Response saved",
      description: "This response has been added to your saved items.",
      className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
    })
  }

  return (
    <Card className="border-none shadow-md overflow-hidden h-[calc(100vh-16rem)]">
      <div className="h-1 bg-gradient-to-r from-study-blue to-study-teal" />
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={message.sender === "user" ? "bg-study-purple" : "bg-study-blue"}>
                  <AvatarFallback>{message.sender === "user" ? "U" : "AI"}</AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-study-purple/20 text-foreground"
                        : "bg-study-blue/20 text-foreground"
                    }`}
                  >
                    {message.isCode ? (
                      <div className="space-y-2">
                        <div className="font-medium">{message.content.split("\n")[0]}</div>
                        <div className="relative">
                          <pre className="bg-background/80 p-3 rounded-md overflow-x-auto text-sm font-mono">
                            {message.content}
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 bg-background/80"
                            onClick={() => handleCopyCode(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-line">{message.content}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(message.timestamp)}
                    </span>

                    {message.sender === "ai" && (
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-muted"
                          onClick={() => handleFeedback("negative", message.id)}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-muted"
                          onClick={() => handleFeedback("positive", message.id)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-muted"
                          onClick={() => handleSaveResponse(message.id)}
                        >
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="bg-study-blue">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>

                <div className="px-4 py-3 rounded-lg bg-study-blue/20 text-foreground">
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

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Mic className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Ask your AI Tutor anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="pr-10"
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
          <div className="flex justify-center mt-2">
            <Badge variant="outline" className="text-xs text-muted-foreground">
              AI Tutor is focused on Data Structures
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

