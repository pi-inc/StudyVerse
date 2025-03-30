"use client"

import { useRef, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import LearnTabs from "../components/learn/LearnTabs"
import CourseCard from "../components/shared/CourseCard"
import RecommendationCard from "../components/learn/RecommendationCard"
import SectionHeader from "../components/shared/SectionHeader"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import AITutorView from "../components/learn/AITutorView"
import { spacing } from "../styles/theme"
import { navigateToCourse, navigateToAITutor } from "../utils/navigation"
import { getContinueLearningCourses, getRecommendedCourses, getExploreCourses } from "../services/courseData"
import { useTheme } from "../context/ThemeContext"

const LearnScreen = ({ route, navigation }) => {
  const { theme, isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("courses")
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current

  // Replace the direct assignments with useState and useEffect
  const [continueLearningCourses, setContinueLearningCourses] = useState([])
  const [recommendedItems, setRecommendedItems] = useState([])
  const [exploreCourses, setExploreCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we should open AI Tutor tab from navigation params
    if (route?.params?.openAITutor) {
      setActiveTab("ai-tutor")
      // Clear the parameter to avoid reopening on future renders
      if (route.params) {
        route.params.openAITutor = undefined
      }
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()

    try {
      console.log("LearnScreen: Fetching course data")
      const continueData = getContinueLearningCourses()
      const recommendData = getRecommendedCourses()
      const exploreData = getExploreCourses()

      console.log("LearnScreen got continueData:", continueData)
      console.log("LearnScreen got recommendData:", recommendData)
      console.log("LearnScreen got exploreData:", exploreData)

      setContinueLearningCourses(continueData || [])
      setRecommendedItems(recommendData || [])
      setExploreCourses(exploreData || [])
    } catch (error) {
      console.error("Error fetching course data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const handleCoursePress = (course) => {
    navigateToCourse(navigation, course.id)
  }

  const handleRecommendationPress = (item) => {
    console.log("Recommendation pressed:", item)
    if (item.type === "AI Tutor") {
      navigateToAITutor(navigation)
    } else if (item.courseId) {
      navigateToCourse(navigation, item.courseId)
    }
  }

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  console.log("LearnScreen rendering with activeTab:", activeTab)

  const renderContent = () => {
    if (activeTab === "ai-tutor") {
      return <AITutorView />
    }

    return (
      <>
        <AnimatedListItem index={1}>
          <SectionHeader title="Continue Learning" actionText="See all" />
        </AnimatedListItem>

        <AnimatedListItem index={2}>
          <View style={[styles.gradientDivider, { backgroundColor: theme.colors.primary }]} />
        </AnimatedListItem>

        {isLoading ? (
          <AnimatedListItem index={3}>
            <View style={[styles.loadingState, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>Loading courses...</Text>
            </View>
          </AnimatedListItem>
        ) : continueLearningCourses && continueLearningCourses.length > 0 ? (
          continueLearningCourses.map((course, index) => (
            <AnimatedListItem key={course.id} index={index + 3}>
              <CourseCard course={course} onPress={handleCoursePress} />
            </AnimatedListItem>
          ))
        ) : (
          <AnimatedListItem index={3}>
            <View style={[styles.emptyState, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
                No courses in progress
              </Text>
            </View>
          </AnimatedListItem>
        )}

        <AnimatedListItem index={5}>
          <SectionHeader title="Recommended for You" />
        </AnimatedListItem>

        <AnimatedListItem index={6}>
          <View style={[styles.gradientDivider, { backgroundColor: theme.colors.primary }]} />
        </AnimatedListItem>

        {isLoading ? (
          <AnimatedListItem index={7}>
            <View style={[styles.loadingState, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
                Loading recommendations...
              </Text>
            </View>
          </AnimatedListItem>
        ) : recommendedItems && recommendedItems.length > 0 ? (
          recommendedItems.map((item, index) => (
            <AnimatedListItem key={item.id} index={index + 7}>
              <RecommendationCard item={item} onPress={handleRecommendationPress} />
            </AnimatedListItem>
          ))
        ) : (
          <AnimatedListItem index={7}>
            <View style={[styles.emptyState, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
                No recommendations available
              </Text>
            </View>
          </AnimatedListItem>
        )}

        <AnimatedListItem index={10}>
          <SectionHeader title="Explore Courses" />
        </AnimatedListItem>

        <AnimatedListItem index={11}>
          <View style={styles.searchContainer}>
            <View style={[styles.searchInputContainer, { backgroundColor: theme.colors.background.card }]}>
              <Ionicons name="search" size={20} color={theme.colors.text.tertiary} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text.primary }]}
                placeholder="Search courses..."
                placeholderTextColor={theme.colors.text.tertiary}
              />
            </View>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.background.card }]}>
              <Ionicons name="filter" size={18} color={theme.colors.text.primary} />
              <Text style={[styles.filterText, { color: theme.colors.text.primary }]}>Filter</Text>
              <Ionicons name="chevron-down" size={16} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>
        </AnimatedListItem>

        <AnimatedListItem index={12}>
          <View style={[styles.gradientDivider, { backgroundColor: theme.colors.primary }]} />
        </AnimatedListItem>

        {isLoading ? (
          <AnimatedListItem index={13}>
            <View style={[styles.loadingState, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>Loading courses...</Text>
            </View>
          </AnimatedListItem>
        ) : exploreCourses && exploreCourses.length > 0 ? (
          exploreCourses.map((course, index) => (
            <AnimatedListItem key={course.id} index={index + 13}>
              <CourseCard course={course} showProgress={false} onPress={handleCoursePress} />
            </AnimatedListItem>
          ))
        ) : (
          <AnimatedListItem index={13}>
            <View style={[styles.emptyState, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>No courses to explore</Text>
            </View>
          </AnimatedListItem>
        )}

        <AnimatedListItem index={14}>
          <TouchableOpacity style={[styles.browseAllButton, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="book-outline" size={20} color={isDark ? "#fff" : "#fff"} />
            <Text style={[styles.browseAllText, { color: isDark ? "#fff" : "#fff" }]}>Browse All Courses</Text>
          </TouchableOpacity>
        </AnimatedListItem>
      </>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <Animated.View style={headerAnimStyle}>
          <Text style={[styles.pageTitle, { color: theme.colors.primaryLight }]}>Learn</Text>
        </Animated.View>

        <AnimatedListItem index={0}>
          <LearnTabs onTabChange={handleTabChange} activeTab={activeTab} />
        </AnimatedListItem>

        {renderContent()}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  scrollViewContent: {
    paddingBottom: 100, // Add padding to the bottom
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },
  gradientDivider: {
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterText: {
    marginHorizontal: 4,
    fontSize: 14,
  },
  browseAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
  },
  browseAllText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
  emptyState: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    height: 100,
  },
  emptyStateText: {
    fontSize: 16,
  },
  loadingState: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    height: 100,
  },
  loadingText: {
    fontSize: 16,
  },
})

export default LearnScreen

