"use client"

import React, { useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { Card, CardContent } from "../components/Card"
import { Button } from "../components/Button"
import { useToast } from "../context/ToastContext"

const SettingsScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme()
  const { showToast } = useToast()

  // State for settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [language, setLanguage] = useState("english")

  const handleSaveSettings = () => {
    showToast("Settings saved successfully", { type: "success" })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Appearance</Text>
          <Card style={styles.card}>
            <CardContent>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.foreground }]}>Dark Mode</Text>
                  <Text style={[styles.settingDesc, { color: theme.mutedForeground }]}>
                    Toggle between light and dark theme
                  </Text>
                </View>
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: theme.muted, true: `${theme.primary}80` }}
                  thumbColor={isDark ? theme.primary : "#f4f3f4"}
                />
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Notifications</Text>
          <Card style={styles.card}>
            <CardContent>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.foreground }]}>Email Notifications</Text>
                  <Text style={[styles.settingDesc, { color: theme.mutedForeground }]}>
                    Receive notifications via email
                  </Text>
                </View>
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: theme.muted, true: `${theme.primary}80` }}
                  thumbColor={emailNotifications ? theme.primary : "#f4f3f4"}
                />
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.foreground }]}>Push Notifications</Text>
                  <Text style={[styles.settingDesc, { color: theme.mutedForeground }]}>
                    Receive push notifications on your device
                  </Text>
                </View>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: theme.muted, true: `${theme.primary}80` }}
                  thumbColor={pushNotifications ? theme.primary : "#f4f3f4"}
                />
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.foreground }]}>Sound Effects</Text>
                  <Text style={[styles.settingDesc, { color: theme.mutedForeground }]}>
                    Play sounds for achievements and notifications
                  </Text>
                </View>
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: theme.muted, true: `${theme.primary}80` }}
                  thumbColor={soundEnabled ? theme.primary : "#f4f3f4"}
                />
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Language</Text>
          <Card style={styles.card}>
            <CardContent>
              {["English", "Spanish", "French", "German", "Chinese"].map((lang, index) => (
                <React.Fragment key={lang}>
                  <TouchableOpacity style={styles.languageItem} onPress={() => setLanguage(lang.toLowerCase())}>
                    <Text style={[styles.languageText, { color: theme.foreground }]}>{lang}</Text>
                    {language === lang.toLowerCase() && <Ionicons name="checkmark" size={20} color={theme.primary} />}
                  </TouchableOpacity>
                  {index < 4 && <View style={[styles.divider, { backgroundColor: theme.border }]} />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Account</Text>
          <Card style={styles.card}>
            <CardContent>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Ionicons name="person-outline" size={20} color={theme.studyPurple} />
                  <Text style={[styles.menuItemText, { color: theme.foreground }]}>Edit Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Ionicons name="lock-closed-outline" size={20} color={theme.studyBlue} />
                  <Text style={[styles.menuItemText, { color: theme.foreground }]}>Change Password</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Ionicons name="cloud-download-outline" size={20} color={theme.studyTeal} />
                  <Text style={[styles.menuItemText, { color: theme.foreground }]}>Download My Data</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
              </TouchableOpacity>
            </CardContent>
          </Card>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Save Settings" variant="gradient" onPress={handleSaveSettings} style={styles.saveButton} />

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={[styles.logoutText, { color: theme.studyRed }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 12,
  },
  card: {
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  languageText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginLeft: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  saveButton: {
    marginBottom: 16,
  },
  logoutButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
})

export default SettingsScreen

