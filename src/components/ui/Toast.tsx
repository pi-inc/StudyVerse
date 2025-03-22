"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, Animated, TouchableOpacity } from "react-native"
import tw from "twrnc"

export interface ToastProps {
  message: string
  type?: "success" | "error" | "info" | "warning"
  duration?: number
  onClose?: () => void
  visible: boolean
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info", duration = 3000, onClose, visible }) => {
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()

      const timer = setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (onClose) onClose()
        })
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [visible, animation, duration, onClose])

  if (!visible) return null

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return tw`bg-green-500`
      case "error":
        return tw`bg-red-500`
      case "warning":
        return tw`bg-yellow-500`
      case "info":
      default:
        return tw`bg-blue-500`
    }
  }

  return (
    <Animated.View
      style={[
        tw`absolute top-10 left-4 right-4 rounded-md px-4 py-3 z-50 shadow-md`,
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
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-white font-medium flex-1`}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={tw`text-white ml-2`}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

