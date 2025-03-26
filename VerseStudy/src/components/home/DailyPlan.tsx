"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"
import { Feather } from "@expo/vector-icons"

// Mock data
const dailyTasks = [
  {
    id: "1",
    title: "Complete React Native Basics module",
    course: "Introduction to React Native",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "2",
    title: "Practice JavaScript array methods",
    course: "Advanced JavaScript Concepts",
    duration: "20 mins",
    completed: true,
  },
  {
    id: "3",
    title: "Review UI design principles",
    course: "UI/UX Design Principles",
    duration: "15 mins",
    completed: false,
  },
]

const DailyPlan = () => {
  const { theme } = useTheme()
  const [tasks, setTasks] = useState(dailyTasks)

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const renderTask = (task) => (
    <View key={task.id} style={styles.taskItem}>
      <TouchableOpacity style={styles.checkbox} onPress={() => toggleTaskCompletion(task.id)}>
        {task.completed ? (
          <View style={[styles.checkboxChecked, { backgroundColor: theme.primary }]}>
            <Feather name="check" size={14} color="white" />
          </View>
        ) : (
          <View style={[styles.checkboxUnchecked, { borderColor: theme.border }]} />
        )}
      </TouchableOpacity>

      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, { color: theme.foreground }, task.completed && styles.taskCompleted]}>
          {task.title}
        </Text>

        <Text style={[styles.taskCourse, { color: theme.mutedForeground }]}>{task.course}</Text>
      </View>

      <View style={styles.taskDuration}>
        <Feather name="clock" size={14} color={theme.mutedForeground} />
        <Text style={[styles.taskDurationText, { color: theme.mutedForeground }]}>{task.duration}</Text>
      </View>
    </View>
  )

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.foreground }]}>Today's Study Plan</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: theme.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksList}>{tasks.map(renderTask)}</View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  viewAll: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxUnchecked: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 2,
  },
  taskCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  taskCourse: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  taskDuration: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  taskDurationText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginLeft: 4,
  },
})

export default DailyPlan

