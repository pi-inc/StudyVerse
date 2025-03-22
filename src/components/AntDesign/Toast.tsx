"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Text, Animated } from "react-native"
import tw from "twrnc"

interface ToastProps {
  visible: boolean
  content: string
  type?: "info" | "success" | "warning" | "error"
  duration?: number
  onClose?: () => void
}

export const Toast: React.FC<ToastProps> = ({ visible, content, type = "info", duration = 2000, onClose }) => {
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onClose) onClose()
      })
    }
  }, [visible, animation, duration, onClose])

  if (!visible) return null

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return tw`bg-green-500`
      case "warning":
        return tw`bg-yellow-500`
      case "error":
        return tw`bg-red-500`
      default:
        return tw`bg-blue-500`
    }
  }

  return (
    <Animated.View
      style={[
        tw`absolute top-10 self-center px-4 py-2 rounded-lg shadow-lg z-50`,
        getBackgroundColor(),
        {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={tw`text-white font-medium text-center`}>{content}</Text>
    </Animated.View>
  )
}

// Toast manager for imperative API
const toastQueue: Array<{
  content: string
  type: "info" | "success" | "warning" | "error"
  duration: number
}> = []
let isToastVisible = false

export const ToastManager = {
  show: (content: string, type: "info" | "success" | "warning" | "error" = "info", duration = 2000) => {
    toastQueue.push({ content, type, duration })
    if (!isToastVisible) {
      ToastManager.processQueue()
    }
  },

  processQueue: () => {
    if (toastQueue.length === 0) {
      isToastVisible = false
      return
    }

    isToastVisible = true
    const { content, type, duration } = toastQueue.shift()!

    // This would be implemented in the actual component
    // For now, we're just simulating the behavior
    setTimeout(() => {
      ToastManager.processQueue()
    }, duration + 600) // 600ms for animations
  },

  info: (content: string, duration?: number) => {
    ToastManager.show(content, "info", duration)
  },

  success: (content: string, duration?: number) => {
    ToastManager.show(content, "success", duration)
  },

  warning: (content: string, duration?: number) => {
    ToastManager.show(content, "warning", duration)
  },

  error: (content: string, duration?: number) => {
    ToastManager.show(content, "error", duration)
  },
}

