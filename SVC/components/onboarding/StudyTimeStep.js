"use client"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider" // Import from community package

const { height } = Dimensions.get("window")

const StudyTimeStep = ({ width, onNext, onBack, userData, updateUserData }) => {
  const handleTimeChange = (value) => {
    updateUserData({ studyTimeMinutes: Math.round(value) })
  }

  // Get the time category based on minutes
  const getTimeCategory = (minutes) => {
    if (minutes < 30) {
      return "Short sessions - good for busy schedules"
    } else if (minutes >= 30 && minutes < 60) {
      return "Medium sessions - balanced approach"
    } else if (minutes >= 60 && minutes < 90) {
      return "Long sessions - deep focus periods"
    } else {
      return "Extended sessions - for intensive study"
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: "#f59e0b" }]}>
            <Ionicons name="time-outline" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Study Time</Text>
          <Text style={styles.subtitle}>How much time can you dedicate?</Text>

          <Text style={styles.description}>
            We'll help you create a realistic study schedule based on your availability.
          </Text>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Minutes per day for studying</Text>

            <View style={styles.timeValueContainer}>
              <Text style={styles.timeValue}>{userData.studyTimeMinutes} min</Text>
              <Text style={styles.timeCategory}>{getTimeCategory(userData.studyTimeMinutes)}</Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={120}
              step={5}
              value={userData.studyTimeMinutes}
              onValueChange={handleTimeChange}
              minimumTrackTintColor="#f59e0b"
              maximumTrackTintColor="#e5e7eb"
              thumbTintColor="#f59e0b"
            />

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>{"< 30 min"}</Text>
              <Text style={styles.sliderLabel}>30-60 min</Text>
              <Text style={styles.sliderLabel}>60-90 min</Text>
              <Text style={styles.sliderLabel}>{"> 90 min"}</Text>
            </View>

            <View style={styles.sliderMarkers}>
              <View style={[styles.marker, { left: "0%" }]} />
              <View style={[styles.marker, { left: "25%" }]} />
              <View style={[styles.marker, { left: "50%" }]} />
              <View style={[styles.marker, { left: "75%" }]} />
              <View style={[styles.marker, { left: "100%" }]} />
            </View>
          </View>

          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationTitle}>Recommended Schedule</Text>
            <Text style={styles.recommendationText}>
              {userData.studyTimeMinutes < 30
                ? "Short, frequent study sessions throughout the day to maintain consistency."
                : userData.studyTimeMinutes < 60
                  ? "Balanced daily sessions with concept review and practice exercises."
                  : userData.studyTimeMinutes < 90
                    ? "Longer focused sessions with breaks to maximize deep learning."
                    : "Extended study blocks ideal for complex topics and project work."}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>6 of 7</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.nextButton, { backgroundColor: "#f59e0b" }]} onPress={onNext}>
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
  timeContainer: {
    width: "100%",
    marginBottom: 32,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 16,
  },
  timeValueContainer: {
    alignItems: "flex-end",
    marginBottom: 8,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  timeCategory: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#6b7280",
    width: "25%",
    textAlign: "center",
  },
  sliderMarkers: {
    flexDirection: "row",
    position: "relative",
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
  },
  marker: {
    position: "absolute",
    width: 2,
    height: 8,
    backgroundColor: "#6b7280",
    borderRadius: 1,
    top: -2,
    marginLeft: -1,
  },
  recommendationContainer: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  recommendationText: {
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
})

export default StudyTimeStep

