"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import TaskCard from "../components/Plan/TaskCard"
import DeadlineCard from "../components/Plan/DeadlineCard"
import PomodoroTip from "../components/Plan/PomodoroTip"
import Header from "../components/shared/Header"
import AnimatedListItem from "../components/shared/AnimatedListItem"

const PlanScreen = () => {
  const [selectedView, setSelectedView] = useState("Day")
  const [showCompleted, setShowCompleted] = useState(true)

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
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

  const tasks = [
    {
      id: 1,
      title: "Review Arrays and Linked Lists",
      category: "Data Structures",
      categoryColor: "#7c3aed",
      priority: "High",
      priorityColor: "#ef4444",
      time: "9:00 AM - 10:30 AM",
      completed: true,
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
    },
  ]

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

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        <Animated.View style={headerAnimStyle}>
          <Text style={styles.pageTitle}>Planner</Text>
        </Animated.View>

        <AnimatedListItem index={0}>
          <View style={styles.dateNavigation}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={24} color="#a78bfa" />
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={20} color="#a78bfa" style={styles.dateIcon} />
              <Text style={styles.dateText}>Wednesday, March 26</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="#a78bfa" />
            </TouchableOpacity>
          </View>
        </AnimatedListItem>

        <AnimatedListItem index={1}>
          <View style={styles.viewToggle}>
            {["Day", "Week", "Month"].map((view) => (
              <TouchableOpacity
                key={view}
                style={[styles.viewButton, selectedView === view && styles.viewButtonActive]}
                onPress={() => setSelectedView(view)}
              >
                <Text style={[styles.viewButtonText, selectedView === view && styles.viewButtonTextActive]}>
                  {view}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedListItem>

        <AnimatedListItem index={2}>
          <View style={styles.statsContainer}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statItem}>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <View style={styles.statValueContainer}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statUnit}>{stat.unit}</Text>
                  {stat.change && (
                    <Text style={[styles.statChange, { color: stat.isPositive ? "#10b981" : "#ef4444" }]}>
                      {stat.change}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </AnimatedListItem>

        <AnimatedListItem index={3}>
          <View style={styles.divider} />
        </AnimatedListItem>

        <AnimatedListItem index={4}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <View style={styles.sectionActions}>
              <TouchableOpacity style={styles.hideCompletedButton} onPress={() => setShowCompleted(!showCompleted)}>
                <Text style={styles.hideCompletedText}>{showCompleted ? "Hide completed" : "Show completed"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="filter" size={20} color="#a78bfa" />
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedListItem>

        {tasks
          .filter((task) => showCompleted || !task.completed)
          .map((task, index) => (
            <AnimatedListItem key={task.id} index={index + 5}>
              <TaskCard task={task} />
            </AnimatedListItem>
          ))}

        <AnimatedListItem index={9}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
          </View>
        </AnimatedListItem>

        {deadlines.map((deadline, index) => (
          <AnimatedListItem key={deadline.id} index={index + 10}>
            <DeadlineCard deadline={deadline} />
          </AnimatedListItem>
        ))}

        <AnimatedListItem index={12}>
          <PomodoroTip />
        </AnimatedListItem>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
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
    color: "#fff",
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
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
    backgroundColor: "#7c3aed",
  },
  viewButtonText: {
    color: "#9ca3af",
    fontWeight: "bold",
  },
  viewButtonTextActive: {
    color: "#fff",
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
    color: "#9ca3af",
    marginBottom: 4,
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statUnit: {
    fontSize: 14,
    color: "#9ca3af",
    marginLeft: 2,
  },
  statChange: {
    fontSize: 12,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#1f2937",
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a78bfa",
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
    color: "#fff",
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
    color: "#9ca3af",
  },
  filterButton: {
    padding: 4,
  },
  bottomPadding: {
    height: 100,
  },
})

export default PlanScreen

