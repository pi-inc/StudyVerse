"use client"

import { useEffect, useState } from "react"
import { StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { colors } from "./styles/theme"

// Screens
import HomeScreen from "./screens/HomeScreen"
import LearnScreen from "./screens/LearnScreen"
import PlanScreen from "./screens/PlanScreen"
import CommunityScreen from "./screens/CommunityScreen"
import ProfileScreen from "./screens/ProfileScreen"
import CourseDetailScreen from "./screens/CourseDetailScreen"
import ModuleDetailScreen from "./screens/ModuleDetailScreen"
import AITutorScreen from "./screens/AITutorScreen"
import HelpScreen from "./screens/HelpScreen"
import SettingsScreen from "./screens/SettingsScreen"
import ReviewScreen from "./screens/ReviewScreen"
import OnboardingScreen from "./screens/OnboardingScreen"

// Auth Components - importing from the correct location
import SignInStep from "./components/onboarding/SignInStep"
import SignUpStep from "./components/onboarding/SignUpStep"
import ForgotPasswordStep from "./components/onboarding/ForgotPasswordStep"

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

function MainTabs() {
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
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopColor: colors.border.dark,
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
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

// Create wrapper components for the auth steps to use as screens
const SignInScreen = (props) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const updateUserData = (data) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  return (
    <SignInStep
      {...props}
      userData={userData}
      updateUserData={updateUserData}
      goToSignUp={() => props.navigation.navigate("SignUp")}
      goToForgotPassword={() => props.navigation.navigate("ForgotPassword")}
    />
  )
}
const SignUpScreen = (props) => <SignUpStep {...props} />
const ForgotPasswordScreen = (props) => <ForgotPasswordStep {...props} />

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [skipAuth, setSkipAuth] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background.dark} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background.dark },
            }}
          >
            {!isAuthenticated && !skipAuth ? (
              // Auth screens
              <>
                <Stack.Screen
                  name="Onboarding"
                  component={(props) => <OnboardingScreen {...props} setSkipAuth={setSkipAuth} />}
                />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              </>
            ) : (
              // Main app screens
              <>
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
                <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
                <Stack.Screen name="AITutor" component={AITutorScreen} />
                <Stack.Screen name="Help" component={HelpScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Review" component={ReviewScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ErrorBoundary>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.dark,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})

