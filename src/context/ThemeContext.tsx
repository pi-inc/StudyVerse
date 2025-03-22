"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"
import { useStore } from "../store"

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const isDarkMode = useStore((state) => state.isDarkMode)
  const toggleDarkMode = useStore((state) => state.toggleDarkMode)

  // Sync with system theme on initial load
  useEffect(() => {
    if (colorScheme === "dark" && !isDarkMode) {
      toggleDarkMode()
    }
  }, [])

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme: toggleDarkMode }}>{children}</ThemeContext.Provider>
}

