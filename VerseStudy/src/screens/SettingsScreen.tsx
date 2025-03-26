"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/layout/Header"
import Card from "../components/ui/Card"
import RestartOnboarding from "../components/settings/RestartOnboarding"
import { Feather } from "@expo/vector-icons"

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [studyReminders, setStudyReminders] = useState(true)
  const [autoPlay, setAutoPlay] = useState(true)
  const [downloadOverWifi, setDownloadOverWifi] = useState(true)
  const [hapticFeedback, setHapticFeedback] = useState(true)

  const renderSettingItem = (icon, title, description, value, onValueChange, type = "switch") => (
    <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
      <View style={styles.settingIcon}>
        <Feather name={icon} size={22} color={theme.foreground} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.foreground }]}>{title}</Text>
        {description && (
          <Text style={[styles.settingDescription, { color: theme.mutedForeground }]}>{description}</Text>
        )}
      </View>
      {type === "switch" ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: theme.muted, true: theme.primary }}
          thumbColor="white"
        />
      ) : (
        <Feather name="chevron-right" size={20} color={theme.mutedForeground} />
      )}
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Settings" showBackButton />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Appearance</Text>
          <Card>
            {renderSettingItem("moon", "Dark Mode", "Switch between light and dark themes", isDark, toggleTheme)}
            {renderSettingItem(
              "type",
              "Text Size",
              "Adjust the size of text throughout the app",
              null,
              null,
              "navigate",
            )}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Notifications</Text>
          <Card>
            {renderSettingItem(
              "bell",
              "Push Notifications",
              "Receive notifications on your device",
              notifications,
              setNotifications,
            )}
            {renderSettingItem(
              "mail",
              "Email Notifications",
              "Receive notifications via email",
              emailNotifications,
              setEmailNotifications,
            )}
            {renderSettingItem(
              "clock",
              "Study Reminders",
              "Get reminded of your study schedule",
              studyReminders,
              setStudyReminders,
            )}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Content</Text>
          <Card>
            {renderSettingItem(
              "play",
              "Auto-play Videos",
              "Automatically play videos when viewing courses",
              autoPlay,
              setAutoPlay,
            )}
            {renderSettingItem(
              "wifi",
              "Download Over Wi-Fi Only",
              "Only download content when connected to Wi-Fi",
              downloadOverWifi,
              setDownloadOverWifi,
            )}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Accessibility</Text>
          <Card>
            {renderSettingItem(
              "zap",
              "Haptic Feedback",
              "Enable vibration feedback when interacting with the app",
              hapticFeedback,
              setHapticFeedback,
            )}
            {renderSettingItem("volume-2", "Screen Reader", "Configure screen reader settings", null, null, "navigate")}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Account</Text>
          <Card>
            {renderSettingItem(
              "user",
              "Profile Information",
              "Update your personal information",
              null,
              null,
              "navigate",
            )}
            {renderSettingItem("lock", "Password", "Change your password", null, null, "navigate")}
            {renderSettingItem("credit-card", "Payment Methods", "Manage your payment methods", null, null, "navigate")}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Support</Text>
          <Card>
            {renderSettingItem("help-circle", "Help Center", "Get help with using StudyVerse", null, null, "navigate")}
            {renderSettingItem(
              "message-square",
              "Contact Support",
              "Reach out to our support team",
              null,
              null,
              "navigate",
            )}
            {renderSettingItem("info", "About", "Learn more about StudyVerse", null, null, "navigate")}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Tutorials</Text>
          <RestartOnboarding />
        </View>

        <TouchableOpacity style={[styles.logoutButton, { borderColor: theme.border }]}>
          <Text style={[styles.logoutText, { color: theme.destructive }]}>Log Out</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: theme.mutedForeground }]}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    alignItems: "center",
  },
  settingContent: {
    flex: 1,
    marginRight: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  logoutButton: {
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  versionText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: 24,
  },
})

export default SettingsScreen

