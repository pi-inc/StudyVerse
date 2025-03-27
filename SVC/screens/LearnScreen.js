"use client"

import { useRef, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import LearnTabs from "../components/learn/LearnTabs"
import CourseCard from "../components/learn/CourseCard"
import RecommendationCard from "../components/learn/RecommendationCard"
import SectionHeader from "../components/shared/SectionHeader"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import AITutorView from "../components/learn/AITutorView"

const LearnScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState("courses")
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current

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
  }, [])

  const continueLearningCourses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Learn the basics of computer science and...",
      progress: 65,
      progressColor: "#a78bfa",
      category: "Computer Science",
      level: "Beginner",
      rating: 4.8,
      icon: "💻",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master essential data structures and...",
      progress: 40,
      progressColor: "#3b82f6",
      category: "Computer Science",
      level: "Intermediate",
      rating: 4.7,
      icon: "📊",
    },
  ]

  const recommendedItems = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      type: "Course",
      description: "Based on your interests",
      iconBgColor: "#7c3aed",
      icon: "book-outline",
    },
    {
      id: 2,
      title: "Arrays and Linked Lists",
      type: "Revision",
      description: "Due for review",
      iconBgColor: "#3b82f6",
      icon: "git-branch", // This will now use Feather icon
    },
    {
      id: 3,
      title: "Need help with a concept?",
      type: "AI Tutor",
      description: "Ask the AI Tutor",
      iconBgColor: "#10b981",
      icon: "bulb-outline",
    },
  ]

  const exploreCourses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      description: "Understand the core concepts of machine...",
      category: "Data Science",
      level: "Advanced",
      rating: 4.9,
      icon: "🤖",
    },
  ]

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

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
          <View style={styles.gradientDivider} />
        </AnimatedListItem>

        {continueLearningCourses.map((course, index) => (
          <AnimatedListItem key={course.id} index={index + 3}>
            <CourseCard course={course} />
          </AnimatedListItem>
        ))}

        <AnimatedListItem index={5}>
          <SectionHeader title="Recommended for You" />
        </AnimatedListItem>

        <AnimatedListItem index={6}>
          <View style={styles.gradientDivider} />
        </AnimatedListItem>

        {recommendedItems.map((item, index) => (
          <AnimatedListItem key={item.id} index={index + 7}>
            <RecommendationCard item={item} />
          </AnimatedListItem>
        ))}

        <AnimatedListItem index={10}>
          <SectionHeader title="Explore Courses" />
        </AnimatedListItem>

        <AnimatedListItem index={11}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
              <TextInput style={styles.searchInput} placeholder="Search courses..." placeholderTextColor="#9ca3af" />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={18} color="#fff" />
              <Text style={styles.filterText}>Filter</Text>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </AnimatedListItem>

        <AnimatedListItem index={12}>
          <View style={styles.gradientDivider} />
        </AnimatedListItem>

        {exploreCourses.map((course, index) => (
          <AnimatedListItem key={course.id} index={index + 13}>
            <CourseCard course={course} isExplore />
          </AnimatedListItem>
        ))}

        <AnimatedListItem index={14}>
          <TouchableOpacity style={styles.browseAllButton}>
            <Ionicons name="book-outline" size={20} color="#fff" />
            <Text style={styles.browseAllText}>Browse All Courses</Text>
          </TouchableOpacity>
        </AnimatedListItem>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Animated.View style={headerAnimStyle}>
          <Text style={styles.pageTitle}>Learn</Text>
        </Animated.View>

        <AnimatedListItem index={0}>
          <LearnTabs onTabChange={handleTabChange} />
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
    backgroundColor: "#0a0a1a",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a78bfa",
    marginTop: 16,
    marginBottom: 16,
  },
  gradientDivider: {
    height: 4,
    backgroundColor: "#7c3aed",
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
    backgroundColor: "#1a1a2e",
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
    color: "#fff",
    fontSize: 14,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterText: {
    color: "#fff",
    marginHorizontal: 4,
    fontSize: 14,
  },
  browseAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7c3aed",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
  },
  browseAllText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
})

export default LearnScreen

