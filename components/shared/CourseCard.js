"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ProgressBar from "./ProgressBar"
import { useTheme } from "../../context/ThemeContext"

const CourseCard = ({ course, variant = "default", onPress }) => {
  const { theme } = useTheme()

  if (!course) {
    console.warn("CourseCard received null or undefined course")
    return null
  }

  const isCompact = variant === "compact"

  const handlePress = () => {
    if (onPress && typeof onPress === "function") {
      onPress(course)
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCompact ? styles.compactContainer : null,
        { backgroundColor: theme.colors.background.card },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`${course.title} course, ${course.progress}% complete`}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.background.accent }]}>
          <Text style={styles.icon}>{course.icon || "📚"}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]} numberOfLines={1} ellipsizeMode="tail">
            {course.title}
          </Text>

          {!isCompact && (
            <Text
              style={[styles.description, { color: theme.colors.text.secondary }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {course.description}
            </Text>
          )}

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={theme.colors.text.secondary} />
              <Text style={[styles.metaText, { color: theme.colors.text.secondary }]}>{course.lastAccessed}</Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="school-outline" size={14} color={theme.colors.text.secondary} />
              <Text style={[styles.metaText, { color: theme.colors.text.secondary }]}>{course.level}</Text>
            </View>
          </View>

          <ProgressBar
            progress={course.progress}
            color={course.progressColor || theme.colors.primary}
            height={isCompact ? 4 : 6}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  compactContainer: {
    padding: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
})

export default CourseCard

