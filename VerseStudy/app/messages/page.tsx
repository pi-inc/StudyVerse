"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, X, Send, Plus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")

  // Mock conversations data
  const conversations = [
    {
      id: "1",
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SC",
        status: "online",
      },
      lastMessage: "Do you want to study together for the Data Structures exam?",
      timestamp: "10:30 AM",
      unread: true,
    },
    {
      id: "2",
      user: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MR",
        status: "online",
      },
      lastMessage: "I found a great resource for algorithms, check it out!",
      timestamp: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        status: "away",
      },
      lastMessage: "Thanks for the help with the JavaScript project!",
      timestamp: "Monday",
      unread: false,
    },
  ]

  // Mock messages for the selected conversation
  const messages = {
    "1": [
      { id: "1", text: "Hey, how's your studying going?", sender: "them", timestamp: "10:15 AM" },
      { id: "2", text: "I'm working on the binary tree implementation", sender: "me", timestamp: "10:20 AM" },
      {
        id: "3",
        text: "Do you want to study together for the Data Structures exam?",
        sender: "them",
        timestamp: "10:30 AM",
      },
    ],
    "2": [
      { id: "1", text: "Have you started the algorithms assignment?", sender: "them", timestamp: "Yesterday, 2:15 PM" },
      { id: "2", text: "Yes, I'm about halfway through", sender: "me", timestamp: "Yesterday, 3:20 PM" },
      {
        id: "3",
        text: "I found a great resource for algorithms, check it out!",
        sender: "them",
        timestamp: "Yesterday, 4:30 PM",
      },
    ],
    "3": [
      { id: "1", text: "Can you help me with this JavaScript problem?", sender: "them", timestamp: "Monday, 11:15 AM" },
      { id: "2", text: "Sure, what's the issue?", sender: "me", timestamp: "Monday, 11:20 AM" },
      {
        id: "3",
        text: "Thanks for the help with the JavaScript project!",
        sender: "them",
        timestamp: "Monday, 12:30 PM",
      },
    ],
  }

  const filteredConversations = searchTerm
    ? conversations.filter((conv) => conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : conversations

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // In a real app, this would send the message to the recipient
      console.log(`Sending message to ${selectedChat}: ${newMessage}`)
      setNewMessage("")
    }
  }

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/social">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold gradient-text">Messages</h1>
          </div>
          <Button
            className="h-8 w-8 p-0 bg-gradient-to-r from-study-purple to-study-blue text-white rounded-full shadow-sm"
            asChild
          >
            <Link href="/messages/new">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 h-9 pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {selectedChat ? (
          // Chat view
          <div className="flex flex-col h-[calc(100vh-12rem)]">
            {/* Chat header */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedChat(null)}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={conversations.find((c) => c.id === selectedChat)?.user.avatar}
                            alt={conversations.find((c) => c.id === selectedChat)?.user.name}
                          />
                          <AvatarFallback>
                            {conversations.find((c) => c.id === selectedChat)?.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-background ${
                            conversations.find((c) => c.id === selectedChat)?.user.status === "online"
                              ? "bg-study-green"
                              : "bg-study-orange"
                          }`}
                        ></span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {conversations.find((c) => c.id === selectedChat)?.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversations.find((c) => c.id === selectedChat)?.user.status === "online"
                            ? "Online"
                            : "Away"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedChat as keyof typeof messages].map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.sender === "me" ? "flex-row-reverse" : ""}`}>
                    {message.sender !== "me" && (
                      <Avatar className="h-8 w-8 bg-study-blue">
                        <AvatarImage
                          src={conversations.find((c) => c.id === selectedChat)?.user.avatar}
                          alt={conversations.find((c) => c.id === selectedChat)?.user.name}
                        />
                        <AvatarFallback>
                          {conversations.find((c) => c.id === selectedChat)?.user.initials}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="space-y-1">
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          message.sender === "me"
                            ? "bg-study-purple/20 text-foreground"
                            : "bg-study-blue/20 text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>

                      <div className="text-xs text-muted-foreground">{message.timestamp}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  className="bg-gradient-to-r from-study-purple to-study-blue text-white"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Conversations list
          <div className="space-y-3">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                          <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${
                            conversation.user.status === "online" ? "bg-study-green" : "bg-study-orange"
                          }`}
                        ></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-sm">{conversation.user.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground truncate pr-4">{conversation.lastMessage}</p>
                          {conversation.unread && (
                            <Badge className="bg-study-purple text-white h-5 w-5 rounded-full p-0 flex items-center justify-center">
                              <span className="text-[10px]">1</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  )
}

