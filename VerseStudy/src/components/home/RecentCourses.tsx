"use client"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { useNavigation } from "@react-navigation/native"
import Card from "../ui/Card"
import { LinearGradient } from "expo-linear-gradient"

// Mock data
const recentCourses = [
  {
    id: "1",
    title: "Introduction to React Native",
    progress: 75,
    image: require("../../../assets/course1.png"),
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    progress: 45,
    image: require("../../../assets/course2.png"),
    lastAccessed: "Yesterday",
  },
  {
    id: "3",
    title: "UI/UX Design Principles",
    progress: 20,
    image: require("../../../assets/course3.png"),
    lastAccessed: "3 days ago",
  },
]

const RecentCourses = () => {
  const { theme } = useTheme()
  const navigation = useNavigation()

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("CourseDetail", { courseId: item.id })}
      style={styles.courseItem}
    >
      <Card style={styles.courseCard}>
        <View style={styles.courseImageContainer}>
          <Image source={item.image} style={styles.courseImage} />
          <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]} style={styles.courseImageOverlay} />
          <Text style={styles.courseTitle}>{item.title}</Text>
        </View>

        <View style={styles.courseInfo}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.muted }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.progress}%`,
                    backgroundColor: getProgressColor(item.progress, theme),
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.mutedForeground }]}>{item.progress}% complete</Text>
          </View>

          <Text style={[styles.lastAccessed, { color: theme.mutedForeground }]}>
            Last accessed: {item.lastAccessed}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  )

  const getProgressColor = (progress, theme) => {
    if (progress < 30) return theme.study.red
    if (progress < 70) return theme.study.yellow
    return theme.study.green
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.foreground }]}>Continue Learning</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: theme.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  viewAll: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  coursesList: {
    paddingRight: 16,
  },
  courseItem: {
    width: 280,
    marginRight: 12,
  },
  courseCard: {
    padding: 0,
    overflow: "hidden",
  },
  courseImageContainer: {
    height: 140,
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
    height: 70,
  },
  courseTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    color: "white",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  courseInfo: {
    padding: 12,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  lastAccessed: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
})

export default RecentCourses

