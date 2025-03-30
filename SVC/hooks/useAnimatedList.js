"use client"

import { useRef, useEffect } from "react"
import { Animated } from "react-native"

export const useAnimatedList = (itemCount, options = {}) => {
  const { initialDelay = 0, itemDelay = 50, duration = 300, initialTranslateY = 50 } = options

  // Create an array of animation values for each item
  const itemAnimations = useRef(
    Array(itemCount)
      .fill()
      .map(() => ({
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(initialTranslateY),
      })),
  ).current

  useEffect(() => {
    // Create an array of animation configurations
    const animations = itemAnimations.flatMap((item, index) => [
      Animated.timing(item.opacity, {
        toValue: 1,
        duration,
        delay: initialDelay + index * itemDelay,
        useNativeDriver: true,
      }),
      Animated.timing(item.translateY, {
        toValue: 0,
        duration,
        delay: initialDelay + index * itemDelay,
        useNativeDriver: true,
      }),
    ])

    // Run all animations in parallel
    Animated.parallel(animations).start()

    // Cleanup function
    return () => {
      animations.forEach((anim) => anim.stop())
    }
  }, [itemCount])

  // Return animation styles for each item
  return itemAnimations.map((item) => ({
    opacity: item.opacity,
    transform: [{ translateY: item.translateY }],
  }))
}

