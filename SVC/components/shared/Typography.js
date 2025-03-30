"use client"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const Heading = ({ children, size = "lg", style, ...props }) => {
  const { theme } = useTheme()

  const getFontSize = () => {
    switch (size) {
      case "xs":
        return theme.fontSizes.md
      case "sm":
        return theme.fontSizes.lg
      case "md":
        return theme.fontSizes.xl
      case "lg":
        return theme.fontSizes.xxl
      case "xl":
        return theme.fontSizes.xxxl
      default:
        return theme.fontSizes.lg
    }
  }

  return (
    <Text
      style={[
        styles.heading,
        {
          fontSize: getFontSize(),
          color: theme.colors.text.primary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

export const Paragraph = ({ children, size = "md", style, ...props }) => {
  const { theme } = useTheme()

  const getFontSize = () => {
    switch (size) {
      case "xs":
        return theme.fontSizes.xs
      case "sm":
        return theme.fontSizes.sm
      case "md":
        return theme.fontSizes.md
      case "lg":
        return theme.fontSizes.lg
      default:
        return theme.fontSizes.md
    }
  }

  return (
    <Text
      style={[
        styles.paragraph,
        {
          fontSize: getFontSize(),
          color: theme.colors.text.secondary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

export const Caption = ({ children, style, ...props }) => {
  const { theme } = useTheme()

  return (
    <Text
      style={[
        styles.caption,
        {
          fontSize: theme.fontSizes.xs,
          color: theme.colors.text.tertiary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    lineHeight: 22,
    marginBottom: 16,
  },
  caption: {
    marginBottom: 4,
  },
})

