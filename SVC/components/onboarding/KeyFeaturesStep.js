import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

const KeyFeaturesStep = ({ width, onNext, onBack }) => {
  return (
    <View style={[styles.container, { width }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: "#3b82f6" }]}>
            <Ionicons name="bulb" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Key Features</Text>
          <Text style={styles.subtitle}>Everything you need to excel in your studies</Text>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#8a70ff" }]}>
                <Ionicons name="bulb" size={24} color="#fff" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI Tutor</Text>
                <Text style={styles.featureDescription}>
                  Get instant help with any topic or question from our advanced AI tutor.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#3b82f6" }]}>
                <Ionicons name="book" size={24} color="#fff" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Structured Courses</Text>
                <Text style={styles.featureDescription}>
                  Access comprehensive courses with interactive lessons and quizzes.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#10b981" }]}>
                <Ionicons name="time" size={24} color="#fff" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Spaced Repetition</Text>
                <Text style={styles.featureDescription}>
                  Review material at optimal intervals to maximize long-term retention.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.accountOptionsContainer}>
            <Text style={styles.accountOptionsText}>Ready to start your learning journey?</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>2 of 8</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.nextButton, { backgroundColor: "#3b82f6" }]} onPress={onNext}>
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
  featuresContainer: {
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "flex-start",
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
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
  nextButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 8,
  },
  accountOptionsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    alignItems: "center",
  },
  accountOptionsText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
})

export default KeyFeaturesStep

