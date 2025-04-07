"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const DatePickerModal = ({ visible, onClose, onConfirm, initialDate = new Date() }) => {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState(initialDate)

  // Generate month days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()

    // Get first day of month and total days in month
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Get days from previous month to fill first week
    const prevMonthDays = []
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate()

    for (let i = 0; i < firstDay; i++) {
      prevMonthDays.unshift({
        day: daysInPrevMonth - i,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
      })
    }

    // Current month days
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
        isSelected:
          i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear(),
      })
    }

    // Next month days to complete the grid
    const nextMonthDays = []
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year
    const totalDaysToShow = 42 // 6 rows of 7 days
    const remainingDays = totalDaysToShow - prevMonthDays.length - currentMonthDays.length

    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        day: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
      })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  const calendarDays = generateCalendarDays()

  const handleDayPress = (dayInfo) => {
    const newDate = new Date(dayInfo.year, dayInfo.month, dayInfo.day)
    setSelectedDate(newDate)
  }

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setSelectedDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setSelectedDate(newDate)
  }

  const handleConfirm = () => {
    onConfirm(selectedDate)
    onClose()
  }

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>Select Date</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={handlePrevMonth} style={styles.monthNavButton}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <Text style={[styles.monthYearText, { color: theme.colors.text.primary }]}>
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </Text>

            <TouchableOpacity onPress={handleNextMonth} style={styles.monthNavButton}>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdaysContainer}>
            {dayNames.map((day, index) => (
              <Text key={index} style={[styles.weekdayText, { color: theme.colors.text.secondary }]}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysContainer}>
            {calendarDays.map((dayInfo, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayButton,
                  dayInfo.isSelected && { backgroundColor: theme.colors.primary },
                  !dayInfo.isCurrentMonth && { opacity: 0.4 },
                ]}
                onPress={() => handleDayPress(dayInfo)}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: theme.colors.text.primary },
                    dayInfo.isSelected && { color: "#fff" },
                  ]}
                >
                  {dayInfo.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.selectedDateContainer}>
            <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} style={styles.calendarIcon} />
            <Text style={[styles.selectedDateText, { color: theme.colors.text.primary }]}>
              {formatDate(selectedDate)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: theme.colors.border.light }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleConfirm}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthNavButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "600",
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekdayText: {
    width: 40,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
  },
  selectedDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(124, 58, 237, 0.1)",
  },
  calendarIcon: {
    marginRight: 8,
  },
  selectedDateText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {
    // backgroundColor set dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButtonText: {
    // color set dynamically
  },
  confirmButtonText: {
    color: "#fff",
  },
})

export default DatePickerModal

