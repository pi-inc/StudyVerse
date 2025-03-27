"use client"

import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import AnimatedListItem from "../shared/AnimatedListItem"
import { useNavigation } from "@react-navigation/native"

const AITutorView = () => {
  const navigation = useNavigation()

  // Sample recent questions
  const recentQuestions = [
    {
      id: 1,
      question: "How do binary trees work?",
    },
    {
      id: 2,
      question: "Explain the difference between arrays and linked lists",
    },
    {
      id: 3,
      question: "What is the time complexity of quicksort?",
    },
    {
      id: 4,
      question: "How does machine learning work?",
    },
  ]

  // Sample learning resources
  const learningResources = [
    {
      id: 1,
      title: "Video Tutorials",
      description: "Learn through visual explanations",
      icon: "book",
    },
    {
      id: 2,
      title: "Articles & Guides",
      description: "In-depth written explanations",
      icon: "document-text",
    },
  ]

  const handleAskTutor = () => {
    navigation.navigate("AITutor")
  }

  const handleQuestionPress = (question) => {
    navigation.navigate("AITutor", { initialQuestion: question })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AnimatedListItem index={0}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Tutor</Text>
          <Text style={styles.description}>
            Get personalized help with any topic or question. Your AI tutor is available 24/7.
          </Text>
          
          <TouchableOpacity style={styles.askButton} onPress={handleAskTutor}>
            <Ionicons name="bulb-outline" size={20} color="#fff" />
            <Text style={styles.askButtonText}>Ask AI Tutor</Text>
          </TouchableOpacity>
        </View>
      </AnimatedListItem>

      <AnimatedListItem index={1}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Questions</Text>
          
          {recentQuestions.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.questionItem}
              onPress={() => handleQuestionPress(item.question)}
            >
              <Ionicons name="bulb-outline" size={20} color="#8a70ff" style={styles.questionIcon} />
              <Text style={styles.questionText}>{item.question}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </AnimatedListItem>

      <AnimatedListItem index={2}>
        <View style={styles.divider} />
      </AnimatedListItem>

      <AnimatedListItem index={3}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Resources</Text>
          
          {learningResources.map((resource) => (
            <TouchableOpacity key={resource.id} style={styles.resourceItem}>
              <View style={styles.resourceIconContainer}>
                <Ionicons name={resource.icon} size={24} color="#fff" />
              </View>
              <View style={styles.resourceContent}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </AnimatedListItem>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 16,
    lineHeight: 22,
  },
  askButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8a70ff",
    borderRadius: 8,
    paddingVertical: 14,
    marginVertical: 8,
  },
  askButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  questionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  questionIcon: {
    marginRight: 12,
  },
  questionText: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  divider: {
    height: 4,
    backgroundColor: "rgba(138, 112, 255, 0.3)",
    borderRadius: 2,
    marginBottom: 24,
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2d2d44",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#9ca3af",
  },
})

export default AITutorView
    