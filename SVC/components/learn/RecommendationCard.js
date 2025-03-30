"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const RecommendationCard = ({ item, onPress }) => {
  const navigation = useNavigation()

  // Guard against undefined item
  if (!item) {
    console.warn("RecommendationCard received undefined or null item data")
    return null
  }

  console.log("Rendering recommendation card with item:", item)
  const [scaleAnim] = useState(new Animated.Value(1))

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const handlePress = () => {
    console.log("RecommendationCard pressed:", item)
    if (item.type === "AI Tutor") {
      console.log("Navigating to AI Tutor")
      navigation.navigate("AITutor")
    } else if (item.courseId) {
      console.log("Navigating to course with ID:", item.courseId)
      navigation.navigate("CourseDetail", { courseId: item.courseId })
    }

    if (onPress) {
      onPress(item)
    }
  }

  const renderIcon = () => {
    // Use Feather icons for git-branch
    if (item.icon === "git-branch") {
      return <Feather name="git-branch" size={24} color="#fff" />
    }
    // Use Ionicons for all other icons
    return <Ionicons name={item.icon || "help-circle"} size={24} color="#fff" />
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor || "#7c3aed" }]}>{renderIcon()}</View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title || "Recommendation"}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{item.type || "Unknown"}</Text>
          </View>
          <Text style={styles.description}>{item.description || "No description available"}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
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
  typeContainer: {
    backgroundColor: "#2d2d44",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  typeText: {
    fontSize: 12,
    color: "#9ca3af",
  },
  description: {
    fontSize: 14,
    color: "#9ca3af",
  },
})

export default RecommendationCard

