"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import DatePickerModal from "./DatePickerModal"

const DatePicker = ({ selectedDate, onDateChange, onAddTask }) => {
  const { theme } = useTheme()
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate)
    prevDay.setDate(prevDay.getDate() - 1)
    onDateChange(prevDay)
  }

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate)
    nextDay.setDate(nextDay.getDate() + 1)
    onDateChange(nextDay)
  }

  const handleDateSelect = (date) => {
    onDateChange(date)
    setDatePickerVisible(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevDay} accessibilityLabel="Previous day">
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setDatePickerVisible(true)}
          accessibilityLabel="Select date"
        >
          <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} style={styles.calendarIcon} />
          <Text style={[styles.dateText, { color: theme.colors.text.primary }]}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.arrowButton} onPress={handleNextDay} accessibilityLabel="Next day">
          <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={onAddTask}
          accessibilityLabel="Add task"
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <DatePickerModal
        visible={datePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        onConfirm={handleDateSelect}
        initialDate={selectedDate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowButton: {
    padding: 8,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
})

export default DatePicker

