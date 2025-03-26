"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import Header from "../components/layout/Header"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import { Feather } from "@expo/vector-icons"

// Mock data
const courseDetails = {
  id: "1",
  title: "Introduction to React Native",
  description:
    "Learn how to build native mobile apps using React Native. This course covers everything from the basics to advanced topics.",
  instructor: {
    name: "Sarah Johnson",
    title: "Senior Mobile Developer",
    image: "https://picsum.photos/100/100",
  },
  rating: 4.8,
  students: 1245,
  lessons: 24,
  duration: "12 hours",
  level: "Intermediate",
  category: "Development",
  image: "https://picsum.photos/400/200",
  price: 49.99,
  curriculum: [
    {
      id: "1",
      title: "Getting Started",
      lessons: [
        { id: "1", title: "Introduction to React Native", duration: "10 min", completed: true },
        { id: "2", title: "Setting Up Your Environment", duration: "15 min", completed: true },
        { id: "3", title: "Your First React Native App", duration: "20 min", completed: false },
      ],
    },
    {
      id: "2",
      title: "Core Concepts",
      lessons: [
        { id: "4", title: "Components and Props", duration: "25 min", completed: false },
        { id: "5", title: "State and Lifecycle", duration: "30 min", completed: false },
        { id: "6", title: "Handling User Input", duration: "20 min", completed: false },
      ],
    },
    {
      id: "3",
      title: "Styling and Layout",
      lessons: [
        { id: "7", title: "Flexbox in React Native", duration: "25 min", completed: false },
        { id: "8", title: "Styling Components", duration: "20 min", completed: false },
        { id: "9", title: "Responsive Design", duration: "30 min", completed: false },
      ],
    },
  ],
}

const CourseDetailScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const [expandedSections, setExpandedSections] = useState(["1"])

  // In a real app, you would fetch the course details based on the courseId
  // const { courseId } = route.params;
  const course = courseDetails

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const renderCurriculumSection = (section) => (
    <View key={section.id} style={styles.curriculumSection}>
      <TouchableOpacity
        onPress={() => toggleSection(section.id)}
        style={[styles.sectionHeader, { backgroundColor: theme.muted }]}
      >
        <Text style={[styles.sectionTitle, { color: theme.foreground }]}>{section.title}</Text>
        <Feather
          name={expandedSections.includes(section.id) ? "chevron-up" : "chevron-down"}
          size={20}
          color={theme.foreground}
        />
      </TouchableOpacity>

      {expandedSections.includes(section.id) && (
        <View style={styles.lessonsList}>
          {section.lessons.map((lesson) => (
            <TouchableOpacity key={lesson.id} style={[styles.lessonItem, { borderBottomColor: theme.border }]}>
              <View style={styles.lessonInfo}>
                <View style={styles.lessonTitleRow}>
                  {lesson.completed ? (
                    <View style={[styles.completedIndicator, { backgroundColor: theme.study.green }]} />
                  ) : (
                    <View style={[styles.incompleteIndicator, { borderColor: theme.border }]} />
                  )}
                  <Text style={[styles.lessonTitle, { color: theme.foreground }]}>{lesson.title}</Text>
                </View>
                <View style={styles.lessonMeta}>
                  <Feather name="clock" size={14} color={theme.mutedForeground} />
                  <Text style={[styles.lessonDuration, { color: theme.mutedForeground }]}>{lesson.duration}</Text>
                </View>
              </View>
              <Feather name="play-circle" size={24} color={theme.primary} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="" showBackButton showMenuButton={false} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.courseImageContainer}>
          <Image source={{ uri: course.image }} style={styles.courseImage} />
          <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]} style={styles.courseImageOverlay} />
          <View style={styles.courseImageContent}>
            <Badge color={theme.study.purple} style={styles.categoryBadge}>
              {course.category}
            </Badge>
            <Badge color={theme.study.blue} style={styles.levelBadge}>
              {course.level}
            </Badge>
          </View>
        </View>

        <View style={styles.courseInfo}>
          <Text style={[styles.courseTitle, { color: theme.foreground }]}>{course.title}</Text>

          <View style={styles.courseStats}>
            <View style={styles.statItem}>
              <Feather name="star" size={16} color={theme.study.yellow} />
              <Text style={[styles.statText, { color: theme.foreground }]}>
                {course.rating} ({course.students} students)
              </Text>
            </View>

            <View style={styles.statItem}>
              <Feather name="book-open" size={16} color={theme.mutedForeground} />
              <Text style={[styles.statText, { color: theme.mutedForeground }]}>{course.lessons} lessons</Text>
            </View>

            <View style={styles.statItem}>
              <Feather name="clock" size={16} color={theme.mutedForeground} />
              <Text style={[styles.statText, { color: theme.mutedForeground }]}>{course.duration}</Text>
            </View>
          </View>

          <View style={styles.instructorContainer}>
            <Image source={{ uri: course.instructor.image }} style={styles.instructorImage} />
            <View style={styles.instructorInfo}>
              <Text style={[styles.instructorName, { color: theme.foreground }]}>{course.instructor.name}</Text>
              <Text style={[styles.instructorTitle, { color: theme.mutedForeground }]}>{course.instructor.title}</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={[styles.sectionHeading, { color: theme.foreground }]}>About This Course</Text>
            <Text style={[styles.descriptionText, { color: theme.mutedForeground }]}>{course.description}</Text>
          </View>

          <View style={styles.curriculumContainer}>
            <Text style={[styles.sectionHeading, { color: theme.foreground }]}>Curriculum</Text>
            {course.curriculum.map(renderCurriculumSection)}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceLabel, { color: theme.mutedForeground }]}>Price</Text>
          <Text style={[styles.priceValue, { color: theme.foreground }]}>${course.price}</Text>
        </View>
        <Button gradient style={styles.enrollButton}>
          Enroll Now
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  courseImageContainer: {
    height: 200,
    position: "relative",
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
  courseImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  courseImageContent: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
  },
  categoryBadge: {
    marginRight: 8,
  },
  levelBadge: {},
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  statText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 6,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  instructorInfo: {},
  instructorName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  instructorTitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  curriculumContainer: {},
  curriculumSection: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  lessonsList: {
    marginTop: 8,
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  lessonInfo: {
    flex: 1,
    marginRight: 8,
  },
  lessonTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  completedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  incompleteIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 8,
  },
  lessonTitle: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  lessonDuration: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
  },
  priceContainer: {},
  priceLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  priceValue: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  enrollButton: {
    flex: 1,
    marginLeft: 16,
  },
})

export default CourseDetailScreen

