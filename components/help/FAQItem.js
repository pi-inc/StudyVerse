"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false)
  const rotateAnim = useRef(new Animated.Value(0)).current

  const toggleExpand = () => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 150, // Reduced from default
    })
    setExpanded(!expanded)

    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 150, // Reduced from 300
      useNativeDriver: true,
    }).start()
  }

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const arrowStyles = {
    transform: [{ rotate: rotateInterpolate }],
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.questionContainer} onPress={toggleExpand} activeOpacity={0.7}>
        <Text style={styles.questionText}>{question}</Text>
        <Animated.View style={arrowStyles}>
          <Ionicons name="chevron-down" size={20} color="#a78bfa" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  answerText: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
})

export default FAQItem

