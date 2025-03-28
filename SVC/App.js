"use client"

import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { View, Text } from "react-native"
import HomeScreen from "./screens/HomeScreen"
import CommunityScreen from "./screens/CommunityScreen"
import PlanScreen from "./screens/PlanScreen"
import LearnScreen from "./screens/LearnScreen"
import ReviewScreen from "./screens/ReviewScreen"
import ProfileScreen from "./screens/ProfileScreen"
import HelpScreen from "./screens/HelpScreen"
import SettingsScreen from "./screens/SettingsScreen"
import AboutScreen from "./screens/AboutScreen"
import AITutorScreen from "./screens/AITutorScreen"
import OnboardingScreen from "./screens/OnboardingScreen"
import AITutorButton from "./components/shared/AITutorButton"
import { app as firebaseApp } from "./services/firebase"
// Add this import at the top of the file
import TestScreen from "./screens/TestScreen"
// Add these imports at the top of the file
import { useState, useEffect } from "react"
import { subscribeToAuthChanges } from "./services/auth"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TabNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0a0a1a",
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: "#8a70ff",
          tabBarInactiveTintColor: "#6b7280",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Plan") {
              iconName = focused ? "calendar" : "calendar-outline"
            } else if (route.name === "Learn") {
              iconName = focused ? "book" : "book-outline"
            } else if (route.name === "Review") {
              iconName = focused ? "refresh" : "refresh-outline"
            } else if (route.name === "Social") {
              iconName = focused ? "people" : "people-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Review" component={ReviewScreen} />
        <Tab.Screen name="Social" component={CommunityScreen} />
      </Tab.Navigator>
      <AITutorButton />
    </View>
  )
}

// Replace the existing App component with this updated version
export default function App() {
  // Set this to true to show onboarding on app start
  const showOnboarding = false
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState(null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    // Check if Firebase is initialized
    try {
      if (firebaseApp) {
        console.log("Firebase is initialized")
        setIsInitialized(true)
      } else {
        console.warn("Firebase app is not available")
        // Still allow the app to run even if Firebase isn't initialized
        setIsInitialized(true)
      }
    } catch (error) {
      console.error("Error checking Firebase initialization:", error)
      setInitError(error.message)
      // Still allow the app to run with an error message
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user)
      setAuthLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  if (!isInitialized || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0a1a" }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Loading...</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {initError && (
        <View
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.9)",
            padding: 10,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Warning: {initError}</Text>
        </View>
      )}
      <Stack.Navigator
        initialRouteName={user ? "Main" : "Onboarding"}
        screenOptions={{
          headerShown: false,
          animation: "fade", // Changed from "none" to "fade" for smoother transitions
          contentStyle: { backgroundColor: "#0a0a1a" },
        }}
      >
        {user ? (
          // Authenticated routes
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="AITutor" component={AITutorScreen} />

            {/* Add additional screens for deep linking */}
            <Stack.Screen name="CourseDetails" component={LearnScreen} />
            <Stack.Screen name="StudySession" component={CommunityScreen} />
            <Stack.Screen name="Messages" component={CommunityScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
          </>
        ) : (
          // Unauthenticated routes - only show onboarding
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ gestureEnabled: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

