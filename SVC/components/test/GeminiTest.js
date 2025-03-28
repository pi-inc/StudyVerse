"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native"
import { geminiAI } from "../../services/ai"

const GeminiTest = () => {
  const [prompt, setPrompt] = useState("Explain what a binary search tree is in simple terms.")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const testGenerateContent = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      // Use the updated model name
      const response = await geminiAI.generateContent(prompt, { model: "gemini-1.5-pro" })
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated"
      setResult(text)
    } catch (error) {
      console.error("Gemini API error:", error)
      setError(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gemini AI Test</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your prompt here..."
        placeholderTextColor="#6b7280"
        value={prompt}
        onChangeText={setPrompt}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity style={styles.button} onPress={testGenerateContent} disabled={isLoading || !prompt.trim()}>
        <Text style={styles.buttonText}>Generate Content</Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#a78bfa" size="small" />
          <Text style={styles.loadingText}>Generating content...</Text>
        </View>
      )}

      {result && (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Result:</Text>
          <Text style={styles.resultText}>{result}</Text>
        </ScrollView>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error:</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    height: 400, // Fixed height to allow scrolling of result
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    marginBottom: 16,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  loadingText: {
    color: "#a78bfa",
    marginLeft: 8,
  },
  resultContainer: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 4,
  },
  resultText: {
    color: "#d1d5db",
    lineHeight: 20,
  },
  errorContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 8,
    padding: 12,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 4,
  },
  errorText: {
    color: "#d1d5db",
  },
})

export default GeminiTest

