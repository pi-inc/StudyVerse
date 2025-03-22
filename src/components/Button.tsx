"use client"

import type React from "react"
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, type TouchableOpacityProps, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../context/ThemeContext"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "default" | "outline" | "ghost" | "gradient"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "default",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  style,
  disabled,
  ...props
}) => {
  const { theme } = useTheme()

  // Determine button styles based on variant
  const getButtonStyles = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.primary,
          borderWidth: 1,
        }
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        }
      case "gradient":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        }
      default:
        return {
          backgroundColor: theme.primary,
          borderWidth: 0,
        }
    }
  }

  // Determine text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case "outline":
      case "ghost":
        return theme.primary
      default:
        return theme.primaryForeground
    }
  }

  // Determine button size
  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
        }
      case "lg":
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
        }
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
        }
    }
  }

  // Determine text size
  const getTextSize = () => {
    switch (size) {
      case "sm":
        return 12
      case "lg":
        return 16
      default:
        return 14
    }
  }

  const buttonStyles = getButtonStyles()
  const textColor = getTextColor()
  const buttonSize = getButtonSize()
  const textSize = getTextSize()

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={textColor} size="small" />
    }

    const textComponent = (
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: textSize,
            marginLeft: icon && iconPosition === "left" ? 8 : 0,
            marginRight: icon && iconPosition === "right" ? 8 : 0,
          },
        ]}
      >
        {title}
      </Text>
    )

    return (
      <View style={styles.contentContainer}>
        {icon && iconPosition === "left" && icon}
        {textComponent}
        {icon && iconPosition === "right" && icon}
      </View>
    )
  }

  if (variant === "gradient") {
    return (
      <TouchableOpacity
        style={[styles.button, buttonSize, { opacity: disabled ? 0.5 : 1 }]}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        <LinearGradient
          colors={[theme.studyPurple, theme.studyBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, buttonSize]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles, buttonSize, { opacity: disabled ? 0.5 : 1 }, style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "Inter-Medium",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})

