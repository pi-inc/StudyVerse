"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, PanResponder } from "react-native"
import { useTheme } from "../../context/ThemeContext"

const { width } = Dimensions.get("window")

const Flashcard = ({ question, answer, onSwipeLeft, onSwipeRight }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [pan] = useState(new Animated.ValueXY())
  const { theme } = useTheme()

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > 120) {
        Animated.spring(pan, {
          toValue: { x: width, y: 0 },
          friction: 3, // Reduced from default
          tension: 60, // Increased from default
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({ x: 0, y: 0 })
          onSwipeRight()
        })
      } else if (gesture.dx < -120) {
        Animated.spring(pan, {
          toValue: { x: -width, y: 0 },
          friction: 3, // Reduced from default
          tension: 60, // Increased from default
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({ x: 0, y: 0 })
          onSwipeLeft()
        })
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 3, // Reduced from default
          tension: 60, // Increased from default
          useNativeDriver: false,
        }).start()
      }
    },
  })

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.background.primary,
            borderColor: theme.colors.border.light,
          },
        ]}
        activeOpacity={0.9}
        onPress={flipCard}
      >
        <View style={[styles.questionBadge, { backgroundColor: isFlipped ? theme.colors.info : theme.colors.primary }]}>
          <Text style={[styles.questionBadgeText, { color: theme.colors.text.primary }]}>
            {isFlipped ? "Answer" : "Question"}
          </Text>
        </View>

        <Text style={[styles.cardText, { color: theme.colors.text.primary }]}>{isFlipped ? answer : question}</Text>

        <Text style={[styles.instructionText, { color: theme.colors.text.tertiary }]}>
          (Tap to flip, swipe to navigate)
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: width - 32,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    borderWidth: 1,
    borderRadius: 12,
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

export default Flashcard

