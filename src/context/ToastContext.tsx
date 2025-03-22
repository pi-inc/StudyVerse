"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { Text, Animated } from "react-native"
import tw from "twrnc"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  type?: ToastType
  duration?: number
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
})

export const useToast = () => useContext(ToastContext)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [toastType, setToastType] = useState<ToastType>("info")
  const fadeAnim = useState(new Animated.Value(0))[0]

  const showToast = useCallback(
    (msg: string, options?: ToastOptions) => {
      setMessage(msg)
      setToastType(options?.type || "info")
      setVisible(true)

      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(options?.duration || 3000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false)
      })
    },
    [fadeAnim],
  )

  const getBackgroundColor = () => {
    switch (toastType) {
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
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            tw`absolute bottom-10 left-5 right-5 p-4 rounded-lg shadow-lg`,
            getBackgroundColor(),
            { opacity: fadeAnim },
          ]}
        >
          <Text style={tw`text-white font-medium text-center`}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  )
}

