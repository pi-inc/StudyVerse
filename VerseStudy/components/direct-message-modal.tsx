"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"

interface DirectMessageModalProps {
  isOpen: boolean
  onClose: () => void
  recipient: {
    name: string
    avatar: string
    initials: string
  }
}

export function DirectMessageModal({ isOpen, onClose, recipient }: DirectMessageModalProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the recipient
      console.log(`Sending message to ${recipient.name}: ${message}`)
      setMessage("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={recipient.avatar} alt={recipient.name} />
              <AvatarFallback>{recipient.initials}</AvatarFallback>
            </Avatar>
            Message {recipient.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="bg-muted/30 rounded-md p-3 h-32 overflow-y-auto">
            <p className="text-sm text-center text-muted-foreground">Start a conversation with {recipient.name}</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-study-purple to-study-blue text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

