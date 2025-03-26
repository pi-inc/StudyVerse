"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "destructive"
  color?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", color }) => {
  const { theme } = useTheme()

  // Determine styles based on variant
  let backgroundColor, textColor, borderColor, borderWidth

  switch (variant) {
    case "outline":
      backgroundColor = "transparent"
      textColor = theme.foreground
      borderColor = theme.border
      borderWidth = 1
      break
    case "secondary":
      backgroundColor = theme.secondary
      textColor = theme.secondaryForeground
      borderColor = "transparent"
      borderWidth = 0
      break
    case "destructive":
      backgroundColor = theme.destructive
      textColor = theme.destructiveForeground
      borderColor = "transparent"
      borderWidth = 0
      break
    default:
      backgroundColor = theme.primary
      textColor = theme.primaryForeground
      borderColor = "transparent"
      borderWidth = 0
  }

  // Override with custom color if provided
  if (color) {
    backgroundColor = color
    textColor = "#FFFFFF" // Assume white text on custom colors
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
})

export default Badge

