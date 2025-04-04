"use client"

import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAnimatedScale } from "../../hooks/useAnimatedScale"
import { colors, spacing, borderRadius } from "../../styles/theme"

const Button = ({
  text,
  icon,
  iconPosition = "left",
  variant = "primary", // primary, secondary, outline, ghost
  size = "medium", // small, medium, large
  fullWidth = false,
  disabled = false,
  onPress,
  style,
  textStyle,
}) => {
  const { scale, handlePressIn, handlePressOut } = useAnimatedScale()

  // Determine button style based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButton
      case "outline":
        return styles.outlineButton
      case "ghost":
        return styles.ghostButton
      default:
        return styles.primaryButton
    }
  }

  // Determine text style based on variant
  const getTextStyle = () => {
    switch (variant) {
      case "outline":
      case "ghost":
        return styles.outlineButtonText
      default:
        return styles.buttonText
    }
  }

  // Determine button size
  const getButtonSize = () => {
    switch (size) {
      case "small":
        return styles.smallButton
      case "large":
        return styles.largeButton
      default:
        return {}
    }
  }

  // Determine icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case "small":
        return 16
      case "large":
        return 24
      default:
        return 20
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getButtonSize(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && iconPosition === "left" && (
        <Ionicons
          name={icon}
          size={getIconSize()}
          color={variant === "outline" || variant === "ghost" ? colors.primary : colors.text.primary}
          style={styles.leftIcon}
        />
      )}
      <Text
        style={[
          getTextStyle(),
          size === "small" && styles.smallButtonText,
          size === "large" && styles.largeButtonText,
          textStyle,
        ]}
      >
        {text}
      </Text>
      {icon && iconPosition === "right" && (
        <Ionicons
          name={icon}
          size={getIconSize()}
          color={variant === "outline" || variant === "ghost" ? colors.primary : colors.text.primary}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghostButton: {
    backgroundColor: "transparent",
  },
  disabledButton: {
    opacity: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
  smallButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  largeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  buttonText: {
    color: colors.text.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
})

export default Button

