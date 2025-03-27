"use client"

import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, SafeAreaView } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useRef, useEffect, useState } from "react"

const SideMenu = ({ visible, onClose }) => {
  const navigation = useNavigation()
  const { width } = Dimensions.get("window")
  const menuWidth = width * 0.75 // Menu takes up 75% of screen width
  const slideAnim = useRef(new Animated.Value(-menuWidth)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isRendered, setIsRendered] = useState(visible)
  const [currentScreen, setCurrentScreen] = useState("Home")

  useEffect(() => {
    // Get current route name from navigation state
    const unsubscribe = navigation.addListener("state", () => {
      // This is a safer way to get the current route name
      if (navigation.getState().routes.length > 0) {
        const currentRouteName = navigation.getState().routes[navigation.getState().index].name
        if (currentRouteName !== "Main") {
          setCurrentScreen(currentRouteName)
        } else if (navigation.getState().routes[navigation.getState().index].state) {
          // For tab navigator, we need to go one level deeper
          const tabRoute =
            navigation.getState().routes[navigation.getState().index].state.routes[
              navigation.getState().routes[navigation.getState().index].state.index
            ]
          setCurrentScreen(tabRoute.name)
        }
      }
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (visible) {
      setIsRendered(true)
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200, // Reduced from 300
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200, // Reduced from 300
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -menuWidth,
          duration: 200, // Reduced from 300
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200, // Reduced from 300
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsRendered(false)
      })
    }
  }, [visible, menuWidth])

  const menuItems = [
    { id: "home", label: "Home", icon: "home", type: "ionicons", screen: "Home" },
    { id: "learn", label: "Learn", icon: "book-outline", type: "ionicons", screen: "Learn" },
    { id: "revise", label: "Revise", icon: "refresh-outline", type: "ionicons", screen: "Review" },
    { id: "plan", label: "Plan", icon: "calendar-outline", type: "ionicons", screen: "Plan" },
    { id: "social", label: "Social", icon: "people-outline", type: "ionicons", screen: "Social" },
    { id: "settings", label: "Settings", icon: "settings-outline", type: "ionicons", screen: "Settings" },
    { id: "help", label: "Help", icon: "help-circle-outline", type: "ionicons", screen: "Help" },
    { id: "profile", label: "Profile", icon: "person-outline", type: "ionicons", screen: "Profile" },
    { id: "about", label: "About", icon: "information-circle-outline", type: "ionicons", screen: "About" },
  ]

  const handleNavigation = (screen) => {
    if (screen) {
      // Animate menu closing before navigation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -menuWidth,
          duration: 200, // Reduced from 300
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200, // Reduced from 300
          useNativeDriver: true,
        }),
      ]).start(() => {
        // For tab screens, navigate to Main first, then to the specific tab
        if (["Home", "Plan", "Learn", "Review", "Social"].includes(screen)) {
          navigation.navigate("Main", { screen: screen })
        } else {
          navigation.navigate(screen)
        }
        onClose()
      })
    } else {
      onClose()
    }
  }

  const renderIcon = (item) => {
    if (item.type === "feather") {
      return <Feather name={item.icon} size={24} color="#a78bfa" />
    }
    return <Ionicons name={item.icon} size={24} color="#a78bfa" />
  }

  if (!isRendered) return null

  return (
    <Modal transparent={true} visible={true} animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.container, { width: menuWidth, transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
                <Ionicons name="close-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.menuItems}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, currentScreen === item.screen && styles.activeMenuItem]}
                  onPress={() => handleNavigation(item.screen)}
                  activeOpacity={0.7}
                >
                  {renderIcon(item)}
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        </Animated.View>
        <TouchableOpacity
          style={[styles.dismissArea, { width: width - menuWidth }]}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dismissArea: {
    height: "100%",
  },
  container: {
    height: "100%",
    backgroundColor: "#0a0a1a",
    borderRightWidth: 1,
    borderRightColor: "#1f2937",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItems: {
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    marginHorizontal: 12,
  },
  menuItemText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 16,
  },
})

export default SideMenu
