"use client"

import { useEffect, useState } from "react"
import { StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Import ThemeProvider
import { ThemeProvider, useTheme } from "./context/ThemeContext"

// Screens
import HomeScreen from "./screens/HomeScreen"
import LearnScreen from "./screens/LearnScreen"
import PlanScreen from "./screens/PlanScreen"
import CommunityScreen from "./screens/CommunityScreen"
import CourseDetailScreen from "./screens/CourseDetailScreen"
import ModuleDetailScreen from "./screens/ModuleDetailScreen"
import AITutorScreen from "./screens/AITutorScreen"
import HelpScreen from "./screens/HelpScreen"
import SettingsScreen from "./screens/SettingsScreen"
import ReviewScreen from "./screens/ReviewScreen"
import OnboardingScreen from "./screens/OnboardingScreen"
import ReviseScreen from "./screens/ReviseScreen"

// Auth Components - importing from the correct location

// Components
import ErrorBoundary from "./components/shared/ErrorBoundary"
import LoadingScreen from "./components/shared/LoadingScreen"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
try {
  initializeApp(firebaseConfig)
  console.log("Firebase is initialized")
} catch (error) {
  console.error("Firebase initialization error:", error)
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Main tab navigator with theme support
function MainTabs() {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Learn") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "Plan") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "Revise") {
            iconName = focused ? "refresh" : "refresh-outline"
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.card,
          borderTopColor: theme.colors.background.accent,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Revise" component={ReviewScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  )
}

// Main app component with theme-aware status bar
function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [skipAuth, setSkipAuth] = useState(false)
  const { theme, isDark } = useTheme()

  // Set up Firebase authentication listener
  useEffect(() => {
    const auth = getAuth()
    console.log("Starting Firebase auth check...")
    setIsLoading(true) // Explicitly set loading to true

    // Note: In React Native, Firebase automatically uses AsyncStorage for persistence
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        try {
          // Only update authentication state if it's actually different
          // This prevents unnecessary re-renders and navigation issues
          const newAuthState = !!user
          if (isAuthenticated !== newAuthState) {
            console.log("Auth state changed:", newAuthState)
            setIsAuthenticated(newAuthState)
          }

          // Enhanced logging
          console.log("Auth state resolved on reload:", user ? user.uid : "none")

          if (user) {
            console.log("Auth persistence verified:")
            console.log("- Email:", user.email || "not available")
            console.log("- UID:", user.uid)
            console.log("- Display Name:", user.displayName || "not set")
            console.log("- Email Verified:", user.emailVerified)
          } else {
            console.log("User is signed out")
          }
        } catch (error) {
          console.error("Error processing auth state:", error)
        } finally {
          // Always set isLoading to false after auth state is processed
          setIsLoading(false)
        }
      },
      (error) => {
        console.error("Auth state observer error:", error)
        setIsLoading(false) // Ensure loading ends even on error
      },
    )

    // Clean up the listener on unmount
    return () => unsubscribe()
  }, [isAuthenticated])

  // Log authentication state changes
  useEffect(() => {
    if (!isLoading) {
      console.log("Authentication state updated:", isAuthenticated)
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background.primary }]}>
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={theme.colors.background.primary}
        />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background.primary },
            }}
          >
            {!skipAuth ? (
              // Show onboarding regardless of authentication status for now
              // This preserves the existing logic while adding the authentication check
              <>
                <Stack.Screen name="Onboarding">
                  {(props) => (
                    <OnboardingScreen
                      {...props}
                      setSkipAuth={setSkipAuth}
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                    />
                  )}
                </Stack.Screen>
              </>
            ) : (
              // Main app screens - only show when onboarding is complete or skipped
              <>
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
                <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
                <Stack.Screen name="AITutor" component={AITutorScreen} />
                <Stack.Screen name="Help" component={HelpScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen name="Revise" component={ReviseScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ErrorBoundary>
  )
}

// Wrap the app with ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})

