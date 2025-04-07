"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { useTheme } from "../context/ThemeContext"
import { fontSizes, spacing, typography } from "../styles/theme"
import ProgressBar from "../components/shared/ProgressBar"
import LessonCard from "../components/learn/LessonCard"
import Section from "../components/shared/Section"
import { Heading, Paragraph } from "../components/shared/Typography"

const CourseDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { course } = route.params || {}
  const { theme } = useTheme()
  const [lessons, setLessons] = useState([])

  // Add detailed logging of route params and course data
  useEffect(() => {
    console.log("CourseDetailScreen - route.params:", route.params)
    console.log("CourseDetailScreen - course data:", course)

    // Log individual course properties if course exists
    if (course) {
      console.log("CourseDetailScreen - course.id:", course.id)
      console.log("CourseDetailScreen - course.title:", course.title)
      console.log("CourseDetailScreen - course.category:", course.category)
      console.log("CourseDetailScreen - course.level:", course.level)
      console.log("CourseDetailScreen - course.progress:", course.progress)
    } else {
      console.log("CourseDetailScreen - WARNING: course is undefined or null")
      console.log("CourseDetailScreen - All route.params keys:", Object.keys(route.params || {}))
    }
  }, [route.params, course])

  useEffect(() => {
    // Fetch lessons for this course
    // This would normally come from an API
    setLessons([
      {
        id: "1",
        title: "Introduction to the Course",
        duration: "10 min",
        completed: true,
        type: "video",
      },
      {
        id: "2",
        title: "Basic Concepts and Terminology",
        duration: "15 min",
        completed: true,
        type: "reading",
      },
      {
        id: "3",
        title: "Practical Applications",
        duration: "20 min",
        completed: false,
        type: "interactive",
      },
      {
        id: "4",
        title: "Advanced Techniques",
        duration: "25 min",
        completed: false,
        type: "video",
      },
      {
        id: "5",
        title: "Final Project",
        duration: "30 min",
        completed: false,
        type: "project",
      },
    ])
  }, [])

  const handleLessonPress = (lesson) => {
    navigation.navigate("LessonDetail", { lesson, course })
  }

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Text style={{ color: theme.colors.text.primary }}>Course not found</Text>
      </View>
    )
  }

  const completedLessons = lessons.filter((lesson) => lesson.completed).length
  const totalLessons = lessons.length
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.colors.background.accent }]}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.courseInfo}>
          <View style={styles.iconContainer}>
            <Text style={styles.courseIcon}>{course.icon || "📚"}</Text>
          </View>

          <View style={styles.titleContainer}>
            <Heading size="lg">{course.title}</Heading>
            <Paragraph color="secondary">
              {course.category} • {course.level}
            </Paragraph>

            <View style={styles.progressContainer}>
              <ProgressBar
                progress={course.progress || progressPercentage}
                color={course.progressColor || theme.colors.primary}
                height={8}
              />
              <Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>
                {completedLessons}/{totalLessons} lessons completed
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      <Section title="About this course">
        <Paragraph>
          {course.description ||
            "This course will teach you the fundamentals and advanced concepts of the subject matter."}
        </Paragraph>
      </Section>

      {/* Lessons */}
      <Section title="Course Content" subtitle={`${totalLessons} lessons • ${calculateTotalDuration(lessons)} total`}>
        <View style={styles.lessonsList}>
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} onPress={() => handleLessonPress(lesson)} />
          ))}
        </View>
      </Section>

      {/* Instructor */}
      <Section title="Instructor">
        <View style={styles.instructorContainer}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.instructorImage} />
          <View style={styles.instructorInfo}>
            <Text style={[styles.instructorName, { color: theme.colors.text.primary }]}>Dr. Alex Johnson</Text>
            <Text style={[styles.instructorRole, { color: theme.colors.text.secondary }]}>
              Professor of Computer Science
            </Text>
          </View>
        </View>
      </Section>
    </ScrollView>
  )
}

// Helper function to calculate total duration
const calculateTotalDuration = (lessons) => {
  const totalMinutes = lessons.reduce((total, lesson) => {
    const duration = lesson.duration || ""
    const minutes = Number.parseInt(duration.split(" ")[0]) || 0
    return total + minutes
  }, 0)

  if (totalMinutes < 60) {
    return `${totalMinutes} min`
  } else {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  courseIcon: {
    fontSize: fontSizes.xxl,
  },
  titleContainer: {
    flex: 1,
  },
  progressContainer: {
    marginTop: spacing.md,
  },
  progressText: {
    marginTop: spacing.xs,
    fontSize: fontSizes.sm,
  },
  lessonsList: {
    marginTop: spacing.md,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: fontSizes.md,
    fontWeight: typography.fontWeight.bold,
  },
  instructorRole: {
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
  },
})

export default CourseDetailScreen

