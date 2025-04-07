"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/shared/Header"
import { geminiAI } from "../services/ai"
import { useTheme } from "../context/ThemeContext"

// Text formatting function for AI Tutor messages
const formatAITutorText = (text) => {
  if (!text) return [{ text: "", style: "normal" }]

  // Initialize result array
  const segments = []

  // Find all potential formatting markers
  const markers = []

  // Bold patterns (highest priority)
  const boldPatterns = [
    { regex: /\*([^*]+)\*/g, markerLength: 1 }, // *bold*
    { regex: /_([^_]+)_/g, markerLength: 1 }, // _bold_
    { regex: /\*\*([^*]+)\*\*/g, markerLength: 2 }, // **bold**
    { regex: /__([^_]+)__/g, markerLength: 2 }, // __bold__
  ]

  // Process bold patterns
  boldPatterns.forEach((pattern) => {
    let match
    while ((match = pattern.regex.exec(text)) !== null) {
      markers.push({
        type: "bold",
        start: match.index,
        end: match.index + match[0].length - pattern.markerLength,
        innerStart: match.index + pattern.markerLength,
        innerEnd: match.index + match[0].length - pattern.markerLength,
        markerLength: pattern.markerLength,
        text: match[1],
      })
    }
  })

  // Italic patterns (medium priority)
  const italicPatterns = [
    { regex: /\*([^*]+)\*/g, markerLength: 1 }, // *italic*
    { regex: /_([^_]+)_/g, markerLength: 1 }, // _italic_
  ]

  // Process italic patterns
  italicPatterns.forEach((pattern) => {
    let match
    while ((match = pattern.regex.exec(text)) !== null) {
      // Check if this segment is already marked as bold
      const alreadyBold = markers.some(
        (m) =>
          m.type === "bold" &&
          m.innerStart <= match.index &&
          m.innerEnd >= match.index + match[0].length - pattern.markerLength,
      )

      if (!alreadyBold) {
        markers.push({
          type: "italic",
          start: match.index,
          end: match.index + match[0].length - pattern.markerLength,
          innerStart: match.index + pattern.markerLength,
          innerEnd: match.index + match[0].length - pattern.markerLength,
          markerLength: pattern.markerLength,
          text: match[1],
        })
      }
    }
  })

  // Underline patterns (lowest priority)
  const underlinePatterns = [
    { regex: /^_([^:]+):/g, markerLength: 1 }, // _Underline:
    { regex: /^_([^_]+)\s/g, markerLength: 1 }, // _Underline followed by space
  ]

  // Process underline patterns
  underlinePatterns.forEach((pattern) => {
    let match
    while ((match = pattern.regex.exec(text)) !== null) {
      // Check if this segment is already marked as bold or italic
      const alreadyFormatted = markers.some(
        (m) =>
          (m.type === "bold" || m.type === "italic") &&
          m.innerStart <= match.index &&
          m.innerEnd >= match.index + match[0].length - pattern.markerLength,
      )

      if (!alreadyFormatted) {
        markers.push({
          type: "underline",
          start: match.index,
          end: match.index + match[0].length - pattern.markerLength,
          innerStart: match.index + pattern.markerLength,
          innerEnd: match.index + match[0].length - pattern.markerLength,
          markerLength: pattern.markerLength,
          text: match[1],
        })
      }
    }
  })

  // Sort markers by position
  markers.sort((a, b) => a.start - b.start)

  // Resolve overlapping markers
  const resolvedMarkers = []
  for (let i = 0; i < markers.length; i++) {
    let overlapping = false
    for (let j = 0; j < resolvedMarkers.length; j++) {
      // Check if current marker overlaps with any resolved marker
      if (
        (markers[i].start >= resolvedMarkers[j].start && markers[i].start <= resolvedMarkers[j].end) ||
        (markers[i].end >= resolvedMarkers[j].start && markers[i].end <= resolvedMarkers[j].end)
      ) {
        overlapping = true
        // If current marker is bold and overlapping marker is not, replace it
        if (markers[i].type === "bold" && resolvedMarkers[j].type !== "bold") {
          resolvedMarkers[j] = markers[i]
        }
        break
      }
    }

    if (!overlapping) {
      resolvedMarkers.push(markers[i])
    }
  }

  // Generate segments
  let currentPosition = 0

  // Sort resolved markers by position again to ensure correct order
  resolvedMarkers.sort((a, b) => a.start - b.start)

  for (const marker of resolvedMarkers) {
    // Add normal text before marker
    if (marker.start > currentPosition) {
      segments.push({
        text: text.substring(currentPosition, marker.start),
        style: "normal",
      })
    }

    // Add formatted text
    segments.push({
      text: marker.text,
      style: marker.type,
    })

    currentPosition = marker.end + marker.markerLength
  }

  // Add any remaining normal text
  if (currentPosition < text.length) {
    segments.push({
      text: text.substring(currentPosition),
      style: "normal",
    })
  }

  // If no segments were created (no formatting found), return the whole text as normal
  if (segments.length === 0) {
    segments.push({ text, style: "normal" })
  }

  return segments
}

