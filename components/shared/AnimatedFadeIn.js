"use client"

import { useRef, useEffect } from "react"
import { Animated } from "react-native"

const AnimatedFadeIn = ({ children, duration = 800, delay = 0, translateY = 30, style = {} }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(translateY)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
}

export default AnimatedFadeIn

