"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"
import { Feather } from "@expo/vector-icons"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  showMenuButton?: boolean
  rightComponent?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, showMenuButton = true, rightComponent }) => {
  const { theme } = useTheme()
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={theme.foreground} />
          </TouchableOpacity>
        ) : showMenuButton ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              // @ts-ignore - This is a valid operation for drawer navigation
              navigation.openDrawer()
            }}
          >
            <Feather name="menu" size={24} color={theme.foreground} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>

      <View style={styles.rightContainer}>{rightComponent || <View style={styles.placeholder} />}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
})

export default Header

