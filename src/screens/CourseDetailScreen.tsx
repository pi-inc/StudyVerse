"use client"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { type RouteProp, useRoute } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../context/ThemeContext"
import { Button } from "../components/Button"
import { Badge } from "../components/Badge"
import { Card, CardContent } from "../components/Card"
import type { RootStackParamList } from "../navigation"
import { useToast } from "../context/ToastContext"

type CourseDetailRouteProp = RouteProp<RootStackParamList, "CourseDetail">

const CourseDetailScreen = () => {
  const route = useRoute<CourseDetailRouteProp>()
  const { courseId } = route.params
  const { theme } = useTheme()
  const { showToast } = useToast()

  // Mock course data
  const course = {
    id: courseId,
    title: "Data Structures and Algorithms",
    description:
      "Master essential data structures and algorithms with practical examples and coding exercises. This comprehensive course covers arrays, linked lists, trees, graphs, sorting algorithms, and more.",
    level: "Intermediate",
    duration: "10 weeks",
    category: "Computer Science",
    instructor: "Dr. Sarah Chen",
    rating: 4.7,
    students: 980,
    lessons: 24,
    progress: 30,
    topics: [
      "Introduction to Data Structures",
      "Arrays and Strings",
      "Linked Lists",
      "Stacks and Queues",
      "Trees and Graphs",
      "Sorting Algorithms",
      "Searching Algorithms",
      "Dynamic Programming",
    ],
  }

  const handleEnroll = () => {
    showToast("Successfully enrolled in course!", { type: "success" })
  }

  const handleContinue = () => {
    showToast("Continuing from where you left off", { type: "info" })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[theme.studyPurple, theme.studyBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <View style={styles.courseHeader}>
            <Text style={styles.courseIcon}>🧮</Text>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <View style={styles.courseStats}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={16} color="white" />
                <Text style={styles.statText}>{course.rating}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="people-outline" size={16} color="white" />
                <Text style={styles.statText}>{course.students} students</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="white" />
                <Text style={styles.statText}>{course.duration}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Card style={styles.infoCard}>
            <CardContent>
              <Text style={[styles.sectionTitle, { color: theme.foreground }]}>About this course</Text>
              <Text style={[styles.description, { color: theme.foreground }]}>{course.description}</Text>

              <View style={styles.tags}>
                <Badge label={course.category} variant="outline" color={theme.studyBlue} style={styles.tag} />
                <Badge label={course.level} variant="outline" color={theme.studyPurple} style={styles.tag} />
                <Badge
                  label={`${course.lessons} lessons`}
                  variant="outline"
                  color={theme.studyTeal}
                  style={styles.tag}
                />
              </View>

              <View style={styles.instructorContainer}>
                <Text style={[styles.instructorLabel, { color: theme.mutedForeground }]}>Instructor</Text>
                <View style={styles.instructor}>
                  <View style={[styles.instructorAvatar, { backgroundColor: theme.studyPurple }]}>
                    <Text style={styles.instructorInitials}>SC</Text>
                  </View>
                  <Text style={[styles.instructorName, { color: theme.foreground }]}>{course.instructor}</Text>
                </View>
              </View>

              {course.progress > 0 && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={[styles.progressLabel, { color: theme.foreground }]}>Your Progress</Text>
                    <Text style={[styles.progressPercent, { color: theme.foreground }]}>{course.progress}%</Text>
                  </View>
                  <View style={[styles.progressBar, { backgroundColor: theme.muted }]}>
                    <View
                      style={[
                        styles.progressIndicator,
                        { width: `${course.progress}%`, backgroundColor: theme.studyBlue },
                      ]}
                    />
                  </View>
                </View>
              )}

              <View style={styles.actionButtons}>
                {course.progress > 0 ? (
                  <Button
                    title="Continue Learning"
                    variant="gradient"
                    icon={<Ionicons name="play" size={16} color="white" />}
                    onPress={handleContinue}
                  />
                ) : (
                  <Button
                    title="Enroll Now"
                    variant="gradient"
                    icon={<Ionicons name="add-circle-outline" size={16} color="white" />}
                    onPress={handleEnroll}
                  />
                )}
              </View>
            </CardContent>
          </Card>

          <Text style={[styles.sectionTitle, { color: theme.foreground, marginTop: 16 }]}>Course Content</Text>
          <Card style={styles.topicsCard}>
            <CardContent>
              <View style={styles.topicsHeader}>
                <Text style={[styles.topicsCount, { color: theme.foreground }]}>
                  {course.topics.length} topics • {course.lessons} lessons
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.expandAll, { color: theme.primary }]}>Expand all</Text>
                </TouchableOpacity>
              </View>

              {course.topics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.topicItem,
                    index < course.topics.length - 1 && [styles.topicBorder, { borderBottomColor: theme.border }],
                  ]}
                >
                  <View style={styles.topicContent}>
                    <View style={[styles.topicIcon, { backgroundColor: `${theme.studyBlue}20` }]}>
                      <Text style={[styles.topicNumber, { color: theme.studyBlue }]}>{index + 1}</Text>
                    </View>
                    <Text style={[styles.topicTitle, { color: theme.foreground }]}>{topic}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
                </TouchableOpacity>
              ))}
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  courseHeader: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  courseIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  statText: {
    color: "white",
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  content: {
    padding: 16,
    marginTop: -20,
  },
  infoCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    lineHeight: 22,
    marginBottom: 16,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  instructorContainer: {
    marginBottom: 16,
  },
  instructorLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  instructor: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  instructorInitials: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  instructorName: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  progressPercent: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressIndicator: {
    height: "100%",
    borderRadius: 4,
  },
  actionButtons: {
    marginTop: 8,
  },
  topicsCard: {
    marginBottom: 16,
  },
  topicsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  topicsCount: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  expandAll: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  topicItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  topicBorder: {
    borderBottomWidth: 1,
  },
  topicContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  topicIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  topicNumber: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  topicTitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
})

export default CourseDetailScreen

