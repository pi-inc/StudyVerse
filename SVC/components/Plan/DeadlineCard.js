"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"

const DeadlineCard = ({ deadline }) => {
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
      <TouchableOpacity style={styles.card} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
        <View style={styles.header}>
          <Text style={styles.title}>{deadline.title}</Text>
          <Text style={[styles.dueDate, { color: deadline.dueDateColor }]}>{deadline.dueDate}</Text>
        </View>
        <Text style={styles.category}>{deadline.category}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressPercentage}>{deadline.progress}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width,
                backgroundColor: deadline.progressColor,
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
    backgroundColor: "#1a1a2e",
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
    color: "#fff",
  },
  dueDate: {
    fontSize: 12,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  progressPercentage: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
})

export default DeadlineCard

