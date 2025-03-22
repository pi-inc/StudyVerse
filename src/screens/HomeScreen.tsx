import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import tw from "twrnc"
import { useStore } from "../store"
import { Button } from "../components/ui/Button"

const HomeScreen = () => {
  const { isDarkMode, toggleDarkMode, user, login, logout } = useStore()

  const handleLogin = async () => {
    try {
      await login("user@example.com", "password")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <ScrollView style={tw`flex-1 bg-${isDarkMode ? "gray-900" : "white"}`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-2xl font-bold mb-6 text-${isDarkMode ? "white" : "gray-900"}`}>Welcome to StudyVerse</Text>

        <View style={tw`mb-6 p-4 bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg`}>
          <Text style={tw`text-lg font-semibold mb-2 text-${isDarkMode ? "white" : "gray-900"}`}>
            {user ? `Hello, ${user.name}!` : "Get Started"}
          </Text>
          <Text style={tw`text-${isDarkMode ? "gray-300" : "gray-600"} mb-4`}>
            {user ? "Continue your learning journey" : "Sign in to access your personalized study materials"}
          </Text>

          {user ? (
            <Button title="Logout" variant="outline" onPress={logout} />
          ) : (
            <Button title="Login" variant="primary" onPress={handleLogin} />
          )}
        </View>

        <View style={tw`flex-row justify-between mb-6`}>
          <TouchableOpacity
            style={tw`flex-1 mr-2 p-4 bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg items-center`}
            onPress={() => {}}
          >
            <Ionicons name="book-outline" size={24} color={isDarkMode ? "#FFFFFF" : "#4B5563"} />
            <Text style={tw`mt-2 text-${isDarkMode ? "white" : "gray-900"}`}>Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-1 ml-2 p-4 bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg items-center`}
            onPress={() => {}}
          >
            <Ionicons name="school-outline" size={24} color={isDarkMode ? "#FFFFFF" : "#4B5563"} />
            <Text style={tw`mt-2 text-${isDarkMode ? "white" : "gray-900"}`}>Tutor</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-between mb-6`}>
          <TouchableOpacity
            style={tw`flex-1 mr-2 p-4 bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg items-center`}
            onPress={() => {}}
          >
            <Ionicons name="calendar-outline" size={24} color={isDarkMode ? "#FFFFFF" : "#4B5563"} />
            <Text style={tw`mt-2 text-${isDarkMode ? "white" : "gray-900"}`}>Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-1 ml-2 p-4 bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg items-center`}
            onPress={() => {}}
          >
            <Ionicons name="people-outline" size={24} color={isDarkMode ? "#FFFFFF" : "#4B5563"} />
            <Text style={tw`mt-2 text-${isDarkMode ? "white" : "gray-900"}`}>Social</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`p-4 bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg flex-row items-center justify-between mb-6`}
          onPress={toggleDarkMode}
        >
          <View style={tw`flex-row items-center`}>
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={24}
              color={isDarkMode ? "#FFFFFF" : "#4B5563"}
              style={tw`mr-3`}
            />
            <Text style={tw`text-${isDarkMode ? "white" : "gray-900"}`}>{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#FFFFFF" : "#4B5563"} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

