"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/layout/Header"
import Card from "../components/ui/Card"
import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

// Mock data
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const currentDate = new Date()
const currentDay = currentDate.getDate()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate()
}

const generateCalendarDays = () => {
  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = []

  // Add previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear)
    days.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: false,
    })
  }

  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month: currentMonth,
      year: currentYear,
      isCurrentMonth: true,
      isToday: i === currentDay,
    })
  }

  // Add next month days
  const remainingDays = 7 - (days.length % 7)
  if (remainingDays < 7) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isToday: false,
      })
    }
  }

  return days
}

const calendarDays = generateCalendarDays()

const tasks = [
  {
    id: "1",
    title: "Complete React Native Basics",
    course: "Introduction to React Native",
    time: "10:00 AM - 11:30 AM",
    priority: "high",
  },
  {
    id: "2",
    title: "Review JavaScript Concepts",
    course: "Advanced JavaScript",
    time: "1:00 PM - 2:30 PM",
    priority: "medium",
  },
  {
    id: "3",
    title: "Practice UI Design Principles",
    course: "UI/UX Design Fundamentals",
    time: "3:00 PM - 4:00 PM",
    priority: "low",
  },
]

const deadlines = [
  {
    id: "1",
    title: "React Native Project Submission",
    course: "Introduction to React Native",
    dueDate: "Tomorrow",
    progress: 75,
  },
  {
    id: "2",
    title: "JavaScript Quiz",
    course: "Advanced JavaScript",
    dueDate: "In 3 days",
    progress: 40,
  },
]

const PlanScreen = () => {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState(currentDay)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return theme.study.red
      case "medium":
        return theme.study.yellow
      case "low":
        return theme.study.green
      default:
        return theme.primary
    }
  }

  const getProgressColor = (progress) => {
    if (progress < 30) return theme.study.red
    if (progress < 70) return theme.study.yellow
    return theme.study.green
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Study Plan" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <Text style={[styles.monthTitle, { color: theme.foreground }]}>
              {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
            </Text>
            <View style={styles.monthNavigation}>
              <TouchableOpacity style={styles.monthButton}>
                <Feather name="chevron-left" size={20} color={theme.foreground} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.monthButton}>
                <Feather name="chevron-right" size={20} color={theme.foreground} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekDaysRow}>
            {weekDays.map((day) => (
              <Text key={day} style={[styles.weekDayText, { color: theme.mutedForeground }]}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(day.day)}
                style={[
                  styles.dayCell,
                  day.isToday && {
                    backgroundColor: theme.primary,
                    borderRadius: 20,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    {
                      color: day.isToday
                        ? theme.primaryForeground
                        : day.isCurrentMonth
                          ? theme.foreground
                          : theme.mutedForeground,
                      opacity: day.isCurrentMonth ? 1 : 0.5,
                    },
                  ]}
                >
                  {day.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Today's Tasks</Text>

          {tasks.map((task) => (
            <Card key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />
                <Text style={[styles.taskTitle, { color: theme.foreground }]}>{task.title}</Text>
              </View>

              <Text style={[styles.taskCourse, { color: theme.mutedForeground }]}>{task.course}</Text>

              <View style={styles.taskTime}>
                <Feather name="clock" size={14} color={theme.mutedForeground} />
                <Text style={[styles.taskTimeText, { color: theme.mutedForeground }]}>{task.time}</Text>
              </View>

              <View style={styles.taskActions}>
                <TouchableOpacity style={[styles.taskAction, { backgroundColor: theme.muted }]}>
                  <Feather name="check" size={16} color={theme.foreground} />
                  <Text style={[styles.taskActionText, { color: theme.foreground }]}>Complete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.taskAction, { backgroundColor: theme.muted }]}>
                  <Feather name="edit-2" size={16} color={theme.foreground} />
                  <Text style={[styles.taskActionText, { color: theme.foreground }]}>Edit</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Upcoming Deadlines</Text>

          {deadlines.map((deadline) => (
            <Card key={deadline.id} style={styles.deadlineCard}>
              <View style={styles.deadlineHeader}>
                <Text style={[styles.deadlineTitle, { color: theme.foreground }]}>{deadline.title}</Text>
                <View style={[styles.deadlineBadge, { backgroundColor: theme.primary + "20" }]}>
                  <Text style={[styles.deadlineBadgeText, { color: theme.primary }]}>{deadline.dueDate}</Text>
                </View>
              </View>

              <Text style={[styles.deadlineCourse, { color: theme.mutedForeground }]}>{deadline.course}</Text>

              <View style={styles.progressContainer}>
                <Text style={[styles.progressText, { color: theme.mutedForeground }]}>
                  Progress: {deadline.progress}%
                </Text>
                <View style={[styles.progressBar, { backgroundColor: theme.muted }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${deadline.progress}%`,
                        backgroundColor: getProgressColor(deadline.progress),
                      },
                    ]}
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>

        <TouchableOpacity style={styles.addTaskButton}>
          <LinearGradient
            colors={[theme.study.purple, theme.study.blue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addTaskGradient}
          >
            <Feather name="plus" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  calendarCard: {
    marginBottom: 20,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  monthNavigation: {
    flexDirection: "row",
  },
  monthButton: {
    padding: 4,
    marginLeft: 8,
  },
  weekDaysRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  taskCard: {
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  taskCourse: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 8,
  },
  taskTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  taskTimeText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 6,
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  taskAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  taskActionText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginLeft: 6,
  },
  deadlineCard: {
    marginBottom: 12,
  },
  deadlineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  deadlineTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  deadlineBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deadlineBadgeText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  deadlineCourse: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  addTaskButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addTaskGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default PlanScreen

