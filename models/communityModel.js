/**
 * Community Screen Data Model
 *
 * This file defines the data model for the Community screen and its components.
 * It includes the schema, default values, and utility functions for working with community data.
 */

import { Animated } from "react-native"

/**
 * Comprehensive schema for the Community screen and its components
 */
export const COMMUNITY_SCHEMA = {
  communityScreen: {
    activeTab: {
      type: "string",
      description: "Currently active tab in the Community screen",
      options: ["users", "groups", "sessions"],
      default: "users",
    },
    searchQuery: {
      type: "string",
      description: "Current search query for users, groups, or topics",
      default: "",
    },
    similarUsers: {
      type: "array",
      description: "Users studying similar topics",
      items: {
        $ref: "#/definitions/user",
      },
      default: [],
    },
    studyGroups: {
      type: "array",
      description: "Available study groups",
      items: {
        $ref: "#/definitions/studyGroup",
      },
      default: [],
    },
    studySessions: {
      type: "array",
      description: "Upcoming study sessions",
      items: {
        $ref: "#/definitions/studySession",
      },
      default: [],
    },
    isLoading: {
      type: "boolean",
      description: "Whether data is currently being loaded",
      default: false,
    },
    animations: {
      type: "object",
      description: "Animation values for UI elements",
      properties: {
        fadeAnim: {
          type: "object",
          description: "Fade animation value",
          default: "new Animated.Value(0)",
        },
        translateYAnim: {
          type: "object",
          description: "Translate Y animation value",
          default: "new Animated.Value(30)",
        },
        fabScaleAnim: {
          type: "object",
          description: "FAB scale animation value",
          default: "new Animated.Value(0)",
        },
      },
    },
  },
  definitions: {
    user: {
      type: "object",
      description: "A user in the community",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the user",
        },
        name: {
          type: "string",
          description: "User's full name",
        },
        avatar: {
          type: "string",
          description: "URL to user's avatar image",
          default: "https://example.com/avatar.jpg",
        },
        topic: {
          type: "string",
          description: "Primary topic the user is studying",
          examples: ["Data Structures", "Algorithms", "Web Development"],
        },
        matchPercentage: {
          type: "number",
          description: "Percentage match with the current user's interests",
          minimum: 0,
          maximum: 100,
        },
        isOnline: {
          type: "boolean",
          description: "Whether the user is currently online",
          default: false,
        },
        lastActive: {
          type: "string",
          description: "When the user was last active",
          examples: ["2 hours ago", "Just now", "Yesterday"],
        },
        bio: {
          type: "string",
          description: "User's short biography",
          default: "",
        },
        studyStreak: {
          type: "number",
          description: "Number of consecutive days the user has studied",
          default: 0,
        },
        badges: {
          type: "array",
          description: "Achievement badges earned by the user",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the badge",
              },
              name: {
                type: "string",
                description: "Name of the badge",
              },
              icon: {
                type: "string",
                description: "Icon name for the badge",
              },
            },
          },
          default: [],
        },
      },
      required: ["id", "name", "topic", "matchPercentage"],
    },
    studyGroup: {
      type: "object",
      description: "A study group in the community",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the group",
        },
        name: {
          type: "string",
          description: "Name of the study group",
        },
        description: {
          type: "string",
          description: "Description of the group's focus",
        },
        topic: {
          type: "string",
          description: "Primary topic of the group",
          examples: ["Data Structures", "Machine Learning", "Web Development"],
        },
        memberCount: {
          type: "number",
          description: "Number of members in the group",
          minimum: 0,
        },
        avatar: {
          type: "string",
          description: "URL to group's avatar image",
          default: "https://example.com/group-avatar.jpg",
        },
        isPrivate: {
          type: "boolean",
          description: "Whether the group is private (requires invitation)",
          default: false,
        },
        activeMembers: {
          type: "array",
          description: "Currently active members in the group",
          items: {
            $ref: "#/definitions/user",
          },
          default: [],
        },
        lastActivity: {
          type: "string",
          description: "When the group was last active",
          examples: ["2 hours ago", "Just now", "Yesterday"],
        },
      },
      required: ["id", "name", "topic", "memberCount"],
    },
    studySession: {
      type: "object",
      description: "A scheduled study session",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the session",
        },
        title: {
          type: "string",
          description: "Title of the study session",
        },
        description: {
          type: "string",
          description: "Description of what will be covered",
        },
        topic: {
          type: "string",
          description: "Topic of the study session",
          examples: ["Data Structures", "Machine Learning", "Web Development"],
        },
        startTime: {
          type: "string",
          description: "When the session starts",
          format: "date-time",
        },
        duration: {
          type: "number",
          description: "Duration of the session in minutes",
          minimum: 15,
        },
        host: {
          $ref: "#/definitions/user",
          description: "User hosting the session",
        },
        participants: {
          type: "array",
          description: "Users participating in the session",
          items: {
            $ref: "#/definitions/user",
          },
          default: [],
        },
        maxParticipants: {
          type: "number",
          description: "Maximum number of participants allowed",
          minimum: 1,
          default: 10,
        },
        isRecurring: {
          type: "boolean",
          description: "Whether the session recurs regularly",
          default: false,
        },
        recurringPattern: {
          type: "string",
          description: "Pattern of recurrence",
          examples: ["Daily", "Weekly on Monday", "Every 2 weeks"],
          default: null,
        },
      },
      required: ["id", "title", "topic", "startTime", "duration", "host"],
    },
    communityTab: {
      type: "object",
      description: "A tab in the Community screen",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the tab",
          options: ["users", "groups", "sessions"],
        },
        label: {
          type: "string",
          description: "Display label for the tab",
          examples: ["Active Users", "Study Groups", "Study Sessions"],
        },
        icon: {
          type: "string",
          description: "Icon name from Feather icons",
          examples: ["users", "message-square", "calendar"],
        },
      },
      required: ["id", "label", "icon"],
    },
  },
}

