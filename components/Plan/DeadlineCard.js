"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { useTheme } from "../../context/ThemeContext"

const DeadlineCard = ({ deadline }) => {
  const { theme } = useTheme()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const progressAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: deadline.progress / 100,
      duration: 600, // Reduced from 1000
      useNativeDriver: false,
    }).start()
  }, [deadline.progress])

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  })

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.colors.background.secondary }]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>{deadline.title}</Text>
          <Text style={[styles.dueDate, { color: deadline.dueDateColor }]}>{deadline.dueDate}</Text>
        </View>
        <Text style={[styles.category, { color: theme.colors.text.tertiary }]}>{deadline.category}</Text>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressLabel, { color: theme.colors.text.tertiary }]}>Progress</Text>
          <Text style={[styles.progressPercentage, { color: theme.colors.text.primary }]}>{deadline.progress}%</Text>
        </View>
        <View style={[styles.progressBarBackground, { backgroundColor: theme.colors.background.accent }]}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width,
                backgroundColor: deadline.progressColor || theme.colors.primary,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dueDate: {
    fontSize: 12,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
})

export default DeadlineCard

