"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../context/ThemeContext"
import Header from "../components/layout/Header"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import FeatureTourButton from "../components/improved-onboarding/FeatureTourButton"
import PageTransition from "../components/navigation/PageTransition"
import { Feather } from "@expo/vector-icons"

const CoursesScreen = ({ navigation }) => {
  const { theme } = useTheme()

  const courses = [
    {
      id: "1",
      title: "Introduction to Computer Science",
      progress: 75,
      lastAccessed: "2 days ago",
    },
    {
      id: "2",
      title: "Advanced Mathematics",
      progress: 45,
      lastAccessed: "1 week ago",
    },
    {
      id: "3",
      title: "Physics Fundamentals",
      progress: 90,
      lastAccessed: "Yesterday",
    },
    {
      id: "4",
      title: "History of Art",
      progress: 20,
      lastAccessed: "3 days ago",
    },
  ]

  const handleCoursePress = (courseId) => {
    navigation.navigate("CourseDetail", { courseId })
  }

  return (
    <PageTransition type="fade">
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="My Courses" />

        <View style={styles.tourButtonContainer}>
          <FeatureTourButton tourId="courses-tour" label="Take Courses Tour" />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.foreground }]}>Enrolled Courses</Text>
            <Button size="sm" variant="outline">
              Sort
            </Button>
          </View>

          {courses.map((course) => (
            <Card key={course.id} style={styles.courseCard}>
              <TouchableOpacity style={styles.courseContent} onPress={() => handleCoursePress(course.id)}>
                <View style={styles.courseInfo}>
                  <Text style={[styles.courseTitle, { color: theme.foreground }]}>{course.title}</Text>
                  <Text style={[styles.courseLastAccessed, { color: theme.mutedForeground }]}>
                    Last accessed: {course.lastAccessed}
                  </Text>
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: theme.muted }]}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            backgroundColor: theme.primary,
                            width: `${course.progress}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressText, { color: theme.mutedForeground }]}>{course.progress}%</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color={theme.mutedForeground} />
              </TouchableOpacity>
            </Card>
          ))}

          <Button style={styles.exploreButton} gradient>
            Explore More Courses
          </Button>
        </ScrollView>
      </SafeAreaView>
    </PageTransition>
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
    padding: 16,
    paddingBottom: 32,
  },
  tourButtonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  courseCard: {
    marginBottom: 12,
  },
  courseContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  courseLastAccessed: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    width: 36,
  },
  exploreButton: {
    marginTop: 16,
  },
})

export default CoursesScreen

