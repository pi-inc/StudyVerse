"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAnimatedScale } from "../../hooks/useAnimatedScale"

const CourseCard = ({
  course,
  variant = "default", // "default", "simple", "compact"
  showProgress = true,
  onPress,
}) => {
  const navigation = useNavigation()
  const progressAnim = useRef(new Animated.Value(0)).current
  const { scale, handlePressIn, handlePressOut } = useAnimatedScale()

  // Guard against undefined course
  if (!course) {
    console.warn("CourseCard received undefined or null course data")
    return null
  }

  useEffect(() => {
    let animation
    if (showProgress && course && course.progress) {
      animation = Animated.timing(progressAnim, {
        toValue: course.progress / 100,
        duration: 600,
        useNativeDriver: false,
      }).start()
    } else {
      // Ensure progressAnim is always initialized, even if showProgress is false or course.progress is undefined
      animation = Animated.timing(progressAnim, {
        toValue: 0, // Or any default value
        duration: 0, // No animation
        useNativeDriver: false,
      }).start()
    }
    return () => {
      if (animation) {
        animation.stop()
      }
    }
  }, [course, showProgress])

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  })

  const handleCardPress = () => {
    if (onPress) {
      onPress(course)
    } else if (course && course.id) {
      console.log("CourseCard pressed with ID:", course.id)
      navigation.navigate("CourseDetail", { courseId: course.id })
    } else {
      console.error("Course or course.id is undefined")
    }
  }

  // Fix for icon encoding issues
  const getIcon = () => {
    // If icon is corrupted or undefined, use a default icon
    if (!course.icon || course.icon.includes("")) {
      if (course.category === "Computer Science") return "💻"
      if (course.category === "Data Science") return "📊"
      if (course.category === "Web Development") return "🌐"
      return "📚" // Default icon
    }
    return course.icon
  }

  // Compact variant (used in HomeScreen)
  if (variant === "compact") {
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={[styles.card, styles.compactCard, { borderLeftColor: course.progressColor || "#7c3aed" }]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          onPress={handleCardPress}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.title} numberOfLines={1}>
              {course.title || "Untitled Course"}
            </Text>
            {course.lastAccessed && (
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={16} color="#9ca3af" />
                <Text style={styles.timeText}>{course.lastAccessed}</Text>
              </View>
            )}
          </View>

          {showProgress && (
            <>
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPercentage}>{course.progress || 0}%</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[styles.progressBar, { width, backgroundColor: course.progressColor || "#7c3aed" }]}
                />
              </View>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  // Default variant (used in LearnScreen)
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        onPress={handleCardPress}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{getIcon()}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {course.title || "Untitled Course"}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {course.description || "No description available"}
          </Text>

          {showProgress && (
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[styles.progressBar, { width, backgroundColor: course.progressColor || "#7c3aed" }]}
              />
            </View>
          )}

          <View style={styles.tagsContainer}>
            {course.category && (
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{course.category}</Text>
              </View>
            )}
            {course.level && (
              <View style={styles.levelTag}>
                <Text style={styles.levelText}>{course.level}</Text>
              </View>
            )}
            {course.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text style={styles.ratingText}>{course.rating}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactCard: {
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#2d2d44",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  progressPercentage: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#374151",
    borderRadius: 3,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryTag: {
    backgroundColor: "#2d2d44",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
  },
  levelTag: {
    backgroundColor: "#2d2d44",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  levelText: {
    fontSize: 12,
    color: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#fbbf24",
    marginLeft: 4,
  },
})

export default CourseCard

