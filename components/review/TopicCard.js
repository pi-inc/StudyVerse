"use client"

import { useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const TopicCard = ({ topic }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current

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

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{topic.title}</Text>
          <View style={styles.proficiencyContainer}>
            <Text style={[styles.proficiencyText, { color: topic.proficiencyColor }]}>{topic.proficiencyLevel}</Text>
            <View style={[styles.proficiencyBar, { backgroundColor: topic.proficiencyColor }]} />
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.dueNowBadge}>
            <Ionicons name="time" size={16} color="#f59e0b" />
            <Text style={styles.dueNowText}>{topic.status}</Text>
          </View>
          <Text style={styles.lastReviewedText}>{topic.lastReviewed}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2d2d44",
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  proficiencyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  proficiencyText: {
    fontSize: 14,
    marginRight: 8,
  },
  proficiencyBar: {
    height: 6,
    width: 60,
    borderRadius: 3,
    opacity: 0.7,
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  dueNowBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  dueNowText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f59e0b",
    marginLeft: 4,
  },
  lastReviewedText: {
    fontSize: 14,
    color: "#9ca3af",
  },
})

export default TopicCard

