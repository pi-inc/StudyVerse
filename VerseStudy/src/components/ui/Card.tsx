"use client"

import type React from "react"
import { View, StyleSheet, type ViewProps } from "react-native"
import { useTheme } from "../../context/ThemeContext"

interface CardProps extends ViewProps {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
})

export default Card

