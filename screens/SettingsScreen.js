"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { View, Text, ScrollView, SafeAreaView, Animated } from "react-native"
import Header from "../components/shared/Header"
import SettingsSection from "../components/settings/SettingsSection"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import { signOut } from "../services/auth"
import { useTheme } from "../context/ThemeContext"
import { useThemedStyles } from "../hooks/useThemedStyles"

// Import the CustomToggleSwitch component at the top of the file
import CustomToggleSwitch from "../components/shared/CustomToggleSwitch"

const SettingsScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current
  const { theme, isDark, toggleTheme } = useTheme()

  // Track the visual state of the toggle
  const [isToggleOn, setIsToggleOn] = useState(isDark)

  // Logging mechanism
  const stepCounterRef = useRef(0)
  const toggleCounterRef = useRef(0)
  const toggleInProgressRef = useRef(false)

  // Logging function
  const logStateChange = useCallback(
    (source) => {
      const timestamp = new Date().toISOString().split("T")[1].slice(0, 12)
      const stepNumber = stepCounterRef.current

      console.log(
        `[${timestamp}] [Toggle #${toggleCounterRef.current}] [Step ${stepNumber}] [${source}] isDark: ${isDark}, isToggleOn: ${isToggleOn}, inProgress: ${toggleInProgressRef.current}`,
      )

      // Increment step counter
      stepCounterRef.current += 1
    },
    [isDark, isToggleOn],
  )

  // Log on initial render
  useEffect(() => {
    logStateChange("Initial Render")
  }, [logStateChange])

  // Sync isToggleOn with isDark when isDark changes externally
  useEffect(() => {
    if (!toggleInProgressRef.current) {
      logStateChange("isDark Changed - External")
      setIsToggleOn(isDark)
    }
  }, [isDark, logStateChange])

  // Animation effect
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

  // Handle theme toggle with proper visual feedback
  const handleToggle = () => {
    // Reset step counter and increment toggle counter for a new toggle action
    stepCounterRef.current = 0
    toggleCounterRef.current += 1

    // Set toggle in progress flag
    toggleInProgressRef.current = true

    // Log before toggle
    logStateChange("Toggle Pressed - Before")

    // Call the theme toggle function
    toggleTheme()

    // Log after toggle
    logStateChange("Toggle Pressed - After")

    // Clear the toggle in progress flag after a delay
    setTimeout(() => {
      toggleInProgressRef.current = false

      // Verify that the states are in sync
      if (isDark !== isToggleOn) {
        logStateChange("Toggle Sync Check")
        setIsToggleOn(isDark)
      }
    }, 500)
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
            <CustomToggleSwitch
              isOn={isDark}
              onToggle={handleToggle}
              activeColor={theme.colors.primary}
              inactiveColor="#e5e7eb"
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
      id: "account_actions",
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

