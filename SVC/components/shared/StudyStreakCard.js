"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import { spacing, fontSizes } from "../../styles/theme"

const StudyStreakCard = ({ currentStreak = 0, longestStreak = 0, achievements = [] }) => {
  const { theme, isDark } = useTheme()

  // Default achievements if none provided
  const defaultAchievements = [
    { icon: "star", title: "First Quiz Completed", timestamp: "2 days ago" },
    { icon: "people", title: "Study Group Joined", timestamp: "Yesterday" },
    { icon: "ribbon", title: "5 Flashcards Mastered", timestamp: "Today" },
  ]

  const displayAchievements = achievements.length > 0 ? achievements : defaultAchievements

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="flame" size={24} color={theme.colors.primary} />
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>Study Streak</Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>Keep up your daily study habit</Text>
        </View>
      </View>

      <View style={styles.streakContainer}>
        <View style={[styles.streakCircle, { backgroundColor: theme.colors.primaryDark }]}>
          <Text style={[styles.streakValue, { color: theme.colors.text.primary }]}>{currentStreak}</Text>
        </View>

        <View style={styles.streakInfo}>
          <Text style={[styles.streakLabel, { color: theme.colors.text.primary }]}>{currentStreak} day streak</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBackground, { backgroundColor: theme.colors.background.accent }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: theme.colors.primary,
                    width: `${Math.min((currentStreak / 7) * 100, 100)}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>{currentStreak}/7</Text>
          </View>
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          <Ionicons name="trophy" size={18} color={theme.colors.secondary} /> Recent Achievements
        </Text>

        {displayAchievements.map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            <Ionicons name={achievement.icon} size={16} color={theme.colors.secondary} style={styles.achievementIcon} />
            <Text style={[styles.achievementTitle, { color: theme.colors.text.primary }]}>{achievement.title}</Text>
            <Text style={[styles.achievementTime, { color: theme.colors.text.tertiary }]}>{achievement.timestamp}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={[styles.viewAllText, { color: theme.colors.secondary }]}>View All Achievements</Text>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  titleContainer: {
    marginLeft: spacing.sm,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: fontSizes.sm,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.md,
  },
  streakCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  streakValue: {
    fontSize: fontSizes.xl,
    fontWeight: "bold",
  },
  streakInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  streakLabel: {
    fontSize: fontSizes.md,
    fontWeight: "500",
    marginBottom: spacing.xs,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    marginLeft: spacing.sm,
    fontSize: fontSizes.sm,
  },
  achievementsSection: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  achievementIcon: {
    marginRight: spacing.sm,
  },
  achievementTitle: {
    flex: 1,
    fontSize: fontSizes.sm,
  },
  achievementTime: {
    fontSize: fontSizes.xs,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(150, 150, 150, 0.2)",
  },
  viewAllText: {
    fontSize: fontSizes.sm,
    marginRight: spacing.xs,
  },
})

export default StudyStreakCard

