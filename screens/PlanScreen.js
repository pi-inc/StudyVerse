"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import TaskCard from "../components/plan/TaskCard"
import DeadlineCard from "../components/plan/DeadlineCard"
import PomodoroTip from "../components/plan/PomodoroTip"
import Header from "../components/shared/Header"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import { useTheme } from "../context/ThemeContext"
import DatePicker from "../components/plan/DatePicker"
import TaskCreationModal from "../components/plan/TaskCreationModal"
import AsyncStorage from "@react-native-async-storage/async-storage"

const PlanScreen = () => {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCompleted, setShowCompleted] = useState(true)
  const [taskCreationVisible, setTaskCreationVisible] = useState(false)
  const [tasks, setTasks] = useState([])

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks")
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks))
        } else {
          setTasks([
            {
              id: 1,
              title: "Review Arrays and Linked Lists",
              category: "Data Structures",
              categoryColor: "#7c3aed",
              priority: "High",
              priorityColor: "#ef4444",
              time: "9:00 AM - 10:30 AM",
              completed: true,
              date: new Date().toISOString().split("T")[0],
            },
            {
              id: 2,
              title: "Complete Quiz on Sorting Algorithms",
              category: "Algorithms",
              categoryColor: "#8b5cf6",
              priority: "Medium",
              priorityColor: "#f59e0b",
              time: "11:00 AM - 12:00 PM",
              completed: false,
              date: new Date().toISOString().split("T")[0],
            },
            {
              id: 3,
              title: "Watch Lecture on Neural Networks",
              category: "Machine Learning",
              categoryColor: "#8b5cf6",
              priority: "Medium",
              priorityColor: "#f59e0b",
              time: "2:00 PM - 3:30 PM",
              completed: false,
              date: new Date().toISOString().split("T")[0],
            },
            {
              id: 4,
              title: "Practice React Hooks",
              category: "Web Development",
              categoryColor: "#3b82f6",
              priority: "Low",
              priorityColor: "#10b981",
              time: "4:00 PM - 5:30 PM",
              completed: false,
              date: new Date().toISOString().split("T")[0],
            },
          ])
        }
      } catch (error) {
        console.error("Failed to load tasks:", error)
      }
    }

    loadTasks()

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const deadlines = [
    {
      id: 1,
      title: "Data Structures Assignment",
      category: "Data Structures",
      progress: 75,
      progressColor: "#10b981",
      dueDate: "Tomorrow, 11:59 PM",
      dueDateColor: "#ef4444",
    },
    {
      id: 2,
      title: "Machine Learning Project",
      category: "Machine Learning",
      progress: 30,
      progressColor: "#3b82f6",
      dueDate: "In 3 days",
      dueDateColor: "#f59e0b",
    },
  ]

  const stats = [
    {
      id: 1,
      title: "Study Hours",
      value: "4.5",
      unit: "hours",
      change: "+0.5",
      isPositive: true,
    },
    {
      id: 2,
      title: "Focus Score",
      value: "8.2",
      unit: "/10",
      change: "+1.3",
      isPositive: true,
    },
    {
      id: 3,
      title: "Tasks",
      value: "1",
      unit: "/4",
      change: "",
      isPositive: true,
    },
  ]

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  const toggleTaskCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)

    const saveTasks = async () => {
      try {
        const stringifiedTasks = JSON.stringify(updatedTasks)
        await AsyncStorage.setItem("tasks", stringifiedTasks)
      } catch (error) {
        console.error("Failed to save tasks:", error)
      }
    }

    saveTasks()
  }

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask])

    const saveTasks = async () => {
      try {
        const stringifiedTasks = JSON.stringify([...tasks, newTask])
        await AsyncStorage.setItem("tasks", stringifiedTasks)
      } catch (error) {
        console.error("Failed to save tasks:", error)
      }
    }

    saveTasks()
  }

  const filteredTasks = tasks.filter((task) => {
    const taskDate = task.date
    const selectedDateStr = selectedDate.toISOString().split("T")[0]
    return taskDate === selectedDateStr && (showCompleted || !task.completed)
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header />

      <ScrollView style={styles.scrollView}>
        <Animated.View style={headerAnimStyle}>
          <Text style={[styles.pageTitle, { color: theme.colors.primary }]}>Planner</Text>
        </Animated.View>

        <AnimatedListItem index={0}>
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onAddTask={() => setTaskCreationVisible(true)}
          />
        </AnimatedListItem>

        <AnimatedListItem index={1}>
          <View style={styles.statsContainer}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statItem}>
                <Text style={[styles.statTitle, { color: theme.colors.text.tertiary }]}>{stat.title}</Text>
                <View style={styles.statValueContainer}>
                  <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>{stat.value}</Text>
                  <Text style={[styles.statUnit, { color: theme.colors.text.tertiary }]}>{stat.unit}</Text>
                  {stat.change && (
                    <Text
                      style={[
                        styles.statChange,
                        { color: stat.isPositive ? theme.colors.success : theme.colors.danger },
                      ]}
                    >
                      {stat.change}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </AnimatedListItem>

        <AnimatedListItem index={2}>
          <View style={[styles.divider, { backgroundColor: theme.colors.background.accent }]} />
        </AnimatedListItem>

        <AnimatedListItem index={3}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Today's Tasks</Text>
            <View style={styles.sectionActions}>
              <TouchableOpacity style={styles.hideCompletedButton} onPress={() => setShowCompleted(!showCompleted)}>
                <Text style={[styles.hideCompletedText, { color: theme.colors.text.tertiary }]}>
                  {showCompleted ? "Hide completed" : "Show completed"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="filter" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedListItem>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <AnimatedListItem key={task.id} index={index + 4}>
              <TaskCard task={task} onToggleComplete={() => toggleTaskCompleted(task.id)} />
            </AnimatedListItem>
          ))
        ) : (
          <AnimatedListItem index={4}>
            <View style={[styles.emptyState, { backgroundColor: theme.colors.background.secondary }]}>
              <Ionicons name="calendar-outline" size={40} color={theme.colors.text.tertiary} />
              <Text style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>No tasks for this day</Text>
              <TouchableOpacity
                style={[styles.addTaskButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => setTaskCreationVisible(true)}
              >
                <Ionicons name="add" size={20} color="#fff" style={styles.addIcon} />
                <Text style={styles.addTaskText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </AnimatedListItem>
        )}

        <AnimatedListItem index={8}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Upcoming Deadlines</Text>
          </View>
        </AnimatedListItem>

        {deadlines.map((deadline, index) => (
          <AnimatedListItem key={deadline.id} index={index + 9}>
            <DeadlineCard deadline={deadline} />
          </AnimatedListItem>
        ))}

        <AnimatedListItem index={11}>
          <PomodoroTip />
        </AnimatedListItem>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <TaskCreationModal
        visible={taskCreationVisible}
        onClose={() => setTaskCreationVisible(false)}
        onSave={handleAddTask}
        initialDate={selectedDate}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dateNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewToggle: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  viewButtonActive: {
    // backgroundColor set dynamically
  },
  viewButtonText: {
    fontWeight: "bold",
    // color set dynamically
  },
  viewButtonTextActive: {
    // color set dynamically
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statUnit: {
    fontSize: 14,
    marginLeft: 2,
  },
  statChange: {
    fontSize: 12,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  hideCompletedButton: {
    marginRight: 12,
  },
  hideCompletedText: {
    fontSize: 14,
  },
  filterButton: {
    padding: 4,
  },
  bottomPadding: {
    height: 100,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    borderRadius: 12,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 16,
    marginVertical: 12,
  },
  addTaskButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  addIcon: {
    marginRight: 8,
  },
  addTaskText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default PlanScreen

