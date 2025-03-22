import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { useStore } from "../store"
import HomeScreen from "../screens/HomeScreen"
import CourseRequestScreen from "../screens/CourseRequestScreen"
import HelpScreen from "../screens/HelpScreen"

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Courses") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "Tutor") {
            iconName = focused ? "school" : "school-outline"
          } else if (route.name === "Plan") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "Social") {
            iconName = focused ? "people" : "people-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={HomeScreen} />
      <Tab.Screen name="Tutor" component={HomeScreen} />
      <Tab.Screen name="Plan" component={HomeScreen} />
      <Tab.Screen name="Social" component={HomeScreen} />
    </Tab.Navigator>
  )
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="Course Request" component={CourseRequestScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  )
}

const AppNavigator = () => {
  const user = useStore((state) => state.user)

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Root" component={DrawerNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator

