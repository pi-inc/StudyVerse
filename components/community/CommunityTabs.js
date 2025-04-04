"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const CommunityTabs = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme()

  const tabs = [
    { id: "users", label: "Active Users", icon: "users" },
    { id: "groups", label: "Study Groups", icon: "message-square" },
    { id: "sessions", label: "Study Sessions", icon: "calendar" },
  ]

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && [styles.activeTab, { backgroundColor: theme.colors.background.accent }],
          ]}
          onPress={() => onTabChange(tab.id)}
        >
          <Feather
            name={tab.icon}
            size={18}
            color={activeTab === tab.id ? theme.colors.text.primary : theme.colors.text.tertiary}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabText,
              { color: theme.colors.text.tertiary },
              activeTab === tab.id && [styles.activeTabText, { color: theme.colors.text.primary }],
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 24,
    overflow: "hidden",
    // backgroundColor set dynamically
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabIcon: {
    marginRight: 6,
    // color set dynamically
  },
  tabText: {
    fontSize: 12,
    // color set dynamically
  },
  activeTabText: {
    fontWeight: "bold",
    // color set dynamically
  },
})

export default CommunityTabs

