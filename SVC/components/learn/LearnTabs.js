"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const LearnTabs = ({ onTabChange, activeTab: externalActiveTab }) => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState(externalActiveTab || "courses")
  const [indicatorPosition] = useState(new Animated.Value(0))
  const [indicatorWidth] = useState(new Animated.Value(0))

  useEffect(() => {
    if (externalActiveTab && externalActiveTab !== activeTab) {
      setActiveTab(externalActiveTab)
    }
  }, [externalActiveTab])

  const tabs = [
    { id: "courses", label: "Courses", icon: "book-outline" },
    { id: "ai-tutor", label: "AI Tutor", icon: "bulb-outline" },
  ]

  const handleTabPress = (tabId, index) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.background.secondary }]}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && [styles.activeTab, { backgroundColor: theme.colors.background.accent }],
            ]}
            onPress={() => handleTabPress(tab.id, index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab.id }}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={activeTab === tab.id ? theme.colors.primary : theme.colors.text.tertiary}
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: theme.colors.text.tertiary },
                activeTab === tab.id && { color: theme.colors.primary, fontWeight: "bold" },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    // Background color set dynamically
  },
  tabIcon: {
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    // Color set dynamically
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    borderRadius: 1.5,
    // Background color set dynamically
  },
})

export default LearnTabs

