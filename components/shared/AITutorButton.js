"use client"

import { useRef, useEffect, useState } from "react"
import { TouchableOpacity, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"

const AITutorButton = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const scaleAnim = useRef(new Animated.Value(0)).current
  const [currentRouteName, setCurrentRouteName] = useState("")

  // Get the current route name, including nested navigators
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      // Get the active route name
      const getCurrentRoute = (state) => {
        if (!state) return null

        const route = state.routes[state.index]

        // If nested navigator, dig deeper
        if (route.state) {
          return getCurrentRoute(route.state)
        }

        return route.name
      }

      const currentRoute = getCurrentRoute(navigation.getState())
      setCurrentRouteName(currentRoute)
    })

    // Initial route
    const state = navigation.getState()
    if (state) {
      const route = state.routes[state.index]
      if (route.state && route.state.routes) {
        setCurrentRouteName(route.state.routes[route.state.index].name)
      } else {
        setCurrentRouteName(route.name)
      }
    }

    return unsubscribe
  }, [navigation])

  // Animate the button when it appears
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 60,
      useNativeDriver: true,
    }).start()
  }, [])

  const handlePress = () => {
    navigation.navigate("AITutor")
  }

  // Don't show on Social screen or when already on AITutor screen
  if (currentRouteName === "Social" || currentRouteName === "AITutor") {
    return null
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: scaleAnim },
            {
              translateY: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
          opacity: scaleAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityLabel="Ask AI Tutor"
        accessibilityHint="Opens the AI Tutor chat interface"
      >
        <Ionicons name="bulb" size={24} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    bottom: 80, // Position above the tab bar
    zIndex: 999,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

export default AITutorButton

