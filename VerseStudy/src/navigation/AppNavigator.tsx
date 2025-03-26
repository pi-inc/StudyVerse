"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useTheme } from "../context/ThemeContext"
import { useOnboarding } from "../context/OnboardingContext"
import HomeScreen from "../screens/HomeScreen"
import CoursesScreen from "../screens/CoursesScreen"
import CourseDetailScreen from "../screens/CourseDetailScreen"
import ReviseScreen from "../screens/ReviseScreen"
import PlanScreen from "../screens/PlanScreen"
import SocialScreen from "../screens/SocialScreen"
import SettingsScreen from "../screens/SettingsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"
import OnboardingScreen from "../screens/OnboardingScreen"
import BottomTabBar from "../components/navigation/BottomTabBar"
import DrawerContent from "../components/navigation/DrawerContent"
import { Platform } from "react-native"

// Define the param list for type safety
export type RootStackParamList = {
  Auth: undefined
  Main: undefined
  Onboarding: undefined
  Splash: undefined
}

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
}

export type MainStackParamList = {
  Tabs: undefined
  CourseDetail: { courseId: string }
  Settings: undefined
  Profile: undefined
}

export type TabsParamList = {
  Home: undefined
  Courses: undefined
  Revise: undefined
  Plan: undefined
  Social: undefined
}

// Create the navigators
const Stack = createNativeStackNavigator<RootStackParamList>()
const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const MainStack = createNativeStackNavigator<MainStackParamList>()
const Tab = createBottomTabNavigator<TabsParamList>()
const Drawer = createDrawerNavigator()

// Auth Navigator
const AuthNavigator = () => {
  const { theme } = useTheme()

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  )
}

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Revise" component={ReviseScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Social" component={SocialScreen} />
    </Tab.Navigator>
  )
}

// Main Navigator
const MainNavigator = () => {
  const { theme } = useTheme()

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <MainStack.Screen name="Tabs" component={TabNavigator} />
      <MainStack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <MainStack.Screen name="Settings" component={SettingsScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  )
}

// Drawer Navigator (wraps Main Navigator)
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: Platform.OS === "web" ? "permanent" : "slide",
      }}
    >
      <Drawer.Screen name="MainStack" component={MainNavigator} />
    </Drawer.Navigator>
  )
}

// Root Navigator
const AppNavigator = () => {
  const { theme } = useTheme()
  const { isFirstLaunch } = useOnboarding()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      {isFirstLaunch ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator

