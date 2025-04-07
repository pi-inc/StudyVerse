"use client"

import { useEffect, useRef } from "react"
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native"

const CustomToggleSwitch = ({ isOn, onToggle, activeColor, inactiveColor, thumbColor, style }) => {
  // Animation value for the thumb position
  const translateX = useRef(new Animated.Value(isOn ? 20 : 0)).current

  // Update animation when isOn changes (from external state)
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: isOn ? 20 : 0,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start()
  }, [isOn, translateX])

  // Handle the press event - only calls the provided onToggle function
  const handlePress = () => {
    if (onToggle) {
      onToggle()
    }
  }

  // Default colors if not provided
  const trackActiveColor = activeColor || "#7c3aed"
  const trackInactiveColor = inactiveColor || "#e5e7eb"
  const switchThumbColor = thumbColor || "#ffffff"

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles.container, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked: isOn }}
    >
      <View
        style={[
          styles.track,
          {
            backgroundColor: isOn ? trackActiveColor : trackInactiveColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: switchThumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
})

export default CustomToggleSwitch

