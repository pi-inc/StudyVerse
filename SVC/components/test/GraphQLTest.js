"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import { apiService } from "../../services/api"

const GraphQLTest = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const testQuery = async () => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      // Example query - replace with an actual query that works with your API
      const query = `
        query {
          testConnection
        }
      `

      const data = await apiService.query(query)
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error("GraphQL query error:", error)
      setError(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testMutation = async () => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      // Example mutation - replace with an actual mutation that works with your API
      const mutation = `
        mutation {
          testMutation(input: "Hello from StudyVerse")
        }
      `

      const data = await apiService.mutation(mutation)
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error("GraphQL mutation error:", error)
      setError(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GraphQL API Test</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={testQuery} disabled={isLoading}>
          <Text style={styles.buttonText}>Test Query</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testMutation} disabled={isLoading}>
          <Text style={styles.buttonText}>Test Mutation</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#a78bfa" size="small" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Result:</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
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
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 4,
  },
  resultText: {
    color: "#d1d5db",
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

export default GraphQLTest

