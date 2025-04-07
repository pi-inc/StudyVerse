/**
 * Data model for the Learn screen and its associated components
 */

// The complete Learn screen data schema
export const LEARN_SCHEMA = {
    learnScreen: {
      activeTab: {
        type: "string",
        description: "Currently active tab in the Learn screen",
        options: ["courses", "ai-tutor"],
        default: "courses",
      },
      continueLearningCourses: {
        type: "array",
        description: "Courses the user has started but not completed",
        items: {
          $ref: "#/definitions/course",
        },
        default: [],
      },
      recommendedItems: {
        type: "array",
        description: "Recommended courses and learning resources",
        items: {
          $ref: "#/definitions/recommendation",
        },
        default: [],
      },
      exploreCourses: {
        type: "array",
        description: "Courses available for exploration",
        items: {
          $ref: "#/definitions/course",
        },
        default: [],
      },
      isLoading: {
        type: "boolean",
        description: "Whether data is currently being loaded",
        default: true,
      },
    },
    aiTutor: {
      recentQuestions: {
        type: "array",
        description: "Recent questions asked to the AI Tutor",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the question",
            },
            question: {
              type: "string",
              description: "The question text",
            },
          },
        },
        default: [
          {
            id: 1,
            question: "How do binary trees work?",
          },
          {
            id: 2,
            question: "Explain the difference between arrays and linked lists",
          },
          {
            id: 3,
            question: "What is the time complexity of quicksort?",
          },
          {
            id: 4,
            question: "How does machine learning work?",
          },
        ],
      },
      learningResources: {
        type: "array",
        description: "Learning resources available to the user",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the resource",
            },
            title: {
              type: "string",
              description: "Title of the resource",
            },
            description: {
              type: "string",
              description: "Description of the resource",
            },
            icon: {
              type: "string",
              description: "Icon name from Ionicons",
            },
          },
        },
        default: [
          {
            id: 1,
            title: "Video Tutorials",
            description: "Learn through visual explanations",
            icon: "book",
          },
          {
            id: 2,
            title: "Articles & Guides",
            description: "In-depth written explanations",
            icon: "document-text",
          },
        ],
      },
      isLoading: {
        type: "boolean",
        description: "Whether AI service is loading",
        default: false,
      },
      aiError: {
        type: "string",
        description: "Error message from AI service, if any",
        default: null,
      },
    },
    aiTutorChat: {
      messages: {
        type: "array",
        description: "Chat messages between user and AI Tutor",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the message",
            },
            sender: {
              type: "string",
              description: "Who sent the message",
              options: ["user", "ai"],
            },
            text: {
              type: "string",
              description: "Message content",
            },
            timestamp: {
              type: "string",
              description: "Time the message was sent",
            },
          },
        },
        default: [
          {
            id: 1,
            sender: "ai",
            text: "Hello! I'm your AI Tutor. How can I help you with your learning today?",
            timestamp: "1:45 PM",
          },
        ],
      },
      topic: {
        type: "string",
        description: "Current topic being discussed",
        default: "Data Structures",
      },
      suggestedQuestions: {
        type: "array",
        description: "Suggested questions for the user",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the question",
            },
            text: {
              type: "string",
              description: "The question text",
            },
          },
        },
        default: [
          {
            id: 1,
            text: "Explain arrays vs linked lists",
          },
          {
            id: 2,
            text: "How do binary trees work?",
          },
        ],
      },
    },
    definitions: {
      course: {
        type: "object",
        description: "A learning course",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the course",
          },
          title: {
            type: "string",
            description: "Course title",
          },
          description: {
            type: "string",
            description: "Brief description of the course",
          },
          icon: {
            type: "string",
            description: "Emoji or text icon representing the course",
          },
          category: {
            type: "string",
            description: "Course category",
            examples: ["Programming", "Math", "Science", "Language"],
          },
          level: {
            type: "string",
            description: "Difficulty level",
            options: ["Beginner", "Intermediate", "Advanced"],
          },
          progress: {
            type: "number",
            description: "User's progress through the course (0-100)",
            minimum: 0,
            maximum: 100,
            default: 0,
          },
          progressColor: {
            type: "string",
            description: "Color for the progress bar",
            examples: ["#8a70ff", "#4ade80", "#f59e0b"],
          },
          rating: {
            type: "number",
            description: "Course rating (0-5)",
            minimum: 0,
            maximum: 5,
            default: null,
          },
          modules: {
            type: "array",
            description: "Course modules",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "Unique identifier for the module",
                },
                title: {
                  type: "string",
                  description: "Module title",
                },
                lessons: {
                  type: "array",
                  description: "Lessons in the module",
                  items: {
                    $ref: "#/definitions/lesson",
                  },
                },
              },
            },
            default: [],
          },
        },
      },
      lesson: {
        type: "object",
        description: "A lesson within a course module",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the lesson",
          },
          title: {
            type: "string",
            description: "Lesson title",
          },
          duration: {
            type: "number",
            description: "Lesson duration in minutes",
          },
          completed: {
            type: "boolean",
            description: "Whether the user has completed this lesson",
            default: false,
          },
          type: {
            type: "string",
            description: "Type of lesson content",
            options: ["video", "reading", "quiz", "exercise"],
          },
        },
      },
      recommendation: {
        type: "object",
        description: "A recommended item for the user",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the recommendation",
          },
          title: {
            type: "string",
            description: "Recommendation title",
          },
          description: {
            type: "string",
            description: "Brief description of the recommendation",
          },
          type: {
            type: "string",
            description: "Type of recommendation",
            options: ["Course", "AI Tutor", "Resource", "Community"],
          },
          icon: {
            type: "string",
            description: "Icon name from Ionicons or Feather icons",
          },
          iconBgColor: {
            type: "string",
            description: "Background color for the icon",
            examples: ["#8a70ff", "#4ade80", "#f59e0b"],
          },
          courseId: {
            type: "string",
            description: "ID of the related course, if applicable",
            default: null,
          },
        },
      },
    },
  }
  
  /**
   * Creates a default Learn screen data object
   * @returns {Object} Default Learn screen data
   */
  export function createDefaultLearnData() {
    return {
      learnScreen: {
        activeTab: LEARN_SCHEMA.learnScreen.activeTab.default,
        continueLearningCourses: LEARN_SCHEMA.learnScreen.continueLearningCourses.default,
        recommendedItems: LEARN_SCHEMA.learnScreen.recommendedItems.default,
        exploreCourses: LEARN_SCHEMA.learnScreen.exploreCourses.default,
        isLoading: LEARN_SCHEMA.learnScreen.isLoading.default,
      },
      aiTutor: {
        recentQuestions: LEARN_SCHEMA.aiTutor.recentQuestions.default,
        learningResources: LEARN_SCHEMA.aiTutor.learningResources.default,
        isLoading: LEARN_SCHEMA.aiTutor.isLoading.default,
        aiError: LEARN_SCHEMA.aiTutor.aiError.default,
      },
      aiTutorChat: {
        messages: LEARN_SCHEMA.aiTutorChat.messages.default,
        topic: LEARN_SCHEMA.aiTutorChat.topic.default,
        suggestedQuestions: LEARN_SCHEMA.aiTutorChat.suggestedQuestions.default,
      },
    }
  }
  
  /**
   * Validates Learn screen data against the schema
   * @param {Object} data - The data to validate
   * @returns {Object} Validation result with isValid flag and errors array
   */
  export function validateLearnData(data) {
    const errors = []
  
    // Basic validation example - can be expanded for more comprehensive validation
    if (!data) {
      errors.push("Data is required")
      return { isValid: false, errors }
    }
  
    // Validate learnScreen
    if (data.learnScreen) {
      // Validate activeTab
      if (
        data.learnScreen.activeTab &&
        !LEARN_SCHEMA.learnScreen.activeTab.options.includes(data.learnScreen.activeTab)
      ) {
        errors.push(`Invalid activeTab: ${data.learnScreen.activeTab}`)
      }
  
      // Validate continueLearningCourses
      if (data.learnScreen.continueLearningCourses && !Array.isArray(data.learnScreen.continueLearningCourses)) {
        errors.push("continueLearningCourses must be an array")
      }
  
      // Additional validation for other fields can be added here
    } else {
      errors.push("learnScreen object is required")
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Transforms a course object for display in the UI
   * @param {Object} course - The course object to transform
   * @returns {Object} Transformed course object
   */
  export function transformCourseForDisplay(course) {
    if (!course) return null
  
    return {
      ...course,
      // Format progress as percentage string
      formattedProgress: `${course.progress || 0}%`,
      // Set default progress color if not provided
      progressColor: course.progressColor || "#8a70ff",
      // Format rating with one decimal place
      formattedRating: course.rating ? course.rating.toFixed(1) : "N/A",
      // Calculate total lessons count
      totalLessons: course.modules
        ? course.modules.reduce((total, module) => total + (module.lessons ? module.lessons.length : 0), 0)
        : 0,
      // Calculate completed lessons count
      completedLessons: course.modules
        ? course.modules.reduce(
            (total, module) => total + (module.lessons ? module.lessons.filter((lesson) => lesson.completed).length : 0),
            0,
          )
        : 0,
    }
  }
  
  /**
   * Transforms a recommendation object for display in the UI
   * @param {Object} recommendation - The recommendation object to transform
   * @returns {Object} Transformed recommendation object
   */
  export function transformRecommendationForDisplay(recommendation) {
    if (!recommendation) return null
  
    return {
      ...recommendation,
      // Set default icon background color if not provided
      iconBgColor: recommendation.iconBgColor || "#8a70ff",
      // Add formatted type label
      typeLabel: recommendation.type ? recommendation.type.toUpperCase() : "RECOMMENDATION",
    }
  }
  
  /**
   * Creates a new message object for the AI Tutor chat
   * @param {string} sender - The message sender ("user" or "ai")
   * @param {string} text - The message text
   * @returns {Object} New message object
   */
  export function createChatMessage(sender, text) {
    return {
      id: Date.now(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }
  
  /**
   * Formats a timestamp for display in the chat
   * @param {string|Date} timestamp - The timestamp to format
   * @returns {string} Formatted timestamp
   */
  export function formatChatTimestamp(timestamp) {
    if (!timestamp) return ""
  
    if (typeof timestamp === "string") {
      return timestamp
    }
  
    if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  
    return ""
  }
  
  