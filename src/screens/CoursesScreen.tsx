"use client"

import { useState } from "react"
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../context/ThemeContext"
import { Badge } from "../components/Badge"
import type { RootStackParamList } from "../navigation"

type CoursesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const CoursesScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation<CoursesScreenNavigationProp>()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popular")

  // Mock data
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Learn the basics of computer science and programming",
      level: "Beginner",
      duration: "8 weeks",
      category: "Computer Science",
      icon: "💻",
      rating: 4.8,
      students: 1250,
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master essential data structures and algorithms",
      level: "Intermediate",
      duration: "10 weeks",
      category: "Computer Science",
      icon: "🧮",
      rating: 4.7,
      students: 980,
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      description: "Understand the core concepts of machine learning",
      level: "Advanced",
      duration: "12 weeks",
      category: "Data Science",
      icon: "🤖",
      rating: 4.9,
      students: 1540,
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      description: "Build modern web applications from scratch",
      level: "Beginner to Intermediate",
      duration: "14 weeks",
      category: "Web Development",
      icon: "🌐",
      rating: 4.6,
      students: 2100,
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Create native mobile applications for iOS and Android",
      level: "Intermediate",
      duration: "10 weeks",
      category: "Mobile Development",
      icon: "📱",
      rating: 4.5,
      students: 870,
    },
  ]

  const categories = Array.from(new Set(courses.map((c) => c.category)))
  const levels = Array.from(new Set(courses.map((c) => c.level)))

  const filteredCourses = courses.filter((course) => {
    // Search filter
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)

    // Level filter
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level)

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") return b.students - a.students
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "newest") return b.id - a.id
    return 0
  })

  const renderCourseItem = ({ item }: { item: (typeof courses)[0] }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate("CourseDetail", { courseId: item.id })}
    >
      <LinearGradient
        colors={[theme.studyPurple, theme.studyBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.courseGradient}
      />
      <View style={[styles.courseContent, { backgroundColor: theme.card }]}>
        <Text style={styles.courseIcon}>{item.icon}</Text>
        <View style={styles.courseInfo}>
          <Text style={[styles.courseTitle, { color: theme.foreground }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.courseDescription, { color: theme.mutedForeground }]} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.courseDetails}>
            <Badge label={item.category} variant="outline" color={theme.studyBlue} style={styles.courseBadge} />
            <Badge label={item.level} variant="outline" color={theme.studyPurple} style={styles.courseBadge} />
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color={theme.studyYellow} />
              <Text style={[styles.ratingText, { color: theme.foreground }]}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={theme.mutedForeground} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.foreground, backgroundColor: theme.muted }]}
            placeholder="Search courses..."
            placeholderTextColor={theme.mutedForeground}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm("")} style={styles.clearButton}>
              <Ionicons name="close-circle" size={16} color={theme.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.muted }]}>
          <Ionicons name="filter-outline" size={20} color={theme.foreground} />
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <Text style={[styles.resultsText, { color: theme.mutedForeground }]}>
          {sortedCourses.length} {sortedCourses.length === 1 ? "course" : "courses"} found
        </Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === "popular" && [styles.activeSortButton, { backgroundColor: `${theme.primary}20` }],
            ]}
            onPress={() => setSortBy("popular")}
          >
            <Text
              style={[styles.sortButtonText, { color: sortBy === "popular" ? theme.primary : theme.mutedForeground }]}
            >
              Popular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === "rating" && [styles.activeSortButton, { backgroundColor: `${theme.primary}20` }],
            ]}
            onPress={() => setSortBy("rating")}
          >
            <Text
              style={[styles.sortButtonText, { color: sortBy === "rating" ? theme.primary : theme.mutedForeground }]}
            >
              Highest Rated
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === "newest" && [styles.activeSortButton, { backgroundColor: `${theme.primary}20` }],
            ]}
            onPress={() => setSortBy("newest")}
          >
            <Text
              style={[styles.sortButtonText, { color: sortBy === "newest" ? theme.primary : theme.mutedForeground }]}
            >
              Newest
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sortedCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.coursesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={48} color={theme.mutedForeground} style={styles.emptyIcon} />
            <Text style={[styles.emptyText, { color: theme.foreground }]}>No courses found</Text>
            <Text style={[styles.emptySubtext, { color: theme.mutedForeground }]}>Try adjusting your filters</Text>
            {searchTerm.length > 0 && (
              <TouchableOpacity
                style={[styles.clearFiltersButton, { backgroundColor: theme.primary }]}
                onPress={() => setSearchTerm("")}
              >
                <Text style={[styles.clearFiltersText, { color: theme.primaryForeground }]}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("CourseDetail", { courseId: 0 })}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 40,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  clearButton: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  sortButtons: {
    flexDirection: "row",
  },
  sortButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  activeSortButton: {
    borderRadius: 16,
  },
  sortButtonText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  coursesList: {
    padding: 16,
    paddingBottom: 80,
  },
  courseCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseGradient: {
    height: 4,
    width: "100%",
  },
  courseContent: {
    flexDirection: "row",
    padding: 16,
  },
  courseIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 8,
  },
  courseDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  courseBadge: {
    marginRight: 8,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 16,
    textAlign: "center",
  },
  clearFiltersButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clearFiltersText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
})

export default CoursesScreen

