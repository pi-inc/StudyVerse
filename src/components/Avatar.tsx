"use client"

import type React from "react"
import { StyleSheet, View, Text, Image, type ViewStyle, type TextStyle, type ImageStyle } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface AvatarProps {
  source?: { uri: string }
  initials?: string
  size?: number
  style?: ViewStyle
  imageStyle?: ImageStyle
  textStyle?: TextStyle
  backgroundColor?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials,
  size = 40,
  style,
  imageStyle,
  textStyle,
  backgroundColor,
}) => {
  const { theme } = useTheme()

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: backgroundColor || theme.primary,
  }

  const textSizeStyle: TextStyle = {
    fontSize: size * 0.4,
  }

  return (
    <View style={[styles.container, containerStyle, style]}>
      {source ? (
        <Image
          source={source}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }, imageStyle]}
        />
      ) : (
        <Text style={[styles.text, textSizeStyle, textStyle]}>{initials || "?"}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontFamily: "Inter-Medium",
  },
})

