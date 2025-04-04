"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"
import { useThemedStyles } from "../../hooks/useThemedStyles"
import SideMenu from "./SideMenu"

const Header = ({ showBack = false, onBackPress, title }) => {
  const navigation = useNavigation()
  const [menuVisible, setMenuVisible] = useState(false)
  const { theme } = useTheme()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const closeMenu = () => {
    setMenuVisible(false)
  }

  const navigateTo = (screen) => {
    navigation.navigate(screen)
  }

  // Use themed styles
  const styles = useThemedStyles((theme) => ({
    header: {
      backgroundColor: theme.colors.background.primary,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.dark,
      paddingTop: 8,
      paddingBottom: 8,
      paddingHorizontal: theme.spacing.md,
      width: "100%",
      zIndex: 10,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
    },
    backButton: {
      padding: 8,
      marginRight: 8,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logoText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text.primary,
      flex: 1,
      textAlign: "center",
    },
    rightContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconButton: {
      padding: 8,
      marginLeft: 8,
    },
  }))

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {showBack ? (
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress} accessibilityLabel="Go back">
              <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>StudyVerse</Text>
            </View>
          )}

          {title && <Text style={styles.title}>{title}</Text>}

          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigateTo("Help")} accessibilityLabel="Help">
              <Ionicons name="help-circle-outline" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={toggleMenu} accessibilityLabel="Menu">
              <Ionicons name="menu" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Side Menu */}
      <SideMenu visible={menuVisible} onClose={closeMenu} />
    </>
  )
}

export default Header

