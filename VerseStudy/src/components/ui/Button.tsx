"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type TouchableOpacityProps } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../../context/ThemeContext"
import * as Haptics from "expo-haptics"

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  gradient?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  isLoading = false,
  gradient = false,
  style,
  onPress,
  ...props
}) => {
  const { theme } = useTheme()

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress && onPress()
  }

  // Determine styles based on variant
  let backgroundColor, textColor, borderColor, borderWidth

  switch (variant) {
    case "outline":
      backgroundColor = "transparent"
      textColor = theme.primary
      borderColor = theme.primary
      borderWidth = 1
      break
    case "ghost":
      backgroundColor = "transparent"
      textColor = theme.foreground
      borderColor = "transparent"
      borderWidth = 0
      break
    case "link":
      backgroundColor = "transparent"
      textColor = theme.primary
      borderColor = "transparent"
      borderWidth = 0
      break
    default:
      backgroundColor = theme.primary
      textColor = theme.primaryForeground
      borderColor = "transparent"
      borderWidth = 0
  }

  // Determine padding based on size
  let paddingVertical, paddingHorizontal, fontSize

  switch (size) {
    case "sm":
      paddingVertical = 6
      paddingHorizontal = 12
      fontSize = 14
      break
    case "lg":
      paddingVertical = 12
      paddingHorizontal = 24
      fontSize = 18
      break
    default:
      paddingVertical = 10
      paddingHorizontal = 16
      fontSize = 16
  }

  const buttonStyles = [
    styles.button,
    {
      backgroundColor,
      borderColor,
      borderWidth,
      paddingVertical,
      paddingHorizontal,
    },
    style,
  ]

  const textStyles = [
    styles.text,
    {
      color: textColor,
      fontSize,
    },
  ]

  if (gradient && variant === "default") {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        disabled={isLoading}
        style={[styles.buttonContainer, style]}
        {...props}
      >
        <LinearGradient
          colors={[theme.study.purple, theme.study.blue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.button,
            {
              paddingVertical,
              paddingHorizontal,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.primaryForeground} />
          ) : (
            <Text style={textStyles}>{children}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress} disabled={isLoading} style={buttonStyles} {...props}>
      {isLoading ? <ActivityIndicator size="small" color={textColor} /> : <Text style={textStyles}>{children}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
})

export default Button

