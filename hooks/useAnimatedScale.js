"use client"

import { useRef, useEffect } from "react"
import { Animated } from "react-native"

export const useAnimatedScale = (initialScale = 1, scaleValue = 0.98) => {
  const scale = useRef(new Animated.Value(initialScale)).current

  // Initialize the scale value
  useEffect(() => {
    scale.setValue(initialScale)
  }, [initialScale])

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: scaleValue,
      duration: 50,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: initialScale,
      friction: 3,
      tension: 60,
      useNativeDriver: true,
    }).start()
  }

  return { scale, handlePressIn, handlePressOut }
}

