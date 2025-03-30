"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext" // Add this import

const TodaysPlanCard = ({ navigateTo }) => {
  const navigation = useNavigation()
  const { theme } = useTheme() // Add this to access theme
  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState([])

  const scheduleItems = [
    {
      id: 1,
      title: "Review Arrays and Linked Lists",
      category: "Data Structures",
      categoryColor: theme.colors.primary, // Use theme color
      time: "9:00 AM - 10:30 AM",
    },
    {
      id: 2,
      title: "Complete Quiz on Sorting Algorithms",
      category: "Algorithms",
      categoryColor: theme.colors.info, // Use theme color
      time: "11:00 AM - 12:00 PM",
    },
    {
      id: 3,
      title: "Watch Lecture on Neural Networks",
      category: "Machine Learning",
      categoryColor: theme.colors.secondary, // Use theme color
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
    <View style={[styles.card, { backgroundColor: theme.colors.background.card }]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Ionicons name="calendar" size={20} color={theme.colors.info} />
          <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>Today's Plan</Text>
        </View>
        <Text style={[styles.dateText, { color: theme.colors.text.tertiary }]}>Wednesday, March 26</Text>
      </View>

      {scheduleItems.length === completedTasks.length && completedTasks.length > 0 ? (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="checkmark-circle" size={48} color={theme.colors.success} />
          <Text style={[styles.emptyStateText, { color: theme.colors.success }]}>All tasks completed for today!</Text>
        </View>
      ) : (
        <View style={styles.scheduleContainer}>
          {scheduleItems.map((item) => (
            <View key={item.id} style={styles.scheduleItem}>
              <TouchableOpacity style={styles.scheduleIconContainer} onPress={() => toggleTaskCompletion(item.id)}>
                <View
                  style={[
                    styles.scheduleIcon,
                    { borderColor: theme.colors.info },
                    completedTasks.includes(item.id) && [styles.completedIcon, { backgroundColor: theme.colors.info }],
                  ]}
                >
                  {completedTasks.includes(item.id) && (
                    <Ionicons name="checkmark" size={12} color={theme.colors.text.primary} />
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={[
                  styles.scheduleContent,
                  { backgroundColor: theme.colors.background.secondary },
                  completedTasks.includes(item.id) && { backgroundColor: `${theme.colors.background.secondary}80` }, // 80% opacity
                ]}
              >
                <Text
                  style={[
                    styles.scheduleTitle,
                    { color: theme.colors.text.primary },
                    completedTasks.includes(item.id) && [styles.completedTitle, { color: theme.colors.text.tertiary }],
                  ]}
                >
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
                  <Ionicons name="time-outline" size={14} color={theme.colors.text.tertiary} />
                  <Text style={[styles.timeText, { color: theme.colors.text.tertiary }]}>{item.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewFullSchedule}>
        <Text style={[styles.viewAllText, { color: theme.colors.info }]}>View Full Schedule</Text>
        <Ionicons name="arrow-forward" size={16} color={theme.colors.info} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
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
    marginLeft: 8,
  },
  dateText: {
    fontSize: 14,
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
    alignItems: "center",
    justifyContent: "center",
  },
  completedIcon: {
    // backgroundColor set dynamically
  },
  scheduleContent: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: "line-through",
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
    marginTop: 12,
  },
})

export default TodaysPlanCard

