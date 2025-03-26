"use client"

import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../context/ThemeContext"
import Header from "../components/layout/Header"
import RecentCourses from "../components/home/RecentCourses"
import DailyPlan from "../components/home/DailyPlan"
import StreakAchievements from "../components/home/StreakAchievements"
import PersonalizedRecommendations from "../components/home/PersonalizedRecommendations"
import FeatureTourButton from "../components/improved-onboarding/FeatureTourButton"
import PageTransition from "../components/navigation/PageTransition"
import PullToRefresh from "../components/ui/PullToRefresh"

const HomeScreen = () => {
  const { theme } = useTheme()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  return (
    <PageTransition type="fade">
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="StudyVerse" />

        <View style={styles.tourButtonContainer}>
          <FeatureTourButton tourId="home-tour" label="Take Home Tour" />
        </View>

        <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh} contentContainerStyle={styles.scrollContent}>
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeText, { color: theme.foreground }]}>Welcome back, Alex!</Text>
            <Text style={[styles.dateText, { color: theme.mutedForeground }]}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </Text>
          </View>

          <StreakAchievements />
          <DailyPlan />
          <RecentCourses />
          <PersonalizedRecommendations />
        </PullToRefresh>
      </SafeAreaView>
    </PageTransition>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  tourButtonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
})

export default HomeScreen

