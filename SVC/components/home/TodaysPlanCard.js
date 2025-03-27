"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const TodaysPlanCard = ({ navigateTo }) => {
  const navigation = useNavigation()
  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState([])

  const scheduleItems = [
    {
      id: 1,
      title: "Review Arrays and Linked Lists",
      category: "Data Structures",
      categoryColor: "#7c3aed",
      time: "9:00 AM - 10:30 AM",
    },
    {
      id: 2,
      title: "Complete Quiz on Sorting Algorithms",
      category: "Algorithms",
      categoryColor: "#3b82f6",
      time: "11:00 AM - 12:00 PM",
    },
    {
      id: 3,
      title: "Watch Lecture on Neural Networks",
      category: "Machine Learning",
      categoryColor: "#8b5cf6",
      time: "2:00 PM - 3:30 PM",
    },
  ]

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId))
    } else {
      setCompletedTasks([...completedTasks, taskId])
    }
  }

  const handleViewFullSchedule = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo)
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Ionicons name="calendar" size={20} color="#3b82f6" />
          <Text style={styles.headerText}>Today's Plan</Text>
        </View>
        <Text style={styles.dateText}>Wednesday, March 26</Text>
      </View>

      {scheduleItems.length === completedTasks.length && completedTasks.length > 0 ? (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="checkmark-circle" size={48} color="#10b981" />
          <Text style={styles.emptyStateText}>All tasks completed for today!</Text>
        </View>
      ) : (
        <View style={styles.scheduleContainer}>
          {scheduleItems.map((item) => (
            <View key={item.id} style={styles.scheduleItem}>
              <TouchableOpacity style={styles.scheduleIconContainer} onPress={() => toggleTaskCompletion(item.id)}>
                <View style={[styles.scheduleIcon, completedTasks.includes(item.id) && styles.completedIcon]}>
                  {completedTasks.includes(item.id) && <Ionicons name="checkmark" size={12} color="#fff" />}
                </View>
              </TouchableOpacity>
              <View style={[styles.scheduleContent, completedTasks.includes(item.id) && styles.completedContent]}>
                <Text style={[styles.scheduleTitle, completedTasks.includes(item.id) && styles.completedTitle]}>
                  {item.title}
                </Text>
                <View style={styles.categoryContainer}>
                  <Text
                    style={[
                      styles.categoryText,
                      { color: item.categoryColor },
                      completedTasks.includes(item.id) && styles.completedCategoryText,
                    ]}
                  >
                    {item.category}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={14} color="#9ca3af" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewFullSchedule}>
        <Text style={styles.viewAllText}>View Full Schedule</Text>
        <Ionicons name="arrow-forward" size={16} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  scheduleContainer: {
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  scheduleIconContainer: {
    width: 24,
    alignItems: "center",
    marginRight: 12,
    paddingTop: 12,
  },
  scheduleIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  completedIcon: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  scheduleContent: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 12,
  },
  completedContent: {
    backgroundColor: "rgba(15, 23, 42, 0.5)",
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  completedCategoryText: {
    opacity: 0.6,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 4,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3b82f6",
    marginRight: 4,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
    marginTop: 12,
  },
})

export default TodaysPlanCard

