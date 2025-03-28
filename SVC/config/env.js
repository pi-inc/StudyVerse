// Environment variables configuration
// Access all environment variables here to keep them organized

export const FIREBASE_CONFIG = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
  
  export const API_CONFIG = {
    url: process.env.EXPO_PUBLIC_API_URL,
  }
  
  export const AI_CONFIG = {
    geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  }
  
  // Helper function to check if Firebase config is valid
  export const isFirebaseConfigValid = () => {
    return (
      FIREBASE_CONFIG.apiKey &&
      FIREBASE_CONFIG.authDomain &&
      FIREBASE_CONFIG.projectId &&
      FIREBASE_CONFIG.storageBucket &&
      FIREBASE_CONFIG.messagingSenderId &&
      FIREBASE_CONFIG.appId
    )
  }
  
  