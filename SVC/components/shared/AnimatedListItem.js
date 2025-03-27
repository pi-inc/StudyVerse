"use client"

import { useRef, useEffect } from "react"
import { Animated, StyleSheet, TouchableOpacity } from "react-native"

const AnimatedListItem = ({ children, index = 0, onPress, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Reduced from 500
        delay: index * 50, // Reduced from 100
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300, // Reduced from 500
        delay: index * 50, // Reduced from 100
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handlePressIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.8,
      duration: 50, // Reduced from 100
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100, // Reduced from 200
      useNativeDriver: true,
    }).start()
  }

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
        <Animated.View style={[styles.container, animatedStyle, style]}>{children}</Animated.View>
      </TouchableOpacity>
    )
  }

  return <Animated.View style={[styles.container, animatedStyle, style]}>{children}</Animated.View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
})

export default AnimatedListItem

