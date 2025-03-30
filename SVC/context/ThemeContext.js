"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { themes } from "../styles/theme"

// Create the theme context
const ThemeContext = createContext({
  theme: themes.dark,
  isDark: true,
  toggleTheme: () => {},
  setTheme: (theme) => {},
})

// Theme storage key
const THEME_STORAGE_KEY = "@studyverse_theme"

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Get device color scheme
  const deviceTheme = useColorScheme()

  // State to track the current theme
  const [themeType, setThemeType] = useState("dark")

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)

        if (savedTheme) {
          // Use saved theme if available
          setThemeType(savedTheme)
        } else if (deviceTheme) {
          // Otherwise use device theme if available
          setThemeType(deviceTheme)
        }
      } catch (error) {
        console.error("Failed to load theme:", error)
      }
    }

    loadTheme()
  }, [deviceTheme])

  // Save theme when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, themeType)
      } catch (error) {
        console.error("Failed to save theme:", error)
      }
    }

    saveTheme()
  }, [themeType])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeType((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  // Set a specific theme
  const setTheme = (theme) => {
    setThemeType(theme)
  }

  // Get the current theme object
  const theme = themes[themeType] || themes.dark

  // Context value
  const contextValue = {
    theme,
    isDark: themeType === "dark",
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext)

