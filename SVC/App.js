import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
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
import AITutorButton from "./components/shared/AITutorButton"

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

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: { backgroundColor: "#0a0a1a" },
        }}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