/**
 * Creates a default Community screen data object
 * @returns {Object} Default Community screen data
 */
export const createDefaultCommunityData = () => {
  return {
    activeTab: "users",
    searchQuery: "",
    similarUsers: [
      createUser({
        id: "1",
        name: "Sarah Chen",
        topic: "Data Structures",
        matchPercentage: 85,
        isOnline: true,
        avatar: "https://example.com/avatar1.jpg",
      }),
      createUser({
        id: "2",
        name: "Michael Johnson",
        topic: "Algorithms",
        matchPercentage: 78,
        isOnline: false,
        lastActive: "2 hours ago",
        avatar: "https://example.com/avatar2.jpg",
      }),
      createUser({
        id: "3",
        name: "Emily Rodriguez",
        topic: "Web Development",
        matchPercentage: 72,
        isOnline: true,
        avatar: "https://example.com/avatar3.jpg",
      }),
    ],
    studyGroups: [
      createStudyGroup({
        id: "1",
        name: "Data Structures Study Group",
        topic: "Data Structures",
        memberCount: 12,
        description: "A group for studying data structures and algorithms",
      }),
      createStudyGroup({
        id: "2",
        name: "Machine Learning Enthusiasts",
        topic: "Machine Learning",
        memberCount: 8,
        description: "Discussing ML concepts and implementations",
      }),
    ],
    studySessions: [
      createStudySession({
        id: "1",
        title: "Binary Trees Deep Dive",
        topic: "Data Structures",
        startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        duration: 60,
        host: createUser({
          id: "1",
          name: "Sarah Chen",
          topic: "Data Structures",
          matchPercentage: 85,
        }),
      }),
      createStudySession({
        id: "2",
        title: "JavaScript Fundamentals",
        topic: "Web Development",
        startTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
        duration: 90,
        host: createUser({
          id: "3",
          name: "Emily Rodriguez",
          topic: "Web Development",
          matchPercentage: 72,
        }),
      }),
    ],
    isLoading: false,
    animations: {
      fadeAnim: new Animated.Value(0),
      translateYAnim: new Animated.Value(30),
      fabScaleAnim: new Animated.Value(0),
    },
  }
}

/**
 * Creates a new user object with default values
 * @param {Object} userData - User data to override defaults
 * @returns {Object} User object
 */
export const createUser = (userData = {}) => {
  return {
    id: userData.id || String(Date.now()),
    name: userData.name || "User Name",
    avatar: userData.avatar || "https://example.com/default-avatar.jpg",
    topic: userData.topic || "General Studies",
    matchPercentage: userData.matchPercentage || 50,
    isOnline: userData.isOnline !== undefined ? userData.isOnline : false,
    lastActive: userData.lastActive || "Recently",
    bio: userData.bio || "",
    studyStreak: userData.studyStreak || 0,
    badges: userData.badges || [],
  }
}

/**
 * Creates a new study group object with default values
 * @param {Object} groupData - Study group data to override defaults
 * @returns {Object} Study group object
 */
export const createStudyGroup = (groupData = {}) => {
  return {
    id: groupData.id || String(Date.now()),
    name: groupData.name || "Study Group",
    description: groupData.description || "A group for studying together",
    topic: groupData.topic || "General Studies",
    memberCount: groupData.memberCount || 1,
    avatar: groupData.avatar || "https://example.com/default-group.jpg",
    isPrivate: groupData.isPrivate !== undefined ? groupData.isPrivate : false,
    activeMembers: groupData.activeMembers || [],
    lastActivity: groupData.lastActivity || "Recently",
  }
}

