"use client"

import type React from "react"
import { StyleSheet, View, Text, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface BadgeProps {
  label: string
  variant?: "default" | "outline" | "secondary"
  color?: string
  style?: ViewStyle
  textStyle?: TextStyle
  icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "default", color, style, textStyle, icon }) => {
  const { theme } = useTheme()

  // Determine badge styles based on variant
  const getBadgeStyles = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: color || theme.primary,
          borderWidth: 1,
        }
      case "secondary":
        return {
          backgroundColor: theme.secondary,
        }
      default:
        return {
          backgroundColor: color || theme.primary,
        }
    }
  }

  // Determine text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case "outline":
        return color || theme.primary
      case "secondary":
        return theme.secondaryForeground
      default:
        return theme.primaryForeground
    }
  }

  const badgeStyles = getBadgeStyles()
  const textColor = getTextColor()

  return (
    <View style={[styles.badge, badgeStyles, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, { color: textColor }, textStyle]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  text: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  iconContainer: {
    marginRight: 4,
  },
})

