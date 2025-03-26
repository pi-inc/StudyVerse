"use client"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"
import { LinearGradient } from "expo-linear-gradient"

const StreakAchievements = () => {
  const { theme } = useTheme()
  const currentStreak = 7 // Mock data
  const longestStreak = 14 // Mock data

  // Generate streak circles
  const renderStreakCircles = () => {
    const circles = []
    for (let i = 0; i < 7; i++) {
      const isActive = i < currentStreak % 7
      circles.push(
        <View
          key={i}
          style={[styles.streakCircle, isActive ? { borderColor: theme.study.purple } : { borderColor: theme.muted }]}
        >
          {isActive && (
            <LinearGradient colors={[theme.study.purple, theme.study.blue]} style={styles.activeStreakCircle} />
          )}
        </View>,
      )
    }
    return circles
  }

  return (
    <Card>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.foreground }]}>Your Learning Streak</Text>

        <View style={styles.streakInfo}>
          <View style={styles.streakCount}>
            <Text style={[styles.streakNumber, { color: theme.foreground }]}>{currentStreak}</Text>
            <Text style={[styles.streakLabel, { color: theme.mutedForeground }]}>days</Text>
          </View>

          <View style={styles.streakCirclesContainer}>{renderStreakCircles()}</View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.achievements}>
          <View style={styles.achievement}>
            <Text style={[styles.achievementValue, { color: theme.foreground }]}>{longestStreak}</Text>
            <Text style={[styles.achievementLabel, { color: theme.mutedForeground }]}>Longest streak</Text>
          </View>

          <View style={styles.achievement}>
            <Text style={[styles.achievementValue, { color: theme.foreground }]}>3</Text>
            <Text style={[styles.achievementLabel, { color: theme.mutedForeground }]}>Achievements</Text>
          </View>

          <View style={styles.achievement}>
            <Text style={[styles.achievementValue, { color: theme.foreground }]}>250</Text>
            <Text style={[styles.achievementLabel, { color: theme.mutedForeground }]}>XP today</Text>
          </View>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  streakInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  streakCount: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginRight: 16,
  },
  streakNumber: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    marginRight: 4,
  },
  streakLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 6,
  },
  streakCirclesContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  streakCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  activeStreakCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  achievements: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  achievement: {
    alignItems: "center",
  },
  achievementValue: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  achievementLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
})

export default StreakAchievements