/**
 * Creates a new study session object with default values
 * @param {Object} sessionData - Study session data to override defaults
 * @returns {Object} Study session object
 */
export const createStudySession = (sessionData = {}) => {
  // Default host if not provided
  const defaultHost = createUser({
    id: "default-host",
    name: "Session Host",
    topic: sessionData.topic || "General Studies",
    matchPercentage: 50,
  })

  return {
    id: sessionData.id || String(Date.now()),
    title: sessionData.title || "Study Session",
    description: sessionData.description || "Join us to study together",
    topic: sessionData.topic || "General Studies",
    startTime: sessionData.startTime || new Date(Date.now() + 86400000).toISOString(), // Tomorrow by default
    duration: sessionData.duration || 60,
    host: sessionData.host || defaultHost,
    participants: sessionData.participants || [],
    maxParticipants: sessionData.maxParticipants || 10,
    isRecurring: sessionData.isRecurring !== undefined ? sessionData.isRecurring : false,
    recurringPattern: sessionData.recurringPattern || null,
  }
}

/**
 * Validates community data against the schema
 * @param {Object} data - Community data to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateCommunityData = (data) => {
  const errors = []

  // Basic validation for required fields
  if (!data.activeTab || !["users", "groups", "sessions"].includes(data.activeTab)) {
    errors.push("Invalid activeTab value")
  }

  // Validate users if present
  if (data.similarUsers) {
    data.similarUsers.forEach((user, index) => {
      if (!user.id || !user.name || !user.topic || user.matchPercentage === undefined) {
        errors.push(`Invalid user at index ${index}: missing required fields`)
      }
      if (user.matchPercentage < 0 || user.matchPercentage > 100) {
        errors.push(`Invalid matchPercentage for user at index ${index}`)
      }
    })
  }

  // Validate study groups if present
  if (data.studyGroups) {
    data.studyGroups.forEach((group, index) => {
      if (!group.id || !group.name || !group.topic || group.memberCount === undefined) {
        errors.push(`Invalid study group at index ${index}: missing required fields`)
      }
      if (group.memberCount < 0) {
        errors.push(`Invalid memberCount for study group at index ${index}`)
      }
    })
  }

  // Validate study sessions if present
  if (data.studySessions) {
    data.studySessions.forEach((session, index) => {
      if (
        !session.id ||
        !session.title ||
        !session.topic ||
        !session.startTime ||
        session.duration === undefined ||
        !session.host
      ) {
        errors.push(`Invalid study session at index ${index}: missing required fields`)
      }
      if (session.duration < 15) {
        errors.push(`Invalid duration for study session at index ${index}`)
      }
      if (session.maxParticipants < 1) {
        errors.push(`Invalid maxParticipants for study session at index ${index}`)
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Calculates the match percentage between two users based on interests
 * @param {Object} currentUser - Current user object with interests
 * @param {Object} otherUser - Other user object with interests
 * @returns {number} Match percentage (0-100)
 */
export const calculateMatchPercentage = (currentUser, otherUser) => {
  // Simple implementation - can be expanded based on actual matching algorithm
  if (!currentUser.interests || !otherUser.interests) {
    return 50 // Default match if interests aren't available
  }

  const currentInterests = new Set(currentUser.interests)
  const otherInterests = new Set(otherUser.interests)

  // Find common interests
  const commonInterests = [...currentInterests].filter((interest) => otherInterests.has(interest))

  // Calculate percentage based on common interests
  const totalUniqueInterests = new Set([...currentInterests, ...otherInterests]).size
  const matchPercentage = Math.round((commonInterests.length / totalUniqueInterests) * 100)

  return matchPercentage
}

/**
 * Formats a timestamp into a human-readable "last active" string
 * @param {string|Date} timestamp - Timestamp to format
 * @returns {string} Formatted "last active" string
 */
export const formatLastActive = (timestamp) => {
  if (!timestamp) return "Unknown"

  const now = new Date()
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return "Just now"
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`
  if (diffDay === 1) return "Yesterday"
  if (diffDay < 7) return `${diffDay} days ago`

  // Format as date for older timestamps
  return date.toLocaleDateString()
}

/**
 * Returns the default tabs for the Community screen
 * @returns {Array} Array of tab objects
 */
export const getDefaultCommunityTabs = () => {
  return [
    { id: "users", label: "Active Users", icon: "users" },
    { id: "groups", label: "Study Groups", icon: "message-square" },
    { id: "sessions", label: "Study Sessions", icon: "calendar" },
  ]
}

