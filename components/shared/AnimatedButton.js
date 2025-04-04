"use client"

import React from "react"
import { TouchableOpacity, Text, StyleSheet, Animated, Easing } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const AnimatedButton = ({
  onPress,
  text,
  icon,
  style,
  textStyle,
  iconSize = 20,
  iconColor = "#fff",
  backgroundColor = "#7c3aed",
  navigateTo = null,
}) => {
  const navigation = useNavigation()
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 50, // Reduced from 100
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3, // Reduced from 5 for faster spring
      tension: 60, // Increased from 40 for faster spring
      useNativeDriver: true,
    }).start()
  }

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo)
    } else if (onPress) {
      onPress()
    }
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={[styles.button, { backgroundColor }, style]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {icon && <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.icon} />}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
})

export default AnimatedButton

