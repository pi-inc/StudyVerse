"use client"

import { useRef, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Animated, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import StudyStreakCard from "../components/shared/StudyStreakCard"
import CourseCard from "../components/home/CourseCard"
import ActionButton from "../components/home/ActionButton"
import TodaysPlanCard from "../components/home/TodaysPlanCard"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import SkipToContent from "../components/shared/SkipToContent"
import { useNavigation } from "@react-navigation/native"

export default function HomeScreen() {
  const navigation = useNavigation()
  const scrollViewRef = useRef(null)
  const streakData = {
    days: 7,
    label: "7 day streak",
    progress: 0.7,
  }

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(50)).current
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // Reduced from 800
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500, // Reduced from 800
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const handleAITutorPress = () => {
    navigation.navigate("AITutor")
    showToastMessage("Opening AI Tutor...")
  }

  const skipToContent = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 150, animated: true })
    }
  }

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  return (
    <SafeAreaView style={styles.container}>
      <SkipToContent onPress={skipToContent} />
      <Header />
      <ScrollView ref={scrollViewRef} style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
        <Animated.View style={[styles.welcomeSection, headerAnimStyle]}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <View style={styles.purpleDivider} />
        </Animated.View>

        <View style={styles.section}>
          <AnimatedListItem index={0}>
            <View style={styles.sectionHeader}>
              <Ionicons name="book-outline" size={24} color="#fff" />
              <Text style={styles.sectionTitle}>Continue Learning</Text>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={1}>
            <CourseCard
              title="Introduction to..."
              timeAgo="2 hours ago"
              progress={45}
              progressColor="#a78bfa"
              navigateTo="Learn"
              courseId="1"
            />
          </AnimatedListItem>

          <AnimatedListItem index={2}>
            <CourseCard
              title="Data Structures and..."
              timeAgo="Yesterday"
              progress={30}
              progressColor="#3b82f6"
              navigateTo="Learn"
              courseId="2"
            />
          </AnimatedListItem>

          <AnimatedListItem index={3}>
            <ActionButton icon="book-outline" text="View All Courses" backgroundColor="#7c3aed" navigateTo="Learn" />
          </AnimatedListItem>

          <AnimatedListItem index={4}>
            <ActionButton icon="bulb-outline" text="Ask AI Tutor" backgroundColor="#06b6d4" navigateTo="AITutor" />
          </AnimatedListItem>
        </View>

        <AnimatedListItem index={5}>
          <StudyStreakCard streak={streakData} showAchievements={true} />
        </AnimatedListItem>

        <AnimatedListItem index={6}>
          <TodaysPlanCard navigateTo="Plan" />
        </AnimatedListItem>
      </ScrollView>

      {/* Toast Notification */}
      {showToast && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
          <TouchableOpacity style={styles.toastCloseButton} onPress={() => setShowToast(false)}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
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
  welcomeSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a78bfa",
    marginBottom: 10,
  },
  purpleDivider: {
    height: 4,
    backgroundColor: "#7c3aed",
    borderRadius: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  toastContainer: {
    position: "absolute",
    bottom: 150,
    left: 20,
    right: 20,
    backgroundColor: "rgba(26, 26, 46, 0.9)",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  toastCloseButton: {
    padding: 4,
  },
  bottomPadding: {
    height: 100,
  },
})

