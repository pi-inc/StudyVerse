"use client"

import { useEffect, useRef } from "react"
import { Animated } from "react-native"

const AnimatedListItem = ({ children, index = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    const delay = index * 100
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [index])

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: translateYAnim }],
        marginBottom: 12,
      }}
    >
      {children}
    </Animated.View>
  )
}

export default AnimatedListItem

