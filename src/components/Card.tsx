"use client"

import type React from "react"
import { StyleSheet, View, type ViewProps } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface CardProps extends ViewProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "elevated"
}

export const Card: React.FC<CardProps> = ({ children, variant = "default", style, ...props }) => {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: variant === "outline" ? theme.border : "transparent",
          shadowColor: variant === "elevated" ? "#000" : "transparent",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

export const CardHeader: React.FC<ViewProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  )
}

export const CardContent: React.FC<ViewProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  )
}

export const CardFooter: React.FC<ViewProps> = ({ children, style, ...props }) => {
  const { theme } = useTheme()

  return (
    <View style={[styles.cardFooter, { borderTopColor: theme.border }, style]} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  cardContent: {
    padding: 16,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
})

