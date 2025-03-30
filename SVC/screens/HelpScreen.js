"use client"

import { useRef, useEffect, useState } from "react"
import { View, Text, ScrollView, Animated, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import StudyStreakCard from "../components/shared/StudyStreakCard"
import CourseCard from "../components/shared/CourseCard"
import ActionButton from "../components/home/ActionButton"
import TodaysPlanCard from "../components/home/TodaysPlanCard"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import SkipToContent from "../components/shared/SkipToContent"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { useThemedStyles } from "../hooks/useThemedStyles"
import { navigateToCourse, navigateToAITutor } from "../utils/navigation"
import { getContinueLearningCourses } from "../services/courseData"

export default function HomeScreen() {
  const navigation = useNavigation()
  const scrollViewRef = useRef(null)
  const { theme } = useTheme()
  const streakData = {
    days: 7,
    label: "7 day streak",
    progress: 0.7,
  }

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(50)).current
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // Get course data
  const [continueLearningCourses, setContinueLearningCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Use themed styles
  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },
    scrollViewContent: {
      paddingBottom: 100, // Add padding to the bottom
    },
    welcomeSection: {
      marginTop: 20,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.primaryLight,
      marginBottom: 10,
    },
    purpleDivider: {
      height: 4,
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
    },
    section: {
      marginBottom: 20,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.text.primary,
      marginLeft: 8,
    },
    toastContainer: {
      position: "absolute",
      bottom: 150,
      left: 20,
      right: 20,
      backgroundColor: "rgba(26, 26, 46, 0.9)",
      borderRadius: 8,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    toastText: {
      color: theme.colors.text.primary,
      fontSize: 16,
      flex: 1,
    },
    toastCloseButton: {
      padding: 4,
    },
    bottomPadding: {
      height: 100,
    },
    emptyState: {
      backgroundColor: theme.colors.background.card,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
      height: 100,
    },
    emptyStateText: {
      color: theme.colors.text.tertiary,
      fontSize: 16,
    },
    loadingState: {
      backgroundColor: theme.colors.background.card,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
      height: 100,
    },
    loadingText: {
      color: theme.colors.text.tertiary,
      fontSize: 16,
    },
  }))

  useEffect(() => {
    try {
      const courses = getContinueLearningCourses()
      console.log("HomeScreen got courses:", courses)
      setContinueLearningCourses(courses || [])
    } catch (error) {
      console.error("Error getting courses:", error)
      setContinueLearningCourses([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const handleAITutorPress = () => {
    navigateToAITutor(navigation)
    showToastMessage("Opening AI Tutor...")
  }

  const skipToContent = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 150, animated: true })
    }
  }

  const handleCoursePress = (course) => {
    navigateToCourse(navigation, course.id)
  }

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  console.log("HomeScreen rendering with courses:", continueLearningCourses)

  return (
    <View style={styles.container}>
      <SkipToContent onPress={skipToContent} />
      <Header />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Animated.View style={[styles.welcomeSection, headerAnimStyle]}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <View style={styles.purpleDivider} />
        </Animated.View>

        <View style={styles.section}>
          <AnimatedListItem index={0}>
            <View style={styles.sectionHeader}>
              <Ionicons name="book-outline" size={24} color={theme.colors.text.primary} />
              <Text style={styles.sectionTitle}>Continue Learning</Text>
            </View>
          </AnimatedListItem>

          {isLoading ? (
            <AnimatedListItem index={1}>
              <View style={styles.loadingState}>
                <Text style={styles.loadingText}>Loading courses...</Text>
              </View>
            </AnimatedListItem>
          ) : continueLearningCourses && continueLearningCourses.length > 0 ? (
            continueLearningCourses.map((course, index) => (
              <AnimatedListItem key={course.id} index={index + 1}>
                <CourseCard course={course} variant="compact" onPress={handleCoursePress} />
              </AnimatedListItem>
            ))
          ) : (
            <AnimatedListItem index={1}>
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No courses in progress</Text>
              </View>
            </AnimatedListItem>
          )}

          <AnimatedListItem index={3}>
            <ActionButton
              icon="book-outline"
              text="View All Courses"
              backgroundColor={theme.colors.primary}
              navigateTo="Learn"
            />
          </AnimatedListItem>

          <AnimatedListItem index={4}>
            <ActionButton
              icon="bulb-outline"
              text="Ask AI Tutor"
              backgroundColor={theme.colors.info}
              navigateTo="AITutor"
            />
          </AnimatedListItem>
        </View>

        <AnimatedListItem index={5}>
          <StudyStreakCard streak={streakData} showAchievements={true} />
        </AnimatedListItem>

        <AnimatedListItem index={6}>
          <TodaysPlanCard navigateTo="Plan" />
        </AnimatedListItem>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Toast Notification */}
      {showToast && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
          <TouchableOpacity style={styles.toastCloseButton} onPress={() => setShowToast(false)}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

