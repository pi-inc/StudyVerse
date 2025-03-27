"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import SideMenu from "./SideMenu"

const Header = ({ showMenu = true, showBack = false, onBackPress, title }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [userMenuVisible, setUserMenuVisible] = useState(false)
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
    // Close user menu if open
    if (userMenuVisible) setUserMenuVisible(false)
  }

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible)
    // Close side menu if open
    if (menuVisible) setMenuVisible(false)
  }

  const handleNavigation = (screen) => {
    // For tab screens, navigate to Main first, then to the specific tab
    if (["Home", "Plan", "Learn", "Review", "Social"].includes(screen)) {
      navigation.navigate("Main", { screen: screen })
    } else {
      navigation.navigate(screen)
    }
    
    // Close menus
    setUserMenuVisible(false)
    setMenuVisible(false)
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {showBack && (
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#a78bfa" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => handleNavigation("Home")}
          >
            <Ionicons name="book" size={24} color="#7c3aed" />
            <Text style={styles.logoText}>{title || "StudyVerse"}</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation buttons for larger screens - could be conditionally rendered based on screen width */}
        <View style={styles.navButtons}>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation("Learn")}>
            <Text style={styles.navButtonText}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation("Review")}>
            <Text style={styles.navButtonText}>Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation("Plan")}>
            <Text style={styles.navButtonText}>Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation("Social")}>
            <Text style={styles.navButtonText}>Social</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.profileButton} onPress={toggleUserMenu}>
            <View style={styles.profileImage} />
          </TouchableOpacity>
          {showMenu && (
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* User dropdown menu */}
      {userMenuVisible && (
        <View style={styles.userMenu}>
          <TouchableOpacity style={styles.userMenuItem} onPress={() => handleNavigation("Profile")}>
            <Ionicons name="person-outline" size={20} color="#a78bfa" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userMenuItem} onPress={() => handleNavigation("Settings")}>
            <Ionicons name="settings-outline" size={20} color="#a78bfa" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userMenuItem}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" style={styles.menuItemIcon} />
            <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: "#0a0a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a78bfa",
    marginLeft: 8,
  },
  navButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // Hide on small screens - would need responsive handling in a real app
    display: "none",
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileButton: {
    marginRight: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
  },
  menuButton: {
    padding: 4,
  },
  userMenu: {
    position: "absolute",
    top: 100, // Position below header
    right: 16,
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    padding: 8,
    width: 200,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#2d2d44",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutText: {
    color: "#ef4444",
  },
})

export default Header
