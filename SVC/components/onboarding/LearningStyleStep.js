"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

const LearningStyleStep = ({ width, onNext, onBack, userData, updateUserData }) => {
  const [showError, setShowError] = useState(false)

  const learningStyles = [
    {
      id: "visual",
      title: "Visual Learner",
      description: "Prefer diagrams, charts, and visual explanations",
    },
    {
      id: "auditory",
      title: "Auditory Learner",
      description: "Learn best through listening and discussion",
    },
    {
      id: "reading",
      title: "Reading/Writing Learner",
      description: "Prefer text-based information and note-taking",
    },
    {
      id: "kinesthetic",
      title: "Kinesthetic Learner",
      description: "Learn by doing and hands-on practice",
    },
  ]

  // Set a default learning style if none is selected
  useEffect(() => {
    if (!userData.learningStyle && learningStyles.length > 0) {
      updateUserData({ learningStyle: learningStyles[0].id })
    }
  }, [])

  const handleStyleSelect = (styleId) => {
    updateUserData({ learningStyle: styleId })
    setShowError(false) // Clear error when user makes a selection
  }

  const handleNextPress = () => {
    if (userData.learningStyle) {
      onNext()
    } else {
      setShowError(true) // Show error if user tries to proceed without a selection
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: "#ec4899" }]}>
            <Ionicons name="school-outline" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Learning Style</Text>
          <Text style={styles.subtitle}>How do you learn best?</Text>

          <Text style={styles.description}>Understanding your learning style helps us tailor content delivery.</Text>

          <View style={styles.stylesContainer}>
            {learningStyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleItem,
                  userData.learningStyle === style.id && styles.selectedStyleItem,
                  showError && !userData.learningStyle && styles.errorBorder,
                ]}
                onPress={() => handleStyleSelect(style.id)}
                activeOpacity={0.7}
              >
                <View style={styles.radioContainer}>
                  <View style={[styles.radioOuter, userData.learningStyle === style.id && styles.selectedRadioOuter]}>
                    {userData.learningStyle === style.id && <View style={styles.radioInner} />}
                  </View>
                </View>
                <View style={styles.styleContent}>
                  <Text style={styles.styleTitle}>{style.title}</Text>
                  <Text style={styles.styleDescription}>{style.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {showError && !userData.learningStyle && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>Please select a learning style to continue</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>5 of 7</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: "#ec4899" },
              !userData.learningStyle && styles.disabledButton,
            ]}
            onPress={handleNextPress}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 80, // Extra padding at bottom for footer
  },
  content: {
    alignItems: "center",
    minHeight: height * 0.7, // Ensure content takes up at least 70% of screen height
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 32,
  },
  stylesContainer: {
    width: "100%",
  },
  styleItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedStyleItem: {
    borderColor: "#ec4899",
    backgroundColor: "rgba(236, 72, 153, 0.05)",
  },
  errorBorder: {
    borderColor: "#ef4444",
  },
  radioContainer: {
    marginRight: 16,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioOuter: {
    borderColor: "#ec4899",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ec4899",
  },
  styleContent: {
    flex: 1,
  },
  styleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
    width: "100%",
  },
  errorText: {
    color: "#ef4444",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  stepIndicator: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 8,
  },
})

export default LearningStyleStep

