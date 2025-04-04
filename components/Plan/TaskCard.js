"use client"

import { useRef, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const TaskCard = ({ task: initialTask }) => {
  const [task, setTask] = useState(initialTask)
  const scaleAnim = useRef(new Animated.Value(1)).current
  const { theme } = useTheme()

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

  const toggleCompleted = () => {
    setTask({
      ...task,
      completed: !task.completed,
    })
  }

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
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              { borderColor: theme.colors.primary },
              task.completed && { backgroundColor: theme.colors.primary },
            ]}
            onPress={toggleCompleted}
            activeOpacity={0.7}
          >
            {task.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
          </TouchableOpacity>
        </View>
        <View style={styles.contentSection}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text.primary },
              task.completed && {
                textDecorationLine: "line-through",
                color: theme.colors.text.tertiary,
              },
            ]}
          >
            {task.title}
          </Text>
          <View style={styles.tagsContainer}>
            <View
              style={[
                styles.categoryTag,
                { backgroundColor: task.categoryColor + "20" }, // 20% opacity
              ]}
            >
              <Text style={[styles.categoryText, { color: task.categoryColor }]}>{task.category}</Text>
            </View>
            <View
              style={[
                styles.priorityTag,
                { backgroundColor: task.priorityColor + "20" }, // 20% opacity
              ]}
            >
              <Text style={[styles.priorityText, { color: task.priorityColor }]}>{task.priority}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color={theme.colors.text.tertiary} />
            <Text style={[styles.timeText, { color: theme.colors.text.tertiary }]}>{task.time}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.text.tertiary} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  leftSection: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  contentSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  priorityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
})

export default TaskCard

