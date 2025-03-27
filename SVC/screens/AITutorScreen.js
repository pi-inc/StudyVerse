"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/shared/Header"

const AITutorScreen = ({ route }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI Tutor. How can I help you with your learning today?",
      timestamp: "1:45 PM"
    }
  ])
  const scrollViewRef = useRef(null)
  const navigation = useNavigation()
  const [topic, setTopic] = useState(route?.params?.topic || "Data Structures")
  const initialQuestion = route?.params?.initialQuestion || ""

  useEffect(() => {
    if (initialQuestion) {
      setMessage(initialQuestion)
    }
  }, [initialQuestion])

  const suggestedQuestions = [
    {
      id: 1,
      text: "Explain arrays vs linked lists"
    },
    {
      id: 2,
      text: "How do binary trees work?"
    }
  ]

  const handleSend = () => {
    if (message.trim() === "") return

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newUserMessage])
    setMessage("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        text: `I'll help you understand ${message}. This is a simulated response that would be replaced with actual AI-generated content in a production app.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleSuggestedQuestion = (question) => {
    setMessage(question)
  }

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  return (
    <SafeAreaView style={styles.container}>
      <Header title="AI Tutor" showBack={true} />
      
      <View style={styles.topicBar}>
        <View style={styles.topicContainer}>
          <Text style={styles.topicText}>{topic}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#a78bfa" />
        </TouchableOpacity>
      </View>

      <View style={styles.suggestedQuestionsContainer}>
        {suggestedQuestions.map(question => (
          <TouchableOpacity 
            key={question.id} 
            style={styles.suggestedQuestion}
            onPress={() => handleSuggestedQuestion(question.text)}
          >
            <Ionicons name="bulb-outline" size={18} color="#a78bfa" />
            <Text style={styles.suggestedQuestionText} numberOfLines={1}>
              {question.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(msg => (
          <View 
            key={msg.id} 
            style={[
              styles.messageWrapper,
              msg.sender === "user" ? styles.userMessageWrapper : styles.aiMessageWrapper
            ]}
          >
            {msg.sender === "ai" && (
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>AI</Text>
              </View>
            )}
            <View style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userMessageBubble : styles.aiMessageBubble
            ]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>{messages[messages.length - 1].timestamp}</Text>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton}>
          <Feather name="paperclip" size={22} color="#6b7280" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Ask your AI Tutor anything..."
          placeholderTextColor="#6b7280"
          value={message}
          onChangeText={setMessage}
          multiline
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity 
          style={[styles.sendButton, message.trim() === "" && styles.sendButtonDisabled]} 
          onPress={handleSend}
          disabled={message.trim() === ""}
        >
          <Feather name="send" size={22} color={message.trim() === "" ? "#6b7280" : "#a78bfa"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  topicBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  topicContainer: {
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  topicText: {
    color: "#a78bfa",
    fontWeight: "bold",
    fontSize: 14,
  },
  closeButton: {
    padding: 4,
  },
  suggestedQuestionsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexWrap: "wrap",
  },
  suggestedQuestion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    maxWidth: "48%",
  },
  suggestedQuestionText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  messageWrapper: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "80%",
  },
  userMessageWrapper: {
    alignSelf: "flex-end",
  },
  aiMessageWrapper: {
    alignSelf: "flex-start",
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarText: {
    color: "#a78bfa",
    fontWeight: "bold",
    fontSize: 14,
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userMessageBubble: {
    backgroundColor: "#7c3aed",
  },
  aiMessageBubble: {
    backgroundColor: "#1e3a8a",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },
  timestampContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  timestampText: {
    color: "#6b7280",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
    backgroundColor: "#0a0a1a",
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 16,
    maxHeight: 100,
    marginHorizontal: 8,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
})

export default AITutorScreen
