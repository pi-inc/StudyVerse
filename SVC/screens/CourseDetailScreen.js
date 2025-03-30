"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import ScreenLayout from "../components/shared/ScreenLayout"
import Card from "../components/shared/Card"
import Section from "../components/shared/Section"
import AnimatedFadeIn from "../components/shared/AnimatedFadeIn"
import { colors, spacing, typography, borderRadius } from "../styles/theme"
import { getCourseById } from "../services/courseData"
import { navigateToModule } from "../utils/navigation"

const CourseDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { courseId } = route.params || {}
  const [activeTab, setActiveTab] = useState("content")
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch course data based on courseId
  useEffect(() => {
    const fetchCourse = async () => {
      console.log("Fetching course with ID:", courseId)
      setLoading(true)
      try {
        const courseData = await getCourseById(courseId)
        console.log("CourseDetailScreen got course data:", courseData)

        if (!courseData) {
          console.error("No course data found for ID:", courseId)
          // Handle the case where no course data is found
          setCourse(null)
        } else {
          setCourse(courseData)
        }
      } catch (error) {
        console.error("Error fetching course data:", error)
        // Handle the error case
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleContinueLearning = () => {
    // Navigate to the first incomplete module
    const firstIncompleteModule = course?.modules.find((module) => !module.completed)
    if (firstIncompleteModule) {
      navigateToModule(navigation, course.id, firstIncompleteModule.id)
    }
  }

  const handleToggleFavorite = () => {
    // Toggle favorite status
    setCourse((prev) => ({
      ...prev,
      isFavorite: !prev.isFavorite,
    }))
  }

  const handleModulePress = (moduleId) => {
    navigateToModule(navigation, course.id, moduleId)
  }

  if (loading || !course) {
    return (
      <ScreenLayout showBack={true} onBackPress={handleBackPress}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading course...</Text>
        </View>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout showBack={true} onBackPress={handleBackPress}>
      <AnimatedFadeIn>
        {/* Course Header */}
        <Card variant="flat">
          <Text style={styles.breadcrumb}>Courses &gt; {course.title}</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <TouchableOpacity onPress={handleToggleFavorite}>
              <Ionicons
                name={course.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={course.isFavorite ? colors.error : colors.text.tertiary}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.courseDescription}>{course.description}</Text>

          <View style={styles.courseMetaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{course.level}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={colors.text.tertiary} />
              <Text style={styles.metaLabel}>{course.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={16} color={colors.text.tertiary} />
              <Text style={styles.metaLabel}>{course.enrolled} enrolled</Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{course.rating} rating</Text>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Your progress</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
            </View>
            <Text style={styles.progressPercentage}>{course.progress}%</Text>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinueLearning}>
            <Text style={styles.continueButtonText}>Continue Learning</Text>
          </TouchableOpacity>
        </Card>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "content" && styles.activeTab]}
            onPress={() => setActiveTab("content")}
          >
            <Text style={[styles.tabText, activeTab === "content" && styles.activeTabText]}>Content</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "resources" && styles.activeTab]}
            onPress={() => setActiveTab("resources")}
          >
            <Text style={[styles.tabText, activeTab === "resources" && styles.activeTabText]}>Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "discussions" && styles.activeTab]}
            onPress={() => setActiveTab("discussions")}
          >
            <Text style={[styles.tabText, activeTab === "discussions" && styles.activeTabText]}>Discussions</Text>
          </TouchableOpacity>
        </View>

        {/* Course Modules */}
        <Section title="Course Modules" showDivider={false}>
          {course.modules.map((module, index) => (
            <Card key={module.id} variant="flat" style={styles.moduleItem} onPress={() => handleModulePress(module.id)}>
              <View style={styles.moduleNumberContainer}>
                <Text style={styles.moduleNumber}>{index + 1}</Text>
              </View>
              <View style={styles.moduleContent}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>
                <View style={styles.moduleMeta}>
                  <Ionicons name="time-outline" size={14} color={colors.text.tertiary} />
                  <Text style={styles.moduleTime}>{module.duration}</Text>
                </View>
              </View>
              <View style={styles.moduleStatus}>
                {module.completed ? (
                  <View style={styles.completedIcon}>
                    <Ionicons name="checkmark" size={16} color={colors.text.primary} />
                  </View>
                ) : null}
                <Ionicons name="chevron-down" size={20} color={colors.text.tertiary} />
              </View>
            </Card>
          ))}
        </Section>

        {/* Instructor Section */}
        <Section title="Instructor">
          <View style={styles.instructorContainer}>
            <View style={styles.instructorAvatar}>
              <Text style={styles.instructorInitials}>
                {course.instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{course.instructor.name}</Text>
              <Text style={styles.instructorTitle}>{course.instructor.title}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewProfileButton}>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </Section>

        {/* What You'll Learn Section */}
        <Section title="What You'll Learn">
          {course.learningOutcomes.map((outcome, index) => (
            <View key={index} style={styles.outcomeItem}>
              <View style={styles.outcomeCheckmark}>
                <Ionicons name="checkmark" size={16} color={colors.success} />
              </View>
              <Text style={styles.outcomeText}>{outcome}</Text>
            </View>
          ))}
        </Section>
      </AnimatedFadeIn>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.tertiary,
  },
  breadcrumb: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  courseTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.xs,
  },
  courseDescription: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    lineHeight: typography.lineHeights.normal,
    marginBottom: spacing.md,
  },
  courseMetaContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
  },
  metaLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginLeft: spacing.xs,
  },
  ratingContainer: {
    marginBottom: spacing.md,
  },
  ratingText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.warning,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background.input,
    borderRadius: 4,
    marginBottom: spacing.xs,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    textAlign: "right",
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.md,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.tertiary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.fontWeights.bold,
  },
  moduleItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  moduleNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background.input,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    marginTop: 2,
  },
  moduleNumber: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.tertiary,
  },
  moduleContent: {
    flex: 1,
    marginRight: spacing.xs,
  },
  moduleTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  moduleDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  moduleMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  moduleTime: {
    fontSize: typography.fontSizes.xs,
    color: colors.text.tertiary,
    marginLeft: spacing.xs,
  },
  moduleStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.xs,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.input,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  instructorInitials: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.tertiary,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  instructorTitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
  },
  viewProfileButton: {
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  viewProfileText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.bold,
  },
  outcomeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  outcomeCheckmark: {
    marginRight: spacing.xs,
    marginTop: 2,
  },
  outcomeText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
    flex: 1,
    lineHeight: typography.lineHeights.normal,
  },
})

export default CourseDetailScreen

