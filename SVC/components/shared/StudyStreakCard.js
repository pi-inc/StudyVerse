"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useRef, useEffect } from "react"
import { Animated } from "react-native"

const StudyStreakCard = ({
  streak = { days: 7, label: "7 day streak", progress: 0.7 },
  showAchievements = false,
  style = {},
  achievements = [],
}) => {
  const navigation = useNavigation()
  const progressAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: streak.progress,
      duration: 600, // Reduced from 1000
      useNativeDriver: false,
    }).start()
  }, [streak.progress])

  // Default achievements if none provided
  const defaultAchievements = [
    {
      id: 1,
      icon: "star",
      iconColor: "#fbbf24",
      text: "First Quiz Completed",
      time: "2 days ago",
    },
    {
      id: 2,
      icon: "users",
      iconColor: "#3b82f6",
      text: "Study Group Joined",
      time: "Yesterday",
    },
    {
      id: 3,
      icon: "medal",
      iconColor: "#a78bfa",
      text: "5 Flashcards Mastered",
      time: "Today",
    },
  ]

  const displayAchievements = achievements.length > 0 ? achievements : defaultAchievements

  const handleViewAllAchievements = () => {
    navigation.navigate("Profile", { tab: "achievements" })
  }

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerContainer}>
        <FontAwesome5 name="fire" size={20} color="#f97316" />
        <Text style={styles.headerText}>Study Streak</Text>
      </View>
      <Text style={styles.subText}>Keep up your daily study habit</Text>

      <View style={styles.streakContainer}>
        <View style={styles.streakBadge}>
          <Text style={styles.streakNumber}>{streak.days}</Text>
        </View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakLabel}>{streak.label}</Text>
          <View style={styles.streakProgressContainer}>
            <Animated.View
              style={[
                styles.streakProgress,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.streakGoal}>5/7</Text>
        </View>
      </View>

      {showAchievements && (
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementHeader}>
            <FontAwesome5 name="trophy" size={16} color="#fbbf24" />
            <Text style={styles.achievementHeaderText}>Recent Achievements</Text>
          </View>

          {displayAchievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <View style={styles.achievementIconContainer}>
                <FontAwesome5 name={achievement.icon} size={14} color={achievement.iconColor} />
              </View>
              <Text style={styles.achievementText}>{achievement.text}</Text>
              <Text style={styles.achievementTime}>{achievement.time}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllAchievements}>
            <Text style={styles.viewAllText}>View All Achievements</Text>
            <FontAwesome5 name="chevron-right" size={12} color="#a78bfa" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  subText: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  streakBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7c2d12",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  streakInfo: {
    flex: 1,
  },
  streakLabel: {
    color: "#fff",
    marginBottom: 8,
  },
  streakProgressContainer: {
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 4,
  },
  streakProgress: {
    height: "100%",
    backgroundColor: "#f97316",
    borderRadius: 4,
  },
  streakGoal: {
    color: "#9ca3af",
    fontSize: 12,
    alignSelf: "flex-end",
  },
  achievementsContainer: {
    marginTop: 16,
  },
  achievementHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  achievementText: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
  },
  achievementTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#2d2d44",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#a78bfa",
    marginRight: 8,
  },
})

export default StudyStreakCard

