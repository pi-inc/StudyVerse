"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { height, width } = Dimensions.get("window")

const SubjectInterestsStep = ({ width: screenWidth, onNext, onBack, userData, updateUserData }) => {
  const [showError, setShowError] = useState(false)

  // Organize subjects into categories
  const subjectCategories = [
    {
      name: "STEM",
      subjects: [
        { id: "math", name: "Mathematics", icon: "calculator-outline" },
        { id: "science", name: "Science", icon: "flask-outline" },
        { id: "programming", name: "Programming", icon: "code-slash-outline" },
        { id: "engineering", name: "Engineering", icon: "construct-outline" },
      ],
    },
    {
      name: "Humanities",
      subjects: [
        { id: "languages", name: "Languages", icon: "language-outline" },
        { id: "history", name: "History", icon: "book-outline" },
        { id: "arts", name: "Arts & Humanities", icon: "color-palette-outline" },
        { id: "philosophy", name: "Philosophy", icon: "school-outline" },
      ],
    },
    {
      name: "Professional",
      subjects: [
        { id: "business", name: "Business", icon: "briefcase-outline" },
        { id: "health", name: "Health & Medicine", icon: "medical-outline" },
        { id: "law", name: "Law", icon: "shield-outline" },
        { id: "education", name: "Education", icon: "library-outline" },
      ],
    },
  ]

  const toggleSubject = (subjectId) => {
    const currentSubjects = [...userData.subjects]
    const index = currentSubjects.indexOf(subjectId)

    if (index === -1) {
      // Add subject
      updateUserData({ subjects: [...currentSubjects, subjectId] })
      setShowError(false) // Clear error when user makes a selection
    } else {
      // Remove subject
      currentSubjects.splice(index, 1)
      updateUserData({ subjects: currentSubjects })
    }
  }

  const isSubjectSelected = (subjectId) => {
    return userData.subjects.includes(subjectId)
  }

  const handleNextPress = () => {
    if (userData.subjects.length > 0) {
      onNext()
    } else {
      setShowError(true) // Show error if user tries to proceed without a selection
    }
  }

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: "#10b981" }]}>
            <Ionicons name="book" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Subject Interests</Text>
          <Text style={styles.subtitle}>What would you like to learn?</Text>

          <Text style={styles.description}>Select subjects you're interested in studying (choose all that apply).</Text>

          {subjectCategories.map((category, categoryIndex) => (
            <View key={category.name} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              <View style={styles.subjectsGrid}>
                {category.subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject.id}
                    style={[
                      styles.subjectItem,
                      isSubjectSelected(subject.id) && styles.selectedSubject,
                      showError && userData.subjects.length === 0 && styles.errorBorder,
                    ]}
                    onPress={() => toggleSubject(subject.id)}
                  >
                    <View style={[styles.iconWrapper, isSubjectSelected(subject.id) && styles.selectedIconWrapper]}>
                      <Ionicons
                        name={subject.icon}
                        size={20}
                        color={isSubjectSelected(subject.id) ? "#fff" : "#10b981"}
                      />
                    </View>
                    <Text style={[styles.subjectName, isSubjectSelected(subject.id) && styles.selectedSubjectName]}>
                      {subject.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {showError && userData.subjects.length === 0 && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>Please select at least one subject to continue</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>7 of 7</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: "#10b981" },
              userData.subjects.length === 0 && styles.disabledButton,
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
  categoryContainer: {
    width: "100%",
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedSubject: {
    borderColor: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  errorBorder: {
    borderColor: "#ef4444",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedIconWrapper: {
    backgroundColor: "#10b981",
  },
  subjectName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    flex: 1,
  },
  selectedSubjectName: {
    color: "#10b981",
    fontWeight: "bold",
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

export default SubjectInterestsStep

