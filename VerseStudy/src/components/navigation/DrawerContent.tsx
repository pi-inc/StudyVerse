"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native"
import { DrawerContentScrollView, type DrawerContentComponentProps } from "@react-navigation/drawer"
import { useTheme } from "../../context/ThemeContext"
import { LinearGradient } from "expo-linear-gradient"

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { theme } = useTheme()

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: theme.background }}
    >
      <View style={styles.container}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: "https://i.pravatar.cc/150?img=32" }} style={styles.profileImage} />
          </View>
          <Text style={[styles.userName, { color: theme.foreground }]}>Alex Johnson</Text>
          <Text style={[styles.userEmail, { color: theme.mutedForeground }]}>alex.johnson@example.com</Text>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuItems}>
          <MenuItem
            label="Dashboard"
            onPress={() => props.navigation.navigate("MainTabs")}
            isActive={props.state.routeNames[props.state.index] === "MainTabs"}
            theme={theme}
          />
          <MenuItem
            label="Profile"
            onPress={() => props.navigation.navigate("Profile")}
            isActive={props.state.routeNames[props.state.index] === "Profile"}
            theme={theme}
          />
          <MenuItem
            label="Settings"
            onPress={() => props.navigation.navigate("Settings")}
            isActive={props.state.routeNames[props.state.index] === "Settings"}
            theme={theme}
          />
          <MenuItem
            label="Help & Support"
            onPress={() => props.navigation.navigate("Help")}
            isActive={props.state.routeNames[props.state.index] === "Help"}
            theme={theme}
          />
          <MenuItem
            label="About"
            onPress={() => props.navigation.navigate("About")}
            isActive={props.state.routeNames[props.state.index] === "About"}
            theme={theme}
          />
        </ScrollView>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={[styles.logoutText, { color: theme.destructive }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  )
}

interface MenuItemProps {
  label: string
  onPress: () => void
  isActive: boolean
  theme: any
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onPress, isActive, theme }) => {
  if (isActive) {
    return (
      <LinearGradient
        colors={[theme.study.purple, theme.study.blue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.activeMenuItem}
      >
        <TouchableOpacity onPress={onPress} style={styles.menuItemTouchable}>
          <Text style={[styles.menuItemText, { color: theme.primaryForeground }]}>{label}</Text>
        </TouchableOpacity>
      </LinearGradient>
    )
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.menuItem, { backgroundColor: theme.background }]}>
      <Text style={[styles.menuItemText, { color: theme.foreground }]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingBottom: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  userName: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  menuItems: {
    flex: 1,
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  activeMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  menuItemTouchable: {
    width: "100%",
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  logoutButton: {
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
})

export default DrawerContent

