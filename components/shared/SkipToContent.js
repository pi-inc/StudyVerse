"use client"

import { useState } from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"

const SkipToContent = ({ onPress }) => {
  const [visible, setVisible] = useState(false)

  const handleFocus = () => {
    setVisible(true)
  }

  const handleBlur = () => {
    setVisible(false)
  }

  const handlePress = () => {
    if (onPress) {
      onPress()
    }
    setVisible(false)
  }

  if (!visible) {
    return (
      <TouchableOpacity
        style={[styles.container, styles.hidden]}
        onFocus={handleFocus}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Skip to main content"
        accessibilityHint="Skips the navigation and goes directly to the main content"
      >
        <Text style={styles.text}>Skip to Content</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onBlur={handleBlur}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Skip to main content"
      accessibilityHint="Skips the navigation and goes directly to the main content"
    >
      <Text style={styles.text}>Skip to Content</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#7c3aed",
    padding: 16,
    zIndex: 1000,
    alignItems: "center",
  },
  hidden: {
    transform: [{ translateY: -100 }],
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default SkipToContent

