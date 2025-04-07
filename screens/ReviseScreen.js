"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { useThemedStyles } from "../hooks/useThemedStyles"
import Header from "../components/shared/Header"
import { RevisionFlashcard } from "../components/revise/RevisionFlashcard"
import { RevisionModeSelector } from "../components/revise/RevisionModeSelector"
import { RevisionTopicCard } from "../components/revise/RevisionTopicCard"
import { RevisionActionButton } from "../components/revise/RevisionActionButton"

const ReviseScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [revisionMode, setRevisionMode] = useState("flashcards") // flashcards or quiz

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current

  // Sample data
  const topics = [
    {
      id: 1,
      title: "Linked Lists",
      proficiency: "Proficient",
      proficiencyColor: "#10b981",
      dueStatus: "Due Now",
      lastReviewed: "5 days ago",
      cards: [
        {
          id: 1,
          question: "What is an array?",
          answer: "A collection of elements stored at contiguous memory locations.",
          difficulty: "Easy",
        },
        {
          id: 2,
          question: "What is a linked list?",
          answer:
            "A linear data structure where elements are not stored at contiguous locations but connected using pointers.",
          difficulty: "Medium",
        },
        {
          id: 3,
          question: "What is the difference between singly and doubly linked lists?",
          answer:
            "A singly linked list has nodes with a data field and a reference to the next node, while a doubly linked list has nodes with a data field and references to both next and previous nodes.",
          difficulty: "Medium",
        },
      ],
    },
    {
      id: 2,
      title: "Queues",
      proficiency: "Intermediate",
      proficiencyColor: "#3b82f6",
      dueStatus: "Due Now",
      lastReviewed: "7 days ago",
      cards: [
        {
          id: 1,
          question: "What is a queue?",
          answer: "A linear data structure that follows the First In First Out (FIFO) principle.",
          difficulty: "Easy",
        },
        {
          id: 2,
          question: "What are the main operations of a queue?",
          answer: "Enqueue (add to rear) and Dequeue (remove from front).",
          difficulty: "Medium",
        },
      ],
    },
  ]

  const [currentCards, setCurrentCards] = useState([])

  useEffect(() => {
    // Animate in the content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  useEffect(() => {
    // Set cards when a topic is selected
    if (selectedTopic) {
      const topic = topics.find((t) => t.id === selectedTopic)
      if (topic) {
        setCurrentCards(topic.cards)
        setCurrentCardIndex(0)
        setShowAnswer(false)
      }
    } else {
      setCurrentCards([])
    }
  }, [selectedTopic])

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId)
  }

  const handleNextCard = () => {
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setShowAnswer(false)
    }
  }

  const handleSkip = () => {
    // Skip to next card or topic
    if (currentCardIndex < currentCards.length - 1) {
      handleNextCard()
    } else {
      // Move to next topic or finish
      const currentTopicIndex = topics.findIndex((t) => t.id === selectedTopic)
      if (currentTopicIndex < topics.length - 1) {
        setSelectedTopic(topics[currentTopicIndex + 1].id)
      } else {
        setSelectedTopic(null)
      }
    }
  }

  const handleFlip = () => {
    setShowAnswer(!showAnswer)
  }

  const handleModeChange = (mode) => {
    setRevisionMode(mode)
  }

  // Use themed styles
  const styles = useThemedStyles(createStyles)

  return (
    <View style={styles.container}>
      <Header showBack={true} title="Revision" />

      <Animated.ScrollView
        style={[
          styles.scrollView,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="search" size={18} color={theme.colors.text.secondary} />
            <Text style={styles.filterText}>Data Structures</Text>
            <Ionicons name="chevron-down" size={18} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Due for Review Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>Due for Review</Text>
            <Text style={styles.summaryDescription}>
              {topics.length} topics need your attention based on spaced repetition
            </Text>
          </View>
          <TouchableOpacity style={styles.reviewNowButton}>
            <Text style={styles.reviewNowText}>Review Now</Text>
          </TouchableOpacity>
        </View>

        {/* Topics Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Topics Due for Review</Text>
          <TouchableOpacity>
            <Text style={styles.showAllText}>Show All</Text>
          </TouchableOpacity>
        </View>

        {/* Topic Cards */}
        {!selectedTopic && (
          <View style={styles.topicCardsContainer}>
            {topics.map((topic) => (
              <RevisionTopicCard key={topic.id} topic={topic} onPress={() => handleTopicSelect(topic.id)} />
            ))}
          </View>
        )}

        {/* Flashcard Section */}
        {selectedTopic && currentCards.length > 0 && (
          <View style={styles.flashcardSection}>
            {/* Mode Selector */}
            <RevisionModeSelector selectedMode={revisionMode} onModeChange={handleModeChange} />

            {/* Current Card */}
            <RevisionFlashcard
              card={currentCards[currentCardIndex]}
              showAnswer={showAnswer}
              onFlip={handleFlip}
              cardIndex={currentCardIndex}
              totalCards={currentCards.length}
            />

            {/* Navigation Controls */}
            <View style={styles.navigationControls}>
              <View style={styles.navigationInfo}>
                <Text style={styles.lastReviewed}>
                  Last reviewed: {topics.find((t) => t.id === selectedTopic)?.lastReviewed}
                </Text>
                <Text style={styles.nextReview}>Next review: Today</Text>
              </View>

              <View style={styles.navigationButtons}>
                <TouchableOpacity style={styles.navButton} onPress={handlePrevCard} disabled={currentCardIndex === 0}>
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={currentCardIndex === 0 ? theme.colors.text.tertiary : theme.colors.text.secondary}
                  />
                  <Text style={[styles.navButtonText, currentCardIndex === 0 && styles.navButtonDisabled]}>Prev</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navButton, styles.skipButton]} onPress={handleSkip}>
                  <Text style={styles.skipButtonText}>Skip</Text>
                  <Ionicons name="chevron-forward" size={24} color={theme.colors.text.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <RevisionActionButton />
    </View>
  )
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    filterContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background.card,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    filterText: {
      color: theme.colors.text.primary,
      marginHorizontal: 8,
      fontSize: 14,
    },
    summaryCard: {
      backgroundColor: theme.colors.background.accent,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    summaryContent: {
      flex: 1,
      marginRight: 12,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.warning,
      marginBottom: 4,
    },
    summaryDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
    reviewNowButton: {
      backgroundColor: theme.colors.background.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.warning,
    },
    reviewNowText: {
      color: theme.colors.warning,
      fontWeight: "bold",
      fontSize: 14,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text.primary,
    },
    showAllText: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    topicCardsContainer: {
      paddingHorizontal: 16,
    },
    flashcardSection: {
      paddingHorizontal: 16,
    },
    navigationControls: {
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.light,
      paddingTop: 16,
    },
    navigationInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    lastReviewed: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
    },
    nextReview: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
    },
    navigationButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    navButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      flex: 1,
    },
    navButtonText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginLeft: 4,
    },
    navButtonDisabled: {
      color: theme.colors.text.tertiary,
    },
    skipButton: {
      justifyContent: "flex-end",
    },
    skipButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text.primary,
      marginRight: 4,
    },
  })

export default ReviseScreen

