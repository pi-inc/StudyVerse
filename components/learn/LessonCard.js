"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useTheme } from "../../context/ThemeContext"
import { spacing, fontSizes, typography } from "../../styles/theme"

const LessonCard = ({ lesson, onPress }) => {
  const { theme } = useTheme()

  // Determine icon based on lesson type
  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return "videocam-outline"
      case "reading":
        return "book-outline"
      case "interactive":
        return "code-outline"
      case "project":
        return "create-outline"
      default:
        return "document-text-outline"
    }
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.background.card }]}
      onPress={() => onPress(lesson)}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: lesson.completed ? theme.colors.success + "20" : theme.colors.background.accent,
          },
        ]}
      >
        <Icon
          name={getLessonIcon(lesson.type)}
          size={20}
          color={lesson.completed ? theme.colors.success : theme.colors.text.secondary}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]} numberOfLines={1}>
          {lesson.title}
        </Text>

        <View style={styles.metaContainer}>
          <Text style={[styles.duration, { color: theme.colors.text.secondary }]}>{lesson.duration}</Text>

          {lesson.completed && (
            <View style={styles.completedBadge}>
              <Icon name="checkmark" size={12} color={theme.colors.success} />
              <Text style={[styles.completedText, { color: theme.colors.success }]}>Completed</Text>
            </View>
          )}
        </View>
      </View>

      <Icon name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: typography.fontWeight.medium,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  duration: {
    fontSize: fontSizes.sm,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: spacing.md,
  },
  completedText: {
    fontSize: fontSizes.xs,
    marginLeft: 2,
  },
})

export default LessonCard

