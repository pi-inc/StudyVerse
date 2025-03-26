"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import * as Haptics from "expo-haptics"

// Mock data
const initialMessages = [
  {
    id: "1",
    text: "Hello! I'm your AI study tutor. How can I help you today?",
    sender: "tutor",
    timestamp: new Date(Date.now() - 3600000),
  },
]

const TutorChat = () => {
  const { theme } = useTheme()
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const flatListRef = useRef(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  const handleSend = () => {
    if (inputText.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputText("")
      setIsTyping(true)

      // Provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      // Simulate AI response after a delay
      setTimeout(() => {
        const tutorMessage = {
          id: (Date.now() + 1).toString(),
          text: generateTutorResponse(inputText.trim()),
          sender: "tutor",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, tutorMessage])
        setIsTyping(false)

        // Provide haptic feedback for received message
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }, 1500)
    }
  }

  const generateTutorResponse = (userInput) => {
    // In a real app, this would be connected to an AI service
    const responses = [
      "That's a great question! Let me explain...",
      "I understand what you're asking. Here's what you need to know...",
      "Let me help you with that. The key concept here is...",
      "I'd be happy to assist with that. Let's break it down...",
      "That's an interesting topic. Here's my explanation...",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessage = ({ item }) => {
    const isTutor = item.sender === "tutor"

    return (
      <View style={[styles.messageContainer, isTutor ? styles.tutorMessageContainer : styles.userMessageContainer]}>
        {isTutor ? (
          <LinearGradient
            colors={[theme.study.purple, theme.study.blue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.message, styles.tutorMessage]}
          >
            <Text style={styles.tutorMessageText}>{item.text}</Text>
          </LinearGradient>
        ) : (
          <View style={[styles.message, styles.userMessage, { backgroundColor: theme.muted }]}>
            <Text style={[styles.userMessageText, { color: theme.foreground }]}>{item.text}</Text>
          </View>
        )}
        <Text
          style={[
            styles.timestamp,
            isTutor ? styles.tutorTimestamp : styles.userTimestamp,
            { color: theme.mutedForeground },
          ]}
        >
          {formatTime(item.timestamp)}
        </Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {isTyping && (
        <View style={[styles.typingIndicator, { backgroundColor: theme.background }]}>
          <Text style={[styles.typingText, { color: theme.mutedForeground }]}>Tutor is typing...</Text>
        </View>
      )}

      <View style={[styles.inputContainer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask your tutor anything..."
          placeholderTextColor={theme.mutedForeground}
          style={[
            styles.input,
            {
              backgroundColor: theme.muted,
              color: theme.foreground,
              borderColor: theme.border,
            },
          ]}
          multiline
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!inputText.trim()}
          style={[
            styles.sendButton,
            {
              opacity: !inputText.trim() ? 0.5 : 1,
            },
          ]}
        >
          <LinearGradient
            colors={[theme.study.purple, theme.study.blue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButtonGradient}
          >
            <Feather name="send" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: "80%",
  },
  tutorMessageContainer: {
    alignSelf: "flex-start",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  message: {
    borderRadius: 16,
    padding: 12,
  },
  tutorMessage: {
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    borderBottomRightRadius: 4,
  },
  tutorMessageText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  userMessageText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 4,
  },
  tutorTimestamp: {
    alignSelf: "flex-start",
  },
  userTimestamp: {
    alignSelf: "flex-end",
  },
  typingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default TutorChat

