"use client"

import { useState, useRef } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { Avatar } from "../components/Avatar"
import { Badge } from "../components/Badge"
import { Card, CardContent } from "../components/Card"
import { useToast } from "../context/ToastContext"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const TutorScreen = () => {
  const { theme } = useTheme()
  const { showToast } = useToast()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Tutor. How can I help you with your learning today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

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

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
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

      // Scroll to bottom again
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }, 1500)
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
    showToast("Chat cleared", { type: "info" })
  }

  const renderSuggestions = () => {
    const suggestions = [
      "Can you explain arrays and linked lists?",
      "Help me understand neural networks",
      "What's the difference between HTTP and HTTPS?",
      "How do I solve this equation: 2x + 5 = 13",
    ]

    return (
      <View style={styles.suggestionsContainer}>
        <Text style={[styles.suggestionsTitle, { color: theme.mutedForeground }]}>Try asking about:</Text>
        <View style={styles.suggestionChips}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.suggestionChip, { backgroundColor: theme.muted }]}
              onPress={() => setInputValue(suggestion)}
            >
              <Text style={[styles.suggestionText, { color: theme.foreground }]}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.foreground }]}>AI Tutor</Text>
          <Badge
            label="Data Structures"
            variant="outline"
            color={theme.studyPurple}
            icon={<Ionicons name="book-outline" size={12} color={theme.studyPurple} />}
          />
        </View>
        <TouchableOpacity onPress={clearChat}>
          <Ionicons name="refresh-outline" size={24} color={theme.mutedForeground} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[styles.messageRow, message.sender === "user" ? styles.userMessageRow : styles.aiMessageRow]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.sender === "user"
                    ? [styles.userMessageBubble, { backgroundColor: `${theme.studyPurple}20` }]
                    : [styles.aiMessageBubble, { backgroundColor: `${theme.studyBlue}20` }],
                ]}
              >
                <Text style={[styles.messageText, { color: theme.foreground }]}>{message.content}</Text>
              </View>
              <View style={styles.messageAvatarContainer}>
                <Avatar
                  initials={message.sender === "user" ? "U" : "AI"}
                  size={28}
                  backgroundColor={message.sender === "user" ? theme.studyPurple : theme.studyBlue}
                />
              </View>
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageRow, styles.aiMessageRow]}>
              <View style={[styles.messageBubble, styles.aiMessageBubble, { backgroundColor: `${theme.studyBlue}20` }]}>
                <View style={styles.typingIndicator}>
                  <View style={[styles.typingDot, { backgroundColor: theme.studyBlue }]} />
                  <View style={[styles.typingDot, { backgroundColor: theme.studyBlue, animationDelay: "0.2s" }]} />
                  <View style={[styles.typingDot, { backgroundColor: theme.studyBlue, animationDelay: "0.4s" }]} />
                </View>
              </View>
              <View style={styles.messageAvatarContainer}>
                <Avatar initials="AI" size={28} backgroundColor={theme.studyBlue} />
              </View>
            </View>
          )}

          {messages.length < 2 && renderSuggestions()}
        </ScrollView>

        <Card style={styles.inputCard}>
          <CardContent style={styles.inputCardContent}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: theme.foreground, backgroundColor: theme.muted }]}
                placeholder="Ask your AI Tutor anything..."
                placeholderTextColor={theme.mutedForeground}
                value={inputValue}
                onChangeText={setInputValue}
                multiline
                onSubmitEditing={handleSendMessage}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor: inputValue.trim() ? theme.primary : theme.muted,
                  },
                ]}
                onPress={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <Ionicons name="send" size={18} color={inputValue.trim() ? "white" : theme.mutedForeground} />
              </TouchableOpacity>
            </View>
            <View style={styles.attachmentButtons}>
              <TouchableOpacity style={styles.attachmentButton}>
                <Ionicons name="image-outline" size={20} color={theme.mutedForeground} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton}>
                <Ionicons name="document-outline" size={20} color={theme.mutedForeground} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton}>
                <Ionicons name="mic-outline" size={20} color={theme.mutedForeground} />
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  userMessageRow: {
    justifyContent: "flex-end",
  },
  aiMessageRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userMessageBubble: {
    borderBottomRightRadius: 4,
    marginRight: 8,
  },
  aiMessageBubble: {
    borderBottomLeftRadius: 4,
    marginLeft: 8,
  },
  messageText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    lineHeight: 20,
  },
  messageAvatarContainer: {
    width: 28,
    height: 28,
  },
  typingIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    width: 60,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    opacity: 0.6,
  },
  inputCard: {
    margin: 8,
  },
  inputCardContent: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  attachmentButtons: {
    flexDirection: "row",
    marginTop: 8,
  },
  attachmentButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  suggestionsContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  suggestionChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  suggestionText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
})

export default TutorScreen

