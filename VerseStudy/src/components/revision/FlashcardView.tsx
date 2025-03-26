"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"
import Button from "../ui/Button"
import { Feather } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

// Mock data
const flashcards = [
  {
    id: "1",
    question: "What is React Native?",
    answer: "React Native is a framework for building native mobile apps using JavaScript and React.",
  },
  {
    id: "2",
    question: "What is JSX?",
    answer:
      "JSX is a syntax extension for JavaScript that looks similar to XML or HTML and is used with React to describe what the UI should look like.",
  },
  {
    id: "3",
    question: "What are props in React?",
    answer:
      "Props (short for properties) are a way of passing data from parent to child components in React. They are read-only and help make components reusable.",
  },
  {
    id: "4",
    question: "What is state in React?",
    answer:
      "State is a built-in object that contains data or information about the component. A component's state can change over time, and when it does, the component re-renders.",
  },
]

const FlashcardView = () => {
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState([])

  const flipAnimation = useRef(new Animated.Value(0)).current
  const swipeAnimation = useRef(new Animated.Value(0)).current
  const nextCardScale = useRef(new Animated.Value(0.9)).current

  const flipCard = () => {
    setIsFlipped(!isFlipped)
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start()
  }

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      Animated.timing(swipeAnimation, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex + 1)
        setIsFlipped(false)
        flipAnimation.setValue(0)
        swipeAnimation.setValue(0)
      })
    }
  }

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      Animated.timing(swipeAnimation, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex - 1)
        setIsFlipped(false)
        flipAnimation.setValue(0)
        swipeAnimation.setValue(0)
      })
    }
  }

  const markAsCompleted = () => {
    if (!completed.includes(flashcards[currentIndex].id)) {
      setCompleted([...completed, flashcards[currentIndex].id])
    }
    handleNextCard()
  }

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  })

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0.5, 0.5],
    outputRange: [1, 0],
  })

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0.5, 0.5],
    outputRange: [0, 1],
  })

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        swipeAnimation.setValue(gesture.dx)
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          handlePrevCard()
        } else if (gesture.dx < -120) {
          handleNextCard()
        } else {
          Animated.spring(swipeAnimation, {
            toValue: 0,
            friction: 4,
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  const renderProgressDots = () => {
    return (
      <View style={styles.progressDots}>
        {flashcards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              {
                backgroundColor:
                  index === currentIndex
                    ? theme.primary
                    : completed.includes(flashcards[index].id)
                      ? theme.study.green
                      : theme.border,
              },
            ]}
          />
        ))}
      </View>
    )
  }

  const currentCard = flashcards[currentIndex]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.foreground }]}>React Native Flashcards</Text>
        <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
          Card {currentIndex + 1} of {flashcards.length}
        </Text>
      </View>

      {renderProgressDots()}

      <View style={styles.cardContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.cardWrapper,
            {
              transform: [{ translateX: swipeAnimation }],
            },
          ]}
        >
          <TouchableOpacity activeOpacity={1} onPress={flipCard}>
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ rotateY: frontInterpolate }],
                  opacity: frontOpacity,
                },
              ]}
            >
              <Card style={[styles.flashcard, { backgroundColor: theme.card }]}>
                <Text style={[styles.questionLabel, { color: theme.mutedForeground }]}>Question:</Text>
                <Text style={[styles.questionText, { color: theme.foreground }]}>{currentCard.question}</Text>
                <View style={styles.flipHint}>
                  <Text style={[styles.flipHintText, { color: theme.mutedForeground }]}>Tap to flip</Text>
                  <Feather name="refresh-cw" size={16} color={theme.mutedForeground} />
                </View>
              </Card>
            </Animated.View>

            <Animated.View
              style={[
                styles.card,
                styles.cardBack,
                {
                  transform: [{ rotateY: backInterpolate }],
                  opacity: backOpacity,
                },
              ]}
            >
              <Card style={[styles.flashcard, { backgroundColor: theme.card }]}>
                <Text style={[styles.answerLabel, { color: theme.mutedForeground }]}>Answer:</Text>
                <Text style={[styles.answerText, { color: theme.foreground }]}>{currentCard.answer}</Text>
                <View style={styles.flipHint}>
                  <Text style={[styles.flipHintText, { color: theme.mutedForeground }]}>Tap to flip</Text>
                  <Feather name="refresh-cw" size={16} color={theme.mutedForeground} />
                </View>
              </Card>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.controls}>
        <Button
          variant="outline"
          onPress={handlePrevCard}
          disabled={currentIndex === 0}
          style={[styles.controlButton, { opacity: currentIndex === 0 ? 0.5 : 1 }]}
        >
          Previous
        </Button>

        <Button gradient onPress={markAsCompleted} style={styles.controlButton}>
          {completed.includes(currentCard.id) ? "Next Card" : "Mark as Known"}
        </Button>

        <Button
          variant="outline"
          onPress={handleNextCard}
          disabled={currentIndex === flashcards.length - 1}
          style={[styles.controlButton, { opacity: currentIndex === flashcards.length - 1 ? 0.5 : 1 }]}
        >
          Next
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    width: "100%",
    aspectRatio: 3 / 4,
    maxHeight: 400,
  },
  card: {
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flashcard: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  questionLabel: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 8,
  },
  questionText: {
    fontSize: 22,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  answerLabel: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 8,
  },
  answerText: {
    fontSize: 18,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 26,
  },
  flipHint: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  flipHintText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginRight: 4,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 4,
  },
})

export default FlashcardView

