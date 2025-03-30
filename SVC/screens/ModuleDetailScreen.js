"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import Header from "../components/shared/Header"
import { getCourseById } from "../services/courseData"

const ModuleDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { courseId, moduleId } = route.params || {}
  const [module, setModule] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current

  // Fetch module data based on courseId and moduleId
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        console.log("ModuleDetailScreen: Fetching data for courseId:", courseId, "moduleId:", moduleId)
        // In a real app, this would be an API call
        const courseData = await getCourseById(courseId)
        console.log("ModuleDetailScreen got course data:", courseData)

        if (!courseData) {
          console.error("No course data found for ID:", courseId)
          setCourse(null)
          setModule(null)
        } else {
          setCourse(courseData)
          const moduleData = courseData.modules.find((m) => m.id === moduleId)
          console.log("ModuleDetailScreen found module:", moduleData)
          setModule(moduleData || null)
        }
      } catch (error) {
        console.error("Error fetching module data:", error)
        setCourse(null)
        setModule(null)
      } finally {
        setLoading(false)
      }

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }

    fetchData()
  }, [courseId, moduleId])

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleMarkComplete = () => {
    // Mark module as completed
    setModule((prev) => ({
      ...prev,
      completed: true,
    }))
  }

  const handleNextModule = () => {
    if (!course) return

    const currentIndex = course.modules.findIndex((m) => m.id === moduleId)
    if (currentIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentIndex + 1]
      navigation.replace("ModuleDetail", {
        courseId: courseId,
        moduleId: nextModule.id,
      })
    }
  }

  if (loading || !module || !course) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBack={true} onBackPress={handleBackPress} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading module...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} onBackPress={handleBackPress} />
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Module Header */}
          <View style={styles.moduleHeader}>
            <Text style={styles.breadcrumb}>
              {course.title} &gt; Module {course.modules.findIndex((m) => m.id === moduleId) + 1}
            </Text>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription}>{module.description}</Text>

            <View style={styles.moduleMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color="#6b7280" />
                <Text style={styles.metaLabel}>{module.duration}</Text>
              </View>
              {module.completed && (
                <View style={styles.completedBadge}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>
          </View>

          {/* Module Content */}
          <View style={styles.moduleContent}>
            <Text style={styles.contentTitle}>Module Content</Text>

            {/* This would be the actual module content */}
            <View style={styles.contentPlaceholder}>
              <Text style={styles.placeholderText}>
                This is where the actual module content would be displayed, including videos, text lessons, interactive
                elements, etc.
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {!module.completed ? (
                <TouchableOpacity style={styles.markCompleteButton} onPress={handleMarkComplete}>
                  <Text style={styles.markCompleteText}>Mark as Complete</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.nextModuleButton} onPress={handleNextModule}>
                  <Text style={styles.nextModuleText}>Next Module</Text>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Navigation */}
          <View style={styles.moduleNavigation}>
            <TouchableOpacity
              style={styles.backToCourseButton}
              onPress={() => navigation.navigate("CourseDetail", { courseId })}
            >
              <Ionicons name="arrow-back" size={20} color="#6b7280" />
              <Text style={styles.backToCourseText}>Back to Course</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
  moduleHeader: {
    marginBottom: 24,
  },
  breadcrumb: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 16,
  },
  moduleMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
  },
  moduleContent: {
    marginBottom: 24,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  contentPlaceholder: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  actionButtons: {
    marginBottom: 24,
  },
  markCompleteButton: {
    backgroundColor: "#10b981",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  markCompleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextModuleButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  nextModuleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  moduleNavigation: {
    marginBottom: 40,
  },
  backToCourseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  backToCourseText: {
    fontSize: 16,
    color: "#6b7280",
    marginLeft: 8,
  },
})

export default ModuleDetailScreen

