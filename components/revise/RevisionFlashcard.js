"use client"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const { width } = Dimensions.get("window")

export const RevisionFlashcard = ({ card, showAnswer, onFlip, cardIndex, totalCards }) => {
  const { theme } = useTheme()

  if (!card) return null

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "#10b981" // green
      case "medium":
        return "#f59e0b" // amber
      case "hard":
        return "#ef4444" // red
      default:
        return "#10b981" // default to green
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardInfoContainer}>
        <View style={[styles.cardCountContainer, { backgroundColor: theme.colors.background.accent }]}>
          <Text style={[styles.cardCountText, { color: theme.colors.primary }]}>
            Card {cardIndex + 1} of {totalCards}
          </Text>
        </View>

        <View style={[styles.difficultyContainer, { backgroundColor: `${getDifficultyColor(card.difficulty)}20` }]}>
          <Text style={[styles.difficultyText, { color: getDifficultyColor(card.difficulty) }]}>{card.difficulty}</Text>
        </View>

        <View style={[styles.dueDateContainer, { backgroundColor: "rgba(245, 158, 11, 0.2)" }]}>
          <Ionicons name="calendar" size={16} color={theme.colors.warning} />
          <Text style={[styles.dueDateText, { color: theme.colors.warning }]}>Due Today</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.colors.background.primary }]}
        onPress={onFlip}
        activeOpacity={0.9}
      >
        <View
          style={[styles.questionBadge, { backgroundColor: showAnswer ? theme.colors.info : theme.colors.primary }]}
        >
          <Text style={[styles.questionBadgeText, { color: theme.colors.text.primary }]}>
            {showAnswer ? "Answer" : "Question"}
          </Text>
        </View>

        <Text style={[styles.cardText, { color: theme.colors.text.primary }]}>
          {showAnswer ? card.answer : card.question}
        </Text>

        <Text style={[styles.instructionText, { color: theme.colors.text.tertiary }]}>
          (Tap to flip, swipe to navigate)
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
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
  card: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  questionBadge: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
  },
  questionBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 14,
    textAlign: "center",
  },
})

