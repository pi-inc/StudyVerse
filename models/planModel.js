/**
 * Plan Screen Data Model
 *
 * This file defines the data structure for the Plan screen and its components,
 * including tasks, deadlines, and study statistics.
 */

/**
 * Complete schema for the Plan screen data
 */
export const PLAN_SCHEMA = {
    planScreen: {
      selectedView: {
        type: "string",
        description: "Currently selected time view",
        options: ["Day", "Week", "Month"],
        default: "Day",
      },
      showCompleted: {
        type: "boolean",
        description: "Whether to show completed tasks",
        default: true,
      },
      currentDate: {
        type: "object",
        description: "Currently selected date",
        properties: {
          day: {
            type: "number",
            description: "Day of the month",
            minimum: 1,
            maximum: 31,
          },
          month: {
            type: "number",
            description: "Month (0-11)",
            minimum: 0,
            maximum: 11,
          },
          year: {
            type: "number",
            description: "Year",
            minimum: 2000,
          },
          dayName: {
            type: "string",
            description: "Name of the day",
            options: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          },
          monthName: {
            type: "string",
            description: "Name of the month",
            options: [
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
            ],
          },
          formattedDate: {
            type: "string",
            description: "Formatted date string",
            example: "Wednesday, March 26",
          },
        },
      },
      stats: {
        type: "array",
        description: "Study statistics for the selected time period",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the stat",
            },
            title: {
              type: "string",
              description: "Title of the statistic",
              examples: ["Study Hours", "Focus Score", "Tasks"],
            },
            value: {
              type: "string",
              description: "Current value of the statistic",
            },
            unit: {
              type: "string",
              description: "Unit of measurement",
              examples: ["hours", "/10", "/4"],
            },
            change: {
              type: "string",
              description: "Change from previous period",
              examples: ["+0.5", "+1.3", ""],
            },
            isPositive: {
              type: "boolean",
              description: "Whether the change is positive",
              default: true,
            },
          },
        },
      },
      tasks: {
        type: "array",
        description: "Tasks for the selected time period",
        items: {
          $ref: "#/definitions/task",
        },
      },
      deadlines: {
        type: "array",
        description: "Upcoming deadlines",
        items: {
          $ref: "#/definitions/deadline",
        },
      },
      isLoading: {
        type: "boolean",
        description: "Whether data is currently being loaded",
        default: false,
      },
    },
    definitions: {
      task: {
        type: "object",
        description: "A task to be completed",
        properties: {
          id: {
            type: "number",
            description: "Unique identifier for the task",
          },
          title: {
            type: "string",
            description: "Task title",
          },
          category: {
            type: "string",
            description: "Category the task belongs to",
            examples: ["Data Structures", "Algorithms", "Machine Learning", "Web Development"],
          },
          categoryColor: {
            type: "string",
            description: "Color associated with the category",
            examples: ["#7c3aed", "#8b5cf6", "#3b82f6"],
          },
          priority: {
            type: "string",
            description: "Priority level of the task",
            options: ["High", "Medium", "Low"],
          },
          priorityColor: {
            type: "string",
            description: "Color associated with the priority level",
            examples: ["#ef4444", "#f59e0b", "#10b981"],
          },
          time: {
            type: "string",
            description: "Time slot for the task",
            examples: ["9:00 AM - 10:30 AM", "11:00 AM - 12:00 PM"],
          },
          completed: {
            type: "boolean",
            description: "Whether the task has been completed",
            default: false,
          },
          date: {
            type: "string",
            description: "Date the task is scheduled for",
            format: "date",
            default: "current date",
          },
          notes: {
            type: "string",
            description: "Additional notes for the task",
            default: "",
          },
          reminders: {
            type: "array",
            description: "Reminders for the task",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                  description: "Unique identifier for the reminder",
                },
                time: {
                  type: "string",
                  description: "Time for the reminder",
                  format: "time",
                },
              },
            },
            default: [],
          },
        },
        required: ["id", "title", "category", "priority", "time"],
      },
      deadline: {
        type: "object",
        description: "A deadline for a project or assignment",
        properties: {
          id: {
            type: "number",
            description: "Unique identifier for the deadline",
          },
          title: {
            type: "string",
            description: "Deadline title",
          },
          category: {
            type: "string",
            description: "Category the deadline belongs to",
            examples: ["Data Structures", "Machine Learning"],
          },
          progress: {
            type: "number",
            description: "Progress towards completing the deadline (0-100)",
            minimum: 0,
            maximum: 100,
          },
          progressColor: {
            type: "string",
            description: "Color associated with the progress",
            examples: ["#10b981", "#3b82f6"],
          },
          dueDate: {
            type: "string",
            description: "When the deadline is due",
            examples: ["Tomorrow, 11:59 PM", "In 3 days"],
          },
          dueDateColor: {
            type: "string",
            description: "Color associated with the due date urgency",
            examples: ["#ef4444", "#f59e0b"],
          },
          tasks: {
            type: "array",
            description: "Tasks associated with this deadline",
            items: {
              $ref: "#/definitions/task",
            },
            default: [],
          },
        },
        required: ["id", "title", "category", "progress", "dueDate"],
      },
      pomodoroTip: {
        type: "object",
        description: "Tip about the Pomodoro technique",
        properties: {
          title: {
            type: "string",
            description: "Title of the tip",
            default: "Pomodoro Technique",
          },
          description: {
            type: "string",
            description: "Description of the technique",
            default: "Try studying in 25-minute focused sessions with 5-minute breaks in between.",
          },
          icon: {
            type: "string",
            description: "Icon name from Ionicons",
            default: "time-outline",
          },
          color: {
            type: "string",
            description: "Color for the tip",
            default: "#f59e0b",
          },
        },
      },
    },
  }
  
  /**
   * Creates a default Plan screen data object
   * @returns {Object} Default Plan screen data
   */
  export const createDefaultPlanData = () => {
    const today = new Date()
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
  
    return {
      selectedView: "Day",
      showCompleted: true,
      currentDate: {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        dayName: dayNames[today.getDay()],
        monthName: monthNames[today.getMonth()],
        formattedDate: `${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}`,
      },
      stats: [
        {
          id: 1,
          title: "Study Hours",
          value: "0",
          unit: "hours",
          change: "",
          isPositive: true,
        },
        {
          id: 2,
          title: "Focus Score",
          value: "0",
          unit: "/10",
          change: "",
          isPositive: true,
        },
        {
          id: 3,
          title: "Tasks",
          value: "0",
          unit: "/0",
          change: "",
          isPositive: true,
        },
      ],
      tasks: [],
      deadlines: [],
      isLoading: false,
    }
  }
  
  /**
   * Creates a new task object with default values
   * @param {Object} taskData - Partial task data
   * @returns {Object} Complete task object
   */
  export const createTask = (taskData) => {
    const priorityColors = {
      High: "#ef4444",
      Medium: "#f59e0b",
      Low: "#10b981",
    }
  
    const defaultTask = {
      id: Date.now(),
      title: "",
      category: "General",
      categoryColor: "#3b82f6",
      priority: "Medium",
      priorityColor: priorityColors.Medium,
      time: "9:00 AM - 10:00 AM",
      completed: false,
      date: new Date().toISOString().split("T")[0],
      notes: "",
      reminders: [],
    }
  
    const task = { ...defaultTask, ...taskData }
  
    // Set priority color based on priority
    if (taskData.priority && priorityColors[taskData.priority]) {
      task.priorityColor = priorityColors[taskData.priority]
    }
  
    return task
  }
  
  /**
   * Creates a new deadline object with default values
   * @param {Object} deadlineData - Partial deadline data
   * @returns {Object} Complete deadline object
   */
  export const createDeadline = (deadlineData) => {
    const defaultDeadline = {
      id: Date.now(),
      title: "",
      category: "General",
      progress: 0,
      progressColor: "#3b82f6",
      dueDate: "Tomorrow, 11:59 PM",
      dueDateColor: "#f59e0b",
      tasks: [],
    }
  
    const deadline = { ...defaultDeadline, ...deadlineData }
  
    // Set due date color based on urgency
    if (deadline.dueDate.includes("Tomorrow") || deadline.dueDate.includes("Today")) {
      deadline.dueDateColor = "#ef4444" // Red for urgent
    } else if (deadline.dueDate.includes("In 2 days") || deadline.dueDate.includes("In 3 days")) {
      deadline.dueDateColor = "#f59e0b" // Orange for approaching
    } else {
      deadline.dueDateColor = "#10b981" // Green for not urgent
    }
  
    // Set progress color based on progress
    if (deadline.progress < 30) {
      deadline.progressColor = "#ef4444" // Red for low progress
    } else if (deadline.progress < 70) {
      deadline.progressColor = "#f59e0b" // Orange for medium progress
    } else {
      deadline.progressColor = "#10b981" // Green for high progress
    }
  
    return deadline
  }
  
  /**
   * Validates Plan screen data against the schema
   * @param {Object} data - Plan screen data to validate
   * @returns {Object} Validation result with isValid flag and errors array
   */
  export const validatePlanData = (data) => {
    const errors = []
  
    // Basic validation for required fields
    if (!data.selectedView || !PLAN_SCHEMA.planScreen.selectedView.options.includes(data.selectedView)) {
      errors.push("Invalid selectedView value")
    }
  
    if (data.showCompleted === undefined || typeof data.showCompleted !== "boolean") {
      errors.push("showCompleted must be a boolean")
    }
  
    if (!data.currentDate || !data.currentDate.day || !data.currentDate.month || !data.currentDate.year) {
      errors.push("currentDate is missing required fields")
    }
  
    // Validate tasks
    if (data.tasks) {
      data.tasks.forEach((task, index) => {
        if (!task.id || !task.title || !task.category || !task.priority || !task.time) {
          errors.push(`Task at index ${index} is missing required fields`)
        }
      })
    }
  
    // Validate deadlines
    if (data.deadlines) {
      data.deadlines.forEach((deadline, index) => {
        if (
          !deadline.id ||
          !deadline.title ||
          !deadline.category ||
          deadline.progress === undefined ||
          !deadline.dueDate
        ) {
          errors.push(`Deadline at index ${index} is missing required fields`)
        }
      })
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Formats a date for display in the Plan screen
   * @param {Date} date - Date to format
   * @returns {Object} Formatted date object
   */
  export const formatDateForPlanScreen = (date) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
  
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      dayName: dayNames[date.getDay()],
      monthName: monthNames[date.getMonth()],
      formattedDate: `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`,
    }
  }
  
  /**
   * Calculates study statistics based on completed tasks
   * @param {Array} tasks - Array of task objects
   * @param {Object} previousStats - Previous period statistics for comparison
   * @returns {Array} Updated statistics
   */
  export const calculateStudyStats = (tasks, previousStats = null) => {
    // Calculate total study hours
    const studyHours = tasks.reduce((total, task) => {
      if (task.completed) {
        // Extract hours from time string (e.g., "9:00 AM - 10:30 AM")
        const timeMatch = task.time.match(/(\d+):(\d+)\s*(?:AM|PM)\s*-\s*(\d+):(\d+)\s*(?:AM|PM)/i)
        if (timeMatch) {
          const startHour = Number.parseInt(timeMatch[1])
          const startMinute = Number.parseInt(timeMatch[2])
          const endHour = Number.parseInt(timeMatch[3])
          const endMinute = Number.parseInt(timeMatch[4])
  
          // Convert to 24-hour format if needed and calculate duration
          let duration = endHour - startHour + (endMinute - startMinute) / 60
          if (duration < 0) duration += 12 // Handle cases like "11:00 AM - 1:00 PM"
  
          return total + duration
        }
      }
      return total
    }, 0)
  
    // Calculate focus score (example algorithm: completed tasks / total tasks * 10)
    const completedTasks = tasks.filter((task) => task.completed).length
    const totalTasks = tasks.length
    const focusScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 10) : 0
  
    // Calculate changes from previous period
    const studyHoursChange = previousStats ? (studyHours - Number.parseFloat(previousStats[0].value)).toFixed(1) : ""
    const focusScoreChange = previousStats ? (focusScore - Number.parseFloat(previousStats[1].value)).toFixed(1) : ""
    const tasksChange = previousStats
      ? (completedTasks - Number.parseInt(previousStats[2].value.split("/")[0])).toString()
      : ""
  
    return [
      {
        id: 1,
        title: "Study Hours",
        value: studyHours.toFixed(1),
        unit: "hours",
        change: studyHoursChange,
        isPositive: studyHoursChange === "" || Number.parseFloat(studyHoursChange) >= 0,
      },
      {
        id: 2,
        title: "Focus Score",
        value: focusScore.toString(),
        unit: "/10",
        change: focusScoreChange,
        isPositive: focusScoreChange === "" || Number.parseFloat(focusScoreChange) >= 0,
      },
      {
        id: 3,
        title: "Tasks",
        value: `${completedTasks}/${totalTasks}`,
        unit: "",
        change: tasksChange,
        isPositive: tasksChange === "" || Number.parseInt(tasksChange) >= 0,
      },
    ]
  }
  
  /**
   * Gets the default Pomodoro tip
   * @returns {Object} Pomodoro tip object
   */
  export const getPomodoroTip = () => {
    return {
      title: "Pomodoro Technique",
      description: "Try studying in 25-minute focused sessions with 5-minute breaks in between.",
      icon: "time-outline",
      color: "#f59e0b",
    }
  }
  
  