const AITutorScreen = ({ route }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI Tutor. How can I help you with your learning today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const scrollViewRef = useRef(null)
  const navigation = useNavigation()
  const [topic, setTopic] = useState(route?.params?.topic || "Data Structures")
  const initialQuestion = route?.params?.initialQuestion || ""
  const { theme } = useTheme()

  useEffect(() => {
    if (initialQuestion) {
      setMessage(initialQuestion)
    }
  }, [initialQuestion])

  const suggestedQuestions = [
    {
      id: 1,
      text: "Explain arrays vs linked lists",
    },
    {
      id: 2,
      text: "How do binary trees work?",
    },
  ]

  const handleSend = async () => {
    if (message.trim() === "" || isLoading) return

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newUserMessage])
    const userQuestion = message
    setMessage("")
    setIsLoading(true)
    setError(null)

    try {
      // Format previous messages for context (limit to last 5 for simplicity)
      const recentMessages = messages.slice(-5).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        content: msg.text,
      }))

      // Add the new user message
      recentMessages.push({
        role: "user",
        content: userQuestion,
      })

      // Call Gemini API with updated model name
      const response = await geminiAI.chat(recentMessages, {
        model: "gemini-1.5-pro", // Updated model name
        temperature: 0.7,
      })

      // Extract the response text
      const aiResponseText =
        response.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response at this time."

      // Add AI response
      const aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (err) {
      console.error("Error calling Gemini API:", err)
      setError(err.message)

      // Add error message as AI response
      const errorResponse = {
        id: messages.length + 2,
        sender: "ai",
        text: `I'm sorry, I encountered an error: ${err.message}. Please try again later.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title="AI Tutor" showBack={true} />

      <View style={[styles.topicBar, { borderBottomColor: theme.colors.border.dark }]}>
        <View style={[styles.topicContainer, { backgroundColor: `${theme.colors.primary}20` }]}>
          <Text style={[styles.topicText, { color: theme.colors.primary }]}>{topic}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.suggestedQuestionsContainer}>
        {suggestedQuestions.map((question) => (
          <TouchableOpacity
            key={question.id}
            style={[styles.suggestedQuestion, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleSuggestedQuestion(question.text)}
          >
            <Ionicons name="bulb-outline" size={18} color={theme.colors.primary} />
            <Text style={[styles.suggestedQuestionText, { color: theme.colors.text.primary }]} numberOfLines={1}>
              {question.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.messageWrapper, msg.sender === "user" ? styles.userMessageWrapper : styles.aiMessageWrapper]}
          >
            {msg.sender === "ai" && (
              <View style={[styles.avatarContainer, { backgroundColor: theme.colors.background.accent }]}>
                <Text style={[styles.avatarText, { color: theme.colors.primary }]}>AI</Text>
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                msg.sender === "user"
                  ? [styles.userMessageBubble, { backgroundColor: theme.colors.primary }]
                  : [styles.aiMessageBubble, { backgroundColor: theme.colors.background.secondary }],
              ]}
            >
              {msg.sender === "ai" ? (
                <View>
                  {formatAITutorText(msg.text).map((segment, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.messageText,
                        segment.style === "bold" && styles.boldText,
                        segment.style === "italic" && styles.italicText,
                        segment.style === "underline" && styles.underlineText,
                        { color: theme.colors.text.primary },
                      ]}
                    >
                      {segment.text}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text style={[styles.messageText, { color: theme.colors.text.primary }]}>{msg.text}</Text>
              )}
            </View>
          </View>
        ))}

        {isLoading && (
          <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background.secondary }]}>
            <ActivityIndicator color={theme.colors.primary} size="small" />
            <Text style={[styles.loadingText, { color: theme.colors.primary }]}>AI is thinking...</Text>
          </View>
        )}

        {error && (
          <View style={[styles.errorContainer, { backgroundColor: `${theme.colors.error}20` }]}>
            <Ionicons name="alert-circle" size={20} color={theme.colors.error} />
            <Text style={[styles.errorText, { color: theme.colors.error }]}>Error: {error}</Text>
          </View>
        )}

        <View style={styles.timestampContainer}>
          <Text style={[styles.timestampText, { color: theme.colors.text.tertiary }]}>
            {messages[messages.length - 1].timestamp}
          </Text>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.background.primary,
            borderTopColor: theme.colors.border.dark,
          },
        ]}
      >
        <TouchableOpacity style={styles.attachButton}>
          <Feather name="paperclip" size={22} color={theme.colors.text.tertiary} />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.background.secondary,
              color: theme.colors.text.primary,
            },
          ]}
          placeholder="Ask your AI Tutor anything..."
          placeholderTextColor={theme.colors.text.tertiary}
          value={message}
          onChangeText={setMessage}
          multiline
          returnKeyType="send"
          onSubmitEditing={handleSend}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, (message.trim() === "" || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={message.trim() === "" || isLoading}
        >
          <Feather
            name="send"
            size={22}
            color={message.trim() === "" || isLoading ? theme.colors.text.tertiary : theme.colors.primary}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topicBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  topicContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  topicText: {
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
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    maxWidth: "48%",
  },
  suggestedQuestionText: {
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userMessageBubble: {
    // backgroundColor set dynamically
  },
  aiMessageBubble: {
    // backgroundColor set dynamically
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
  },
  underlineText: {
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    maxWidth: "90%",
  },
  errorText: {
    marginLeft: 8,
    fontSize: 14,
  },
  timestampContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  timestampText: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
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

