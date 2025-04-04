"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import { firestore } from "../../services/firebase"
import { collection, addDoc, getDocs, query, limit } from "firebase/firestore"

const FirestoreTest = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const testAddDocument = async () => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const docRef = await addDoc(collection(firestore, "test"), {
        message: "Hello from StudyVerse!",
        timestamp: new Date().toISOString(),
      })

      setResult(`Document added with ID: ${docRef.id}`)
    } catch (error) {
      console.error("Error adding document:", error)
      setError(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testGetDocuments = async () => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const q = query(collection(firestore, "test"), limit(5))
      const querySnapshot = await getDocs(q)

      const documents = []
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() })
      })

      setResult(`Found ${documents.length} documents: ${JSON.stringify(documents, null, 2)}`)
    } catch (error) {
      console.error("Error getting documents:", error)
      setError(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firestore Test</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={testAddDocument} disabled={isLoading}>
          <Text style={styles.buttonText}>Add Document</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testGetDocuments} disabled={isLoading}>
          <Text style={styles.buttonText}>Get Documents</Text>
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
    backgroundColor: "#7c3aed",
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

export default FirestoreTest

