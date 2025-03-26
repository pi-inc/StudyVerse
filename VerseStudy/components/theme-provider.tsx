"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ColorTheme = "purple" | "blue" | "teal" | "green"
type FontSize = "small" | "medium" | "large"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColorTheme?: ColorTheme
  defaultFontSize?: FontSize
  defaultAnimations?: boolean
}

interface ThemeContextType {
  theme: Theme
  colorTheme: ColorTheme
  fontSize: FontSize
  animations: boolean
  setTheme: (theme: Theme) => void
  setColorTheme: (colorTheme: ColorTheme) => void
  setFontSize: (fontSize: FontSize) => void
  setAnimations: (animations: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColorTheme = "purple",
  defaultFontSize = "medium",
  defaultAnimations = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [colorTheme, setColorTheme] = useState<ColorTheme>(defaultColorTheme)
  const [fontSize, setFontSize] = useState<FontSize>(defaultFontSize)
  const [animations, setAnimations] = useState<boolean>(defaultAnimations)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme | null
    const savedFontSize = localStorage.getItem("fontSize") as FontSize | null
    const savedAnimations = localStorage.getItem("animations")

    if (savedTheme) setTheme(savedTheme)
    if (savedColorTheme) setColorTheme(savedColorTheme)
    if (savedFontSize) setFontSize(savedFontSize)
    if (savedAnimations !== null) setAnimations(savedAnimations === "true")
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    // Handle theme
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Handle color theme
    root.classList.remove("theme-purple", "theme-blue", "theme-teal", "theme-green")
    root.classList.add(`theme-${colorTheme}`)

    // Apply CSS variables based on the selected color theme
    switch (colorTheme) {
      case "purple":
        root.style.setProperty("--primary", theme === "dark" ? "250 95% 64%" : "250 95% 54%")
        break
      case "blue":
        root.style.setProperty("--primary", theme === "dark" ? "214 95% 64%" : "214 95% 54%")
        break
      case "teal":
        root.style.setProperty("--primary", theme === "dark" ? "173 80% 45%" : "173 80% 40%")
        break
      case "green":
        root.style.setProperty("--primary", theme === "dark" ? "142 70% 45%" : "142 70% 40%")
        break
      default:
        // Default to purple
        root.style.setProperty("--primary", theme === "dark" ? "250 95% 64%" : "250 95% 54%")
    }

    // Handle font size
    root.classList.remove("text-sm", "text-base", "text-lg")
    switch (fontSize) {
      case "small":
        root.classList.add("text-sm")
        break
      case "medium":
        root.classList.add("text-base")
        break
      case "large":
        root.classList.add("text-lg")
        break
    }

    // Handle animations
    if (!animations) {
      root.classList.add("no-animations")
    } else {
      root.classList.remove("no-animations")
    }

    // Save preferences
    localStorage.setItem("theme", theme)
    localStorage.setItem("colorTheme", colorTheme)
    localStorage.setItem("fontSize", fontSize)
    localStorage.setItem("animations", animations.toString())
  }, [theme, colorTheme, fontSize, animations])

  const value = {
    theme,
    colorTheme,
    fontSize,
    animations,
    setTheme,
    setColorTheme,
    setFontSize,
    setAnimations,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

