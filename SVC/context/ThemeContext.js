"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import { lightTheme, darkTheme } from "../styles/theme"

// Create the context
const ThemeContext = createContext()

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Get device color scheme
  const deviceTheme = useColorScheme()
  const [themeMode, setThemeMode] = useState("system") // 'light', 'dark', or 'system'

  // Determine the actual theme based on mode and device setting
  const getActiveTheme = () => {
    if (themeMode === "system") {
      return deviceTheme === "dark" ? darkTheme : lightTheme
    }
    return themeMode === "dark" ? darkTheme : lightTheme
  }

  const [theme, setTheme] = useState(getActiveTheme())

  // Update theme when device theme changes or user preference changes
  useEffect(() => {
    setTheme(getActiveTheme())
  }, [deviceTheme, themeMode])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === "system") return "light"
      if (prev === "light") return "dark"
      return "system"
    })
  }

  // Set a specific theme
  const setMode = (mode) => {
    if (["light", "dark", "system"].includes(mode)) {
      setThemeMode(mode)
    }
  }

  const value = {
    theme,
    themeMode,
    toggleTheme,
    setMode,
    isDark: theme === darkTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext

