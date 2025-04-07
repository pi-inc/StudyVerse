"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Flashcard from "./Flashcard"
import { useTheme } from "../../context/ThemeContext"

const { width } = Dimensions.get("window")

const FlashcardView = ({ flashcards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const { theme } = useTheme()

  const currentCard = flashcards[currentCardIndex]

  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardInfoContainer}>
        <View style={[styles.cardCountContainer, { backgroundColor: theme.colors.background.accent }]}>
          <Text style={[styles.cardCountText, { color: theme.colors.primary }]}>
            Card {currentCardIndex + 1} of {flashcards.length}
          </Text>
        </View>

        <View style={[styles.difficultyContainer, { backgroundColor: "rgba(16, 185, 129, 0.2)" }]}>
          <Text style={[styles.difficultyText, { color: "#10b981" }]}>{currentCard.difficulty}</Text>
        </View>

        <View style={[styles.dueDateContainer, { backgroundColor: "rgba(245, 158, 11, 0.2)" }]}>
          <Ionicons name="calendar" size={16} color={theme.colors.warning} />
          <Text style={[styles.dueDateText, { color: theme.colors.warning }]}>{currentCard.dueDate}</Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border.light }]} />

      <Flashcard
        question={currentCard.question}
        answer={currentCard.answer}
        onSwipeLeft={goToNextCard}
        onSwipeRight={goToPrevCard}
      />

      <View
        style={[
          styles.reviewInfoContainer,
          {
            borderTopColor: theme.colors.border.light,
            borderBottomColor: theme.colors.border.light,
          },
        ]}
      >
        <Text style={[styles.reviewInfoText, { color: theme.colors.text.tertiary }]}>Last reviewed: 5 days ago</Text>
        <Text style={[styles.reviewInfoText, { color: theme.colors.text.tertiary }]}>Next review: Today</Text>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            {
              backgroundColor: theme.colors.background.secondary,
              borderColor: theme.colors.border.light,
            },
          ]}
          onPress={goToPrevCard}
          disabled={currentCardIndex === 0}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={currentCardIndex === 0 ? theme.colors.text.tertiary : theme.colors.text.primary}
          />
          <Text
            style={[
              styles.navigationButtonText,
              { color: theme.colors.text.primary },
              currentCardIndex === 0 && [styles.disabledButtonText, { color: theme.colors.text.tertiary }],
            ]}
          >
            Prev
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navigationButton,
            {
              backgroundColor: theme.colors.background.secondary,
              borderColor: theme.colors.border.light,
            },
          ]}
          onPress={goToNextCard}
        >
          <Text style={[styles.navigationButtonText, { color: theme.colors.text.primary }]}>Skip</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  cardInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardCountContainer: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  cardCountText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  difficultyContainer: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dueDateText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  reviewInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  reviewInfoText: {
    fontSize: 14,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  navigationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  disabledButtonText: {
    // color set dynamically
  },
})

export default FlashcardView

