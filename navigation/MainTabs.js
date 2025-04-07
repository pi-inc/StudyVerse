import { createBottomTabNavigator } from "@react-navigation/bottom-tab-navigator"
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from "../screens/HomeScreen"
import LearnScreen from "../screens/LearnScreen"
import PlanScreen from "../screens/PlanScreen"
import CommunityScreen from "../screens/CommunityScreen"
import ProfileScreen from "../screens/ProfileScreen"
import theme from "../theme"
// Import ReviseScreen at the top of the file
import ReviseScreen from "../screens/ReviseScreen"

const Tab = createBottomTabNavigator()

const MainTabs = () => {
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
          } else if (route.name === "Revise") {
            iconName = focused ? "refresh" : "refresh-outline"
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
      <Tab.Screen name="Revise" component={ReviseScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default MainTabs

