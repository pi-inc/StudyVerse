"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const TaskCreationModal = ({ visible, onClose, onSave, initialDate = new Date() }) => {
  const { theme } = useTheme()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(null)
  const [priority, setPriority] = useState(null)
  const [startTime, setStartTime] = useState("9:00 AM")
  const [endTime, setEndTime] = useState("10:00 AM")
  const [errors, setErrors] = useState({})

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)

  const categories = [
    { id: "data-structures", name: "Data Structures", color: "#7c3aed" },
    { id: "algorithms", name: "Algorithms", color: "#8b5cf6" },
    { id: "machine-learning", name: "Machine Learning", color: "#8b5cf6" },
    { id: "web-development", name: "Web Development", color: "#3b82f6" },
  ]

  const priorities = [
    { id: "high", name: "High", color: "#ef4444" },
    { id: "medium", name: "Medium", color: "#f59e0b" },
    { id: "low", name: "Low", color: "#10b981" },
  ]

  const timeSlots = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
  ]

  const resetForm = () => {
    setTitle("")
    setCategory(null)
    setPriority(null)
    setStartTime("9:00 AM")
    setEndTime("10:00 AM")
    setErrors({})
    setShowCategoryDropdown(false)
    setShowPriorityDropdown(false)
    setShowTimeDropdown(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!category) {
      newErrors.category = "Category is required"
    }

    if (!priority) {
      newErrors.priority = "Priority is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      const selectedCategory = categories.find((c) => c.id === category)
      const selectedPriority = priorities.find((p) => p.id === priority)

      const newTask = {
        id: Date.now(), // Generate a unique ID
        title,
        category: selectedCategory.name,
        categoryColor: selectedCategory.color,
        priority: selectedPriority.name,
        priorityColor: selectedPriority.color,
        time: `${startTime} - ${endTime}`,
        completed: false,
        date: initialDate.toISOString().split("T")[0],
      }

      onSave(newTask)
      handleClose()
    }
  }

  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.colors.background.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>Add New Task</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              {/* Title Input */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.text.primary }]}>Title</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.background.secondary,
                      color: theme.colors.text.primary,
                      borderColor: errors.title ? theme.colors.danger : theme.colors.border.light,
                    },
                  ]}
                  placeholder="Enter task title"
                  placeholderTextColor={theme.colors.text.tertiary}
                  value={title}
                  onChangeText={setTitle}
                />
                {errors.title && <Text style={[styles.errorText, { color: theme.colors.danger }]}>{errors.title}</Text>}
              </View>

              {/* Category Dropdown */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.text.primary }]}>Category</Text>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    {
                      backgroundColor: theme.colors.background.secondary,
                      borderColor: errors.category ? theme.colors.danger : theme.colors.border.light,
                    },
                  ]}
                  onPress={() => {
                    setShowCategoryDropdown(!showCategoryDropdown)
                    setShowPriorityDropdown(false)
                    setShowTimeDropdown(false)
                  }}
                >
                  {category ? (
                    <View style={styles.selectedOption}>
                      <View
                        style={[
                          styles.categoryDot,
                          { backgroundColor: categories.find((c) => c.id === category)?.color },
                        ]}
                      />
                      <Text style={[styles.dropdownButtonText, { color: theme.colors.text.primary }]}>
                        {categories.find((c) => c.id === category)?.name}
                      </Text>
                    </View>
                  ) : (
                    <Text style={[styles.placeholderText, { color: theme.colors.text.tertiary }]}>
                      Select a category
                    </Text>
                  )}
                  <Ionicons
                    name={showCategoryDropdown ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={theme.colors.text.tertiary}
                  />
                </TouchableOpacity>

                {showCategoryDropdown && (
                  <View style={[styles.dropdown, { backgroundColor: theme.colors.background.secondary }]}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat.id}
                        style={[styles.dropdownItem, category === cat.id && { backgroundColor: `${cat.color}20` }]}
                        onPress={() => {
                          setCategory(cat.id)
                          setShowCategoryDropdown(false)
                        }}
                      >
                        <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                        <Text style={[styles.dropdownItemText, { color: theme.colors.text.primary }]}>{cat.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {errors.category && (
                  <Text style={[styles.errorText, { color: theme.colors.danger }]}>{errors.category}</Text>
                )}
              </View>

              {/* Priority Dropdown */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.text.primary }]}>Priority</Text>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    {
                      backgroundColor: theme.colors.background.secondary,
                      borderColor: errors.priority ? theme.colors.danger : theme.colors.border.light,
                    },
                  ]}
                  onPress={() => {
                    setShowPriorityDropdown(!showPriorityDropdown)
                    setShowCategoryDropdown(false)
                    setShowTimeDropdown(false)
                  }}
                >
                  {priority ? (
                    <View style={styles.selectedOption}>
                      <View
                        style={[
                          styles.priorityIndicator,
                          { backgroundColor: priorities.find((p) => p.id === priority)?.color },
                        ]}
                      />
                      <Text style={[styles.dropdownButtonText, { color: theme.colors.text.primary }]}>
                        {priorities.find((p) => p.id === priority)?.name}
                      </Text>
                    </View>
                  ) : (
                    <Text style={[styles.placeholderText, { color: theme.colors.text.tertiary }]}>
                      Select a priority
                    </Text>
                  )}
                  <Ionicons
                    name={showPriorityDropdown ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={theme.colors.text.tertiary}
                  />
                </TouchableOpacity>

                {showPriorityDropdown && (
                  <View style={[styles.dropdown, { backgroundColor: theme.colors.background.secondary }]}>
                    {priorities.map((pri) => (
                      <TouchableOpacity
                        key={pri.id}
                        style={[styles.dropdownItem, priority === pri.id && { backgroundColor: `${pri.color}20` }]}
                        onPress={() => {
                          setPriority(pri.id)
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <View style={[styles.priorityIndicator, { backgroundColor: pri.color }]} />
                        <Text style={[styles.dropdownItemText, { color: theme.colors.text.primary }]}>{pri.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {errors.priority && (
                  <Text style={[styles.errorText, { color: theme.colors.danger }]}>{errors.priority}</Text>
                )}
              </View>

              {/* Time Range */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.text.primary }]}>Time</Text>
                <View style={styles.timeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.timeButton,
                      {
                        backgroundColor: theme.colors.background.secondary,
                        borderColor: theme.colors.border.light,
                      },
                    ]}
                    onPress={() => {
                      setShowTimeDropdown("start")
                      setShowCategoryDropdown(false)
                      setShowPriorityDropdown(false)
                    }}
                  >
                    <Text style={[styles.timeButtonText, { color: theme.colors.text.primary }]}>{startTime}</Text>
                    <Ionicons name="chevron-down" size={16} color={theme.colors.text.tertiary} />
                  </TouchableOpacity>

                  <Text style={[styles.timeToText, { color: theme.colors.text.tertiary }]}>to</Text>

                  <TouchableOpacity
                    style={[
                      styles.timeButton,
                      {
                        backgroundColor: theme.colors.background.secondary,
                        borderColor: theme.colors.border.light,
                      },
                    ]}
                    onPress={() => {
                      setShowTimeDropdown("end")
                      setShowCategoryDropdown(false)
                      setShowPriorityDropdown(false)
                    }}
                  >
                    <Text style={[styles.timeButtonText, { color: theme.colors.text.primary }]}>{endTime}</Text>
                    <Ionicons name="chevron-down" size={16} color={theme.colors.text.tertiary} />
                  </TouchableOpacity>
                </View>

                {showTimeDropdown && (
                  <View style={[styles.dropdown, { backgroundColor: theme.colors.background.secondary }]}>
                    <ScrollView style={styles.timeDropdownScroll} nestedScrollEnabled={true}>
                      {timeSlots.map((time) => (
                        <TouchableOpacity
                          key={time}
                          style={[
                            styles.dropdownItem,
                            ((showTimeDropdown === "start" && startTime === time) ||
                              (showTimeDropdown === "end" && endTime === time)) && {
                              backgroundColor: `${theme.colors.primary}20`,
                            },
                          ]}
                          onPress={() => {
                            if (showTimeDropdown === "start") {
                              setStartTime(time)
                            } else {
                              setEndTime(time)
                            }
                            setShowTimeDropdown(false)
                          }}
                        >
                          <Text style={[styles.dropdownItemText, { color: theme.colors.text.primary }]}>{time}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton, { borderColor: theme.colors.border.light }]}
                onPress={handleClose}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSave}
              >
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    maxHeight: "80%",
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
  formContainer: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    maxHeight: 150,
  },
  timeDropdownScroll: {
    maxHeight: 150,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  selectedOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  timeButtonText: {
    fontSize: 16,
  },
  timeToText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
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
  saveButton: {
    // backgroundColor set dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButtonText: {
    // color set dynamically
  },
  saveButtonText: {
    color: "#fff",
  },
})

export default TaskCreationModal

