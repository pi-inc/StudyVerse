"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Define theme colors
const lightTheme = {
  background: "#FFFFFF",
  foreground: "#000000",
  card: "#FFFFFF",
  cardForeground: "#000000",
  popover: "#FFFFFF",
  popoverForeground: "#000000",
  primary: "#6366F1",
  primaryForeground: "#FFFFFF",
  secondary: "#F4F4F5",
  secondaryForeground: "#18181B",
  muted: "#F4F4F5",
  mutedForeground: "#71717A",
  accent: "#F4F4F5",
  accentForeground: "#18181B",
  destructive: "#EF4444",
  destructiveForeground: "#FFFFFF",
  border: "#E4E4E7",
  input: "#E4E4E7",
  ring: "#6366F1",
  study: {
    yellow: "#FFC107",
    green: "#10B981",
    red: "#EF4444",
    blue: "#3B82F6",
    purple: "#8B5CF6",
    pink: "#EC4899",
  },
}

const darkTheme = {
  background: "#18181B",
  foreground: "#FFFFFF",
  card: "#27272A",
  cardForeground: "#FFFFFF",
  popover: "#27272A",
  popoverForeground: "#FFFFFF",
  primary: "#6366F1",
  primaryForeground: "#FFFFFF",
  secondary: "#3F3F46",
  secondaryForeground: "#FFFFFF",
  muted: "#3F3F46",
  mutedForeground: "#A1A1AA",
  accent: "#3F3F46",
  accentForeground: "#FFFFFF",
  destructive: "#EF4444",
  destructiveForeground: "#FFFFFF",
  border: "#3F3F46",
  input: "#3F3F46",
  ring: "#6366F1",
  study: {
    yellow: "#FFC107",
    green: "#10B981",
    red: "#EF4444",
    blue: "#3B82F6",
    purple: "#8B5CF6",
    pink: "#EC4899",
  },
}

// Define theme type
type Theme = typeof lightTheme

// Define context type
type ThemeContextType = {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark" | "system") => void
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Create provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system")
  const [isDark, setIsDark] = useState<boolean>(colorScheme === "dark")

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("@studyverse_theme")
        if (savedTheme) {
          setThemeMode(savedTheme as "light" | "dark" | "system")
        }
      } catch (error) {
        console.error("Error loading theme:", error)
      }
    }

    loadTheme()
  }, [])

  // Update isDark when themeMode or system preference changes
  useEffect(() => {
    if (themeMode === "system") {
      setIsDark(colorScheme === "dark")
    } else {
      setIsDark(themeMode === "dark")
    }
  }, [themeMode, colorScheme])

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setTheme(newTheme)
  }

  // Set specific theme
  const setTheme = async (mode: "light" | "dark" | "system") => {
    setThemeMode(mode)
    try {
      await AsyncStorage.setItem("@studyverse_theme", mode)
    } catch (error) {
      console.error("Error saving theme:", error)
    }
  }

  // Get current theme object
  const theme = isDark ? darkTheme : lightTheme

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

// Create hook to use the context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

