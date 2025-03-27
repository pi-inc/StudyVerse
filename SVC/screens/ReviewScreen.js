"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Animated } from "react-native"
import { Feather } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import DueForReviewCard from "../components/review/DueForReviewCard"
import TopicCard from "../components/review/TopicCard"
import ReviewTabs from "../components/review/ReviewTabs"
import FlashcardView from "../components/review/FlashcardView"
import SectionHeader from "../components/shared/SectionHeader"
import AnimatedListItem from "../components/shared/AnimatedListItem"

const ReviewScreen = () => {
  const [activeTab, setActiveTab] = useState("flashcards")
  const [currentSubject, setCurrentSubject] = useState("Data Structures")

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
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

  const topicsDueForReview = [
    {
      id: 1,
      title: "Linked Lists",
      proficiencyLevel: "Proficient",
      proficiencyColor: "#10b981",
      status: "Due Now",
      lastReviewed: "Last: 5 days ago",
    },
    {
      id: 2,
      title: "Queues",
      proficiencyLevel: "Intermediate",
      proficiencyColor: "#3b82f6",
      status: "Due Now",
      lastReviewed: "Last: 7 days ago",
    },
  ]

  const flashcards = [
    {
      id: 1,
      question: "What is an array?",
      answer:
        "An array is a data structure consisting of a collection of elements, each identified by at least one array index or key.",
      difficulty: "Easy",
      difficultyColor: "#10b981",
      dueDate: "Due Today",
    },
    {
      id: 2,
      question: "What is a linked list?",
      answer:
        "A linked list is a linear data structure where elements are not stored at contiguous memory locations. The elements are linked using pointers.",
      difficulty: "Medium",
      difficultyColor: "#f59e0b",
      dueDate: "Due Today",
    },
    {
      id: 3,
      question: "What is a queue?",
      answer:
        "A queue is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence and the removal from the other end.",
      difficulty: "Medium",
      difficultyColor: "#f59e0b",
      dueDate: "Due Today",
    },
  ]

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "flashcards":
        return (
          <AnimatedListItem index={4}>
            <FlashcardView flashcards={flashcards} />
          </AnimatedListItem>
        )
      case "quiz":
        return (
          <AnimatedListItem index={4}>
            <View style={styles.placeholderContainer}>
              <Feather name="help-circle" size={48} color="#6b7280" />
              <Text style={styles.placeholderText}>Quiz content coming soon</Text>
            </View>
          </AnimatedListItem>
        )
      case "concept-maps":
        return (
          <AnimatedListItem index={4}>
            <View style={styles.placeholderContainer}>
              <Feather name="share-2" size={48} color="#6b7280" />
              <Text style={styles.placeholderText}>Concept Maps coming soon</Text>
            </View>
          </AnimatedListItem>
        )
      case "summary-notes":
        return (
          <AnimatedListItem index={4}>
            <View style={styles.placeholderContainer}>
              <Feather name="file-text" size={48} color="#6b7280" />
              <Text style={styles.placeholderText}>Summary Notes coming soon</Text>
            </View>
          </AnimatedListItem>
        )
      default:
        return null
    }
  }

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Animated.View style={headerAnimStyle}>
          <Text style={styles.pageTitle}>Revise</Text>
        </Animated.View>

        <AnimatedListItem index={0}>
          <DueForReviewCard count={topicsDueForReview.length} />
        </AnimatedListItem>

        <View style={styles.topicsSection}>
          <AnimatedListItem index={1}>
            <SectionHeader title="Topics Due for Review" actionText="Show All" />
          </AnimatedListItem>

          {topicsDueForReview.map((topic, index) => (
            <AnimatedListItem key={topic.id} index={index + 2}>
              <TopicCard topic={topic} />
            </AnimatedListItem>
          ))}
        </View>

        <AnimatedListItem index={4}>
          <ReviewTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </AnimatedListItem>

        {renderTabContent()}

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
  topicsSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  placeholderContainer: {
    height: 300,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 18,
    color: "#9ca3af",
    marginTop: 16,
    textAlign: "center",
  },
  bottomPadding: {
    height: 100,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a78bfa",
    marginTop: 16,
    marginBottom: 16,
  },
})

export default ReviewScreen

