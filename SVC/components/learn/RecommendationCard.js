"use client"

import { useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"

const RecommendationCard = ({ item, onPress }) => {
  const navigation = useNavigation()
  const { theme } = useTheme() // Add this to access theme

  // Guard against undefined item
  if (!item) {
    console.warn("RecommendationCard received undefined or null item data")
    return null
  }

  console.log("Rendering recommendation card with item:", item)
  const scaleAnim = useRef(new Animated.Value(1)).current

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
      return <Feather name="git-branch" size={24} color={theme.colors.text.primary} />
    }
    // Use Ionicons for all other icons
    return <Ionicons name={item.icon || "help-circle"} size={24} color={theme.colors.text.primary} />
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.colors.background.card }]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor || theme.colors.primary }]}>
          {renderIcon()}
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>{item.title || "Recommendation"}</Text>
          <View style={[styles.typeContainer, { backgroundColor: theme.colors.background.accent }]}>
            <Text style={[styles.typeText, { color: theme.colors.text.tertiary }]}>{item.type || "Unknown"}</Text>
          </View>
          <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
            {item.description || "No description available"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
      </TouchableOpacity>
    </Animated.View>
  )
}

// Update the styles to remove hardcoded colors
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: 4,
  },
  typeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  typeText: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
  },
})

export default RecommendationCard

