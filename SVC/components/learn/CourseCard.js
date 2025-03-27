"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CourseCard = ({ course, isExplore = false }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const progressAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!isExplore) {
      Animated.timing(progressAnim, {
        toValue: course.progress / 100,
        duration: 600, // Reduced from 1000
        useNativeDriver: false,
      }).start()
    }
  }, [course.progress, isExplore])

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 50, // Reduced from 100
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3, // Reduced from 5
      tension: 60, // Increased from 40
      useNativeDriver: true,
    }).start()
  }

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  })

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity style={styles.card} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{course.icon}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {course.title}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {course.description}
          </Text>

          {!isExplore && (
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, { width, backgroundColor: course.progressColor }]} />
            </View>
          )}

          <View style={styles.tagsContainer}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{course.category}</Text>
            </View>
            <View style={styles.levelTag}>
              <Text style={styles.levelText}>{course.level}</Text>
            </View>
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#374151",
    borderRadius: 3,
    marginBottom: 12,
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

