"use client"

import { useEffect, useState } from "react"
import { Text, StyleSheet, Animated } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import * as NetInfo from "@react-native-community/netinfo"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const OfflineIndicator = () => {
  const { theme } = useTheme()
  const [isOffline, setIsOffline] = useState(false)
  const translateY = useState(new Animated.Value(-100))[0]
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected)
    })

    // Check initial connection state
    NetInfo.fetch().then((state) => {
      setIsOffline(!state.isConnected)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (isOffline) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 9,
      }).start()
    } else {
      Animated.spring(translateY, {
        toValue: -100,
        useNativeDriver: true,
        tension: 80,
        friction: 9,
      }).start()
    }
  }, [isOffline, translateY])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.destructive,
          transform: [{ translateY }],
          paddingTop: insets.top > 0 ? insets.top : 10,
        },
      ]}
    >
      <Text style={styles.text}>No internet connection</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
  },
})

export default OfflineIndicator

