"use client"

import React, { useEffect } from "react"
import { Animated, StyleSheet, type ViewStyle } from "react-native"

interface PageTransitionProps {
  children: React.ReactNode
  type?: "fade" | "slide" | "scale"
  duration?: number
  style?: ViewStyle
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, type = "fade", duration = 300, style }) => {
  const opacity = React.useRef(new Animated.Value(0)).current
  const translateX = React.useRef(new Animated.Value(50)).current
  const scale = React.useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = []

    if (type === "fade" || type === "slide" || type === "scale") {
      animations.push(
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      )
    }

    if (type === "slide") {
      animations.push(
        Animated.timing(translateX, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      )
    }

    if (type === "scale") {
      animations.push(
        Animated.timing(scale, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      )
    }

    Animated.parallel(animations).start()

    return () => {
      opacity.setValue(0)
      translateX.setValue(50)
      scale.setValue(0.95)
    }
  }, [opacity, translateX, scale, type, duration])

  const getAnimatedStyle = () => {
    const animatedStyle: any = { opacity }

    if (type === "slide") {
      animatedStyle.transform = [{ translateX }]
    } else if (type === "scale") {
      animatedStyle.transform = [{ scale }]
    }

    return animatedStyle
  }

  return <Animated.View style={[styles.container, style, getAnimatedStyle()]}>{children}</Animated.View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PageTransition

