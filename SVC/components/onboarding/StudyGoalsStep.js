"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

const StudyGoalsStep = ({ width, onNext, onBack, userData, updateUserData }) => {
  const [showError, setShowError] = useState(false)

  const goals = [
    {
      id: "academic",
      title: "Academic Success",
      description: "Improve grades and excel in coursework",
    },
    {
      id: "professional",
      title: "Professional Development",
      description: "Learn new skills for career advancement",
    },
    {
      id: "certification",
      title: "Certification Preparation",
      description: "Study for specific certifications or exams",
    },
    {
      id: "personal",
      title: "Personal Interest",
      description: "Learn for curiosity and personal growth",
    },
  ]

  // Set a default goal if none is selected
  useEffect(() => {
    if (!userData.studyGoal && goals.length > 0) {
      updateUserData({ studyGoal: goals[0].id })
    }
  }, [])

  const handleGoalSelect = (goalId) => {
    updateUserData({ studyGoal: goalId })
    setShowError(false) // Clear error when user makes a selection
  }

  const handleNextPress = () => {
    if (userData.studyGoal) {
      onNext()
    } else {
      setShowError(true) // Show error if user tries to proceed without a selection
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: "#8a70ff" }]}>
            <Ionicons name="trophy-outline" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Your Study Goals</Text>
          <Text style={styles.subtitle}>Let's personalize your experience</Text>

          <Text style={styles.question}>What's your primary goal for using StudyVerse?</Text>

          <View style={styles.goalsContainer}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalItem,
                  userData.studyGoal === goal.id && styles.selectedGoalItem,
                  showError && !userData.studyGoal && styles.errorBorder,
                ]}
                onPress={() => handleGoalSelect(goal.id)}
                activeOpacity={0.7}
              >
                <View style={styles.radioContainer}>
                  <View style={[styles.radioOuter, userData.studyGoal === goal.id && styles.selectedRadioOuter]}>
                    {userData.studyGoal === goal.id && <View style={styles.radioInner} />}
                  </View>
                </View>
                <View style={styles.goalContent}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {showError && !userData.studyGoal && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>Please select a goal to continue</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>4 of 7</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: "#8a70ff" }, !userData.studyGoal && styles.disabledButton]}
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
    marginBottom: 32,
    textAlign: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  goalsContainer: {
    width: "100%",
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedGoalItem: {
    borderColor: "#8a70ff",
    backgroundColor: "rgba(138, 112, 255, 0.05)",
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
    borderColor: "#8a70ff",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8a70ff",
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  goalDescription: {
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

export default StudyGoalsStep

