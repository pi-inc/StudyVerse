"use client"

import { useRef, useEffect } from "react"
import { View, Text, ScrollView, SafeAreaView, Animated, Switch } from "react-native"
import Header from "../components/shared/Header"
import SettingsSection from "../components/settings/SettingsSection"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import { signOut } from "../services/auth"
import { useTheme } from "../context/ThemeContext"
import { useThemedStyles } from "../hooks/useThemedStyles"

const SettingsScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current
  const { theme, isDark, toggleTheme } = useTheme()

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      // Navigation will be handled by the auth state listener in App.js
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  // Use themed styles
  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginTop: 16,
      marginBottom: 8,
    },
    gradientDivider: {
      height: 4,
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
      marginBottom: 24,
    },
    versionContainer: {
      alignItems: "center",
      marginVertical: 40,
    },
    versionText: {
      fontSize: 14,
      color: theme.colors.text.tertiary,
      marginBottom: 4,
    },
    copyrightText: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
    },
    themeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.background.card,
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    themeText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      fontWeight: "500",
    },
    themeDescription: {
      fontSize: 14,
      color: theme.colors.text.tertiary,
      marginTop: 4,
    },
  }))

  const settingsSections = [
    {
      id: "appearance",
      title: "Appearance Settings",
      icon: "color-palette",
      description: "Customize how StudyVerse looks",
      items: [
        {
          id: "theme",
          title: "Dark Mode",
          icon: isDark ? "moon" : "sunny",
          customComponent: (
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#e5e7eb", true: theme.colors.primary }}
              thumbColor="#fff"
            />
          ),
        },
        { id: "fontSize", title: "Font Size", icon: "text-outline", options: ["Small", "Medium", "Large"] },
        {
          id: "colorScheme",
          title: "Color Scheme",
          icon: "color-palette-outline",
          options: ["Default", "Blue", "Green", "Purple"],
        },
      ],
    },
    {
      id: "account",
      title: "Account Settings",
      icon: "person",
      description: "Manage your account information",
      items: [
        { id: "profile", title: "Profile Information", icon: "person-outline" },
        { id: "email", title: "Email Address", icon: "mail-outline" },
        { id: "subscription", title: "Subscription Plan", icon: "card-outline" },
        { id: "delete", title: "Delete Account", icon: "trash-outline", danger: true },
      ],
    },
    {
      id: "security",
      title: "Security Settings",
      icon: "lock-closed",
      description: "Manage your password and security preferences",
      items: [
        { id: "password", title: "Change Password", icon: "key-outline" },
        { id: "twoFactor", title: "Two-Factor Authentication", icon: "shield-checkmark-outline" },
        { id: "sessions", title: "Active Sessions", icon: "phone-portrait-outline" },
      ],
    },
    {
      id: "notifications",
      title: "Notification Settings",
      icon: "notifications",
      description: "Manage how you receive notifications",
      items: [
        { id: "push", title: "Push Notifications", icon: "phone-portrait-outline", toggle: true },
        { id: "email", title: "Email Notifications", icon: "mail-outline", toggle: true },
        { id: "reminders", title: "Study Reminders", icon: "alarm-outline", toggle: true },
        { id: "marketing", title: "Marketing Communications", icon: "megaphone-outline", toggle: true },
      ],
    },
    {
      id: "account",
      title: "Account",
      icon: "person",
      description: "Manage your account settings",
      items: [
        { id: "profile", title: "Edit Profile", icon: "person-outline" },
        { id: "password", title: "Change Password", icon: "key-outline" },
        { id: "signout", title: "Sign Out", icon: "log-out-outline", danger: true, onPress: handleSignOut },
      ],
    },
  ]

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" showBack={true} />
      <ScrollView style={styles.scrollView}>
        <Animated.View style={headerAnimStyle}>
          <Text style={styles.pageTitle}>Settings</Text>
          <View style={styles.gradientDivider} />
        </Animated.View>

        {settingsSections.map((section, index) => (
          <AnimatedListItem key={section.id} index={index}>
            <SettingsSection
              title={section.title}
              icon={section.icon}
              description={section.description}
              items={section.items}
            />
          </AnimatedListItem>
        ))}

        <AnimatedListItem index={settingsSections.length}>
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>StudyVerse v1.0.0</Text>
            <Text style={styles.copyrightText}>© 2025 StudyVerse Inc.</Text>
          </View>
        </AnimatedListItem>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen

