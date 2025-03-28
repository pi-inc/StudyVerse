import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

const WelcomeStep = ({ width, onNext }) => {
  return (
    <View style={[styles.container, { width }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="book-outline" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Welcome to StudyVerse</Text>
          <Text style={styles.subtitle}>Your ultimate study companion</Text>

          <Text style={styles.description}>
            StudyVerse helps you learn more effectively with AI-powered tools and a structured approach to studying.
          </Text>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#8a70ff" }]}>
                <Ionicons name="bulb-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.featureTitle}>Smart Learning</Text>
              <Text style={styles.featureDescription}>AI-powered study assistance</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#3b82f6" }]}>
                <Ionicons name="calendar-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.featureTitle}>Study Planning</Text>
              <Text style={styles.featureDescription}>Organize your learning journey</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#10b981" }]}>
                <Ionicons name="people-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.featureTitle}>Social Learning</Text>
              <Text style={styles.featureDescription}>Connect with fellow students</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#f59e0b" }]}>
                <Ionicons name="analytics-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.featureTitle}>Track Progress</Text>
              <Text style={styles.featureDescription}>Monitor your improvement</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>1 of 8</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.emptySpace} />
          <TouchableOpacity style={[styles.nextButton, { backgroundColor: "#8a70ff" }]} onPress={onNext}>
            <Text style={styles.nextButtonText}>Get Started</Text>
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
    backgroundColor: "#8a70ff",
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
    marginBottom: 24,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#374151",
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
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
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
    color: "#fff",
    fontWeight: "bold",
    marginRight: 8,
  },
})

export default WelcomeStep

