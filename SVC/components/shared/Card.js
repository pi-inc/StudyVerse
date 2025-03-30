"use client"

import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useAnimatedScale } from "../../hooks/useAnimatedScale"

const Card = ({
  children,
  variant = "default", // default, outline, flat
  color,
  onPress,
  style,
  contentStyle,
  animated = true,
}) => {
  const { scale, handlePressIn, handlePressOut } = useAnimatedScale()

  // Determine card style based on variant
  const getCardStyle = () => {
    switch (variant) {
      case "outline":
        return styles.outlineCard
      case "flat":
        return styles.flatCard
      default:
        return styles.defaultCard
    }
  }

  // If card is pressable, wrap in TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          getCardStyle(),
          color && { borderLeftColor: color },
          style,
          animated && { transform: [{ scale }] },
        ]}
        onPress={onPress}
        onPressIn={animated ? handlePressIn : undefined}
        onPressOut={animated ? handlePressOut : undefined}
        activeOpacity={0.9}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </TouchableOpacity>
    )
  }

  // Otherwise, just render a View
  return (
    <View style={[styles.card, getCardStyle(), color && { borderLeftColor: color }, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  defaultCard: {
    backgroundColor: "#1a1a2e",
    borderLeftWidth: 0,
  },
  outlineCard: {
    backgroundColor: "#1a1a2e",
    borderLeftWidth: 4,
  },
  flatCard: {
    backgroundColor: "transparent",
    borderLeftWidth: 0,
  },
  content: {
    padding: 16,
  },
})

export default Card

