"use client"

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"

const { height } = Dimensions.get("window")

const WelcomeStep = ({ width, onNext, setSkipAuth }) => {
  const navigation = useNavigation()
  const { theme } = useTheme()

  return (
    <View style={[styles.container, { width, backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="book-outline" size={32} color={theme.colors.text.primary} />
          </View>

          <Text style={[styles.title, { color: theme.colors.text.primary }]}>Welcome to StudyVerse</Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>Your ultimate study companion</Text>

          <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
            StudyVerse helps you learn more effectively with AI-powered tools and a structured approach to studying.
          </Text>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: theme.colors.primary }]}>
                <Ionicons name="bulb-outline" size={24} color={theme.colors.text.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.colors.text.primary }]}>Smart Learning</Text>
              <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
                AI-powered study assistance
              </Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: theme.colors.info }]}>
                <Ionicons name="calendar-outline" size={24} color={theme.colors.text.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.colors.text.primary }]}>Study Planning</Text>
              <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
                Organize your learning journey
              </Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: theme.colors.success }]}>
                <Ionicons name="people-outline" size={24} color={theme.colors.text.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.colors.text.primary }]}>Social Learning</Text>
              <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
                Connect with fellow students
              </Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: theme.colors.warning }]}>
                <Ionicons name="analytics-outline" size={24} color={theme.colors.text.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.colors.text.primary }]}>Track Progress</Text>
              <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
                Monitor your improvement
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { backgroundColor: theme.colors.background.primary, borderTopColor: theme.colors.border.light },
        ]}
      >
        <Text style={[styles.stepIndicator, { color: theme.colors.text.tertiary }]}>1 of 8</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.skipButton, { color: theme.colors.text.tertiary }]}
            onPress={() => {
              // Set skipAuth to true to bypass authentication
              setSkipAuth(true)
            }}
          >
            <Text style={[styles.skipButtonText, { color: theme.colors.text.tertiary }]}>Skip to Main</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.nextButton, { backgroundColor: theme.colors.primary }]} onPress={onNext}>
            <Text style={[styles.nextButtonText, { color: theme.colors.text.primary }]}>Get Started</Text>
            <Ionicons name="arrow-forward" size={16} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  featureItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  stepIndicator: {
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptySpace: {
    width: 80, // Approximately the width of the back button
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
})

export default WelcomeStep

