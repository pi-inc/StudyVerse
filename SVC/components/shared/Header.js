"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"
import { useThemedStyles } from "../../hooks/useThemedStyles"

const Header = ({ showBack = false, onBackPress, title }) => {
  const navigation = useNavigation()
  const [menuVisible, setMenuVisible] = useState(false)
  const { theme, isDark } = useTheme()

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
    closeMenu()
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
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    menuContainer: {
      position: "absolute",
      top: 60,
      right: 16,
      backgroundColor: theme.colors.background.card,
      borderRadius: 8,
      padding: 8,
      minWidth: 200,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 4,
    },
    menuText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      marginLeft: 12,
    },
    menuDivider: {
      height: 1,
      backgroundColor: theme.colors.border.dark,
      marginVertical: 8,
    },
    signOutItem: {
      marginTop: 4,
    },
    signOutText: {
      color: theme.colors.error,
    },
  }))

  return (
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

      {/* Menu Modal */}
      <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={closeMenu}>
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("Profile")}>
              <Ionicons name="person-outline" size={20} color={theme.colors.text.primary} />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("Settings")}>
              <Ionicons name="settings-outline" size={20} color={theme.colors.text.primary} />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("Help")}>
              <Ionicons name="help-circle-outline" size={20} color={theme.colors.text.primary} />
              <Text style={styles.menuText}>Help & Support</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={[styles.menuItem, styles.signOutItem]}
              onPress={() => {
                closeMenu()
                // Handle sign out
              }}
            >
              <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
              <Text style={[styles.menuText, styles.signOutText]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default Header

