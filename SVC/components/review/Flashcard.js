"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, PanResponder } from "react-native"

const { width } = Dimensions.get("window")

const Flashcard = ({ question, answer, onSwipeLeft, onSwipeRight }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [pan] = useState(new Animated.ValueXY())

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
      <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={flipCard}>
        <View style={styles.questionBadge}>
          <Text style={styles.questionBadgeText}>{isFlipped ? "Answer" : "Question"}</Text>
        </View>

        <Text style={styles.cardText}>{isFlipped ? answer : question}</Text>

        <Text style={styles.instructionText}>(Tap to flip, swipe to navigate)</Text>
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
    backgroundColor: "#0a0a1a",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  questionBadge: {
    backgroundColor: "#7c3aed",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
  },
  questionBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
})

export default Flashcard

