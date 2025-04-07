/**
 * Onboarding Data Model
 *
 * This file defines the complete data structure for the onboarding process,
 * including all fields, data types, and potential values.
 */

// Define the onboarding data model schema
export const ONBOARDING_SCHEMA = {
    authentication: {
      uid: {
        type: "string",
        description: "Firebase user ID",
        example: "uId123456789",
      },
      email: {
        type: "string",
        description: "User's email address",
        example: "user@example.com",
      },
      password: {
        type: "string",
        description: "User's password (not stored in final user object)",
        example: "password123",
      },
      displayName: {
        type: "string",
        description: "User's full name",
        example: "John Doe",
      },
      emailVerified: {
        type: "boolean",
        description: "Whether the user's email has been verified",
        default: false,
      },
      rememberMe: {
        type: "boolean",
        description: "Whether to remember the user's login",
        default: false,
      },
    },
    studyPreferences: {
      studyGoal: {
        type: "string",
        description: "User's primary goal for using StudyVerse",
        options: ["academic", "professional", "certification", "personal"],
        default: "academic",
      },
      learningStyle: {
        type: "string",
        description: "User's preferred learning style",
        options: ["visual", "auditory", "reading", "kinesthetic"],
        default: "visual",
      },
      studyTimeMinutes: {
        type: "number",
        description: "Minutes per day the user can dedicate to studying",
        range: [10, 120],
        default: 30,
        step: 5,
      },
      subjects: {
        type: "array",
        description: "Subjects the user is interested in studying",
        items: {
          type: "string",
          options: [
            "math",
            "science",
            "programming",
            "engineering",
            "languages",
            "history",
            "arts",
            "philosophy",
            "business",
            "health",
            "law",
            "education",
          ],
        },
        default: [],
      },
    },
    appSettings: {
      createdAt: {
        type: "timestamp",
        description: "When the user profile was created",
        default: "serverTimestamp()",
      },
      lastLogin: {
        type: "timestamp",
        description: "When the user last logged in",
        default: "serverTimestamp()",
      },
    },
  }
  
  // Create a default onboarding data object with default values
  export const createDefaultOnboardingData = () => {
    return {
      authentication: {
        uid: "",
        email: "",
        displayName: "",
        emailVerified: false,
        rememberMe: false,
      },
      studyPreferences: {
        studyGoal: ONBOARDING_SCHEMA.studyPreferences.studyGoal.default,
        learningStyle: ONBOARDING_SCHEMA.studyPreferences.learningStyle.default,
        studyTimeMinutes: ONBOARDING_SCHEMA.studyPreferences.studyTimeMinutes.default,
        subjects: [...ONBOARDING_SCHEMA.studyPreferences.subjects.default],
      },
      appSettings: {
        createdAt: null,
        lastLogin: null,
      },
    }
  }
  
  // Utility function to validate onboarding data against the schema
  export const validateOnboardingData = (data) => {
    const errors = {}
  
    // Validate authentication data
    if (!data.authentication.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(data.authentication.email)) {
      errors.email = "Email is invalid"
    }
  
    if (!data.authentication.displayName) {
      errors.displayName = "Name is required"
    }
  
    // Validate study preferences
    if (!ONBOARDING_SCHEMA.studyPreferences.studyGoal.options.includes(data.studyPreferences.studyGoal)) {
      errors.studyGoal = "Invalid study goal selected"
    }
  
    if (!ONBOARDING_SCHEMA.studyPreferences.learningStyle.options.includes(data.studyPreferences.learningStyle)) {
      errors.learningStyle = "Invalid learning style selected"
    }
  
    const { range } = ONBOARDING_SCHEMA.studyPreferences.studyTimeMinutes
    if (data.studyPreferences.studyTimeMinutes < range[0] || data.studyPreferences.studyTimeMinutes > range[1]) {
      errors.studyTimeMinutes = `Study time must be between ${range[0]} and ${range[1]} minutes`
    }
  
    // Validate subjects
    if (data.studyPreferences.subjects.length === 0) {
      errors.subjects = "At least one subject must be selected"
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }
  
  // Export a function to transform onboarding data to Firestore format
  export const transformOnboardingDataForFirestore = (data) => {
    // Remove sensitive data like password
    const { password, ...authData } = data.authentication
  
    return {
      ...authData,
      ...data.studyPreferences,
      ...data.appSettings,
      // Add any additional transformations needed for Firestore
    }
  }
  
  // Export a function to transform Firestore data to app format
  export const transformFirestoreDataToAppFormat = (firestoreData) => {
    return {
      authentication: {
        uid: firestoreData.uid || "",
        email: firestoreData.email || "",
        displayName: firestoreData.displayName || "",
        emailVerified: firestoreData.emailVerified || false,
        rememberMe: false,
      },
      studyPreferences: {
        studyGoal: firestoreData.studyGoal || ONBOARDING_SCHEMA.studyPreferences.studyGoal.default,
        learningStyle: firestoreData.learningStyle || ONBOARDING_SCHEMA.studyPreferences.learningStyle.default,
        studyTimeMinutes: firestoreData.studyTimeMinutes || ONBOARDING_SCHEMA.studyPreferences.studyTimeMinutes.default,
        subjects: firestoreData.subjects || [...ONBOARDING_SCHEMA.studyPreferences.subjects.default],
      },
      appSettings: {
        createdAt: firestoreData.createdAt || null,
        lastLogin: firestoreData.lastLogin || null,
      },
    }
  }
  
  