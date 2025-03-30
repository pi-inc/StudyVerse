"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../styles/theme"

const LearnTabs = ({ onTabChange, activeTab: externalActiveTab }) => {
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
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => handleTabPress(tab.id, index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab.id }}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={activeTab === tab.id ? colors.primary : colors.text.secondary}
              style={styles.tabIcon}
            />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>{tab.label}</Text>
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
    backgroundColor: colors.background.card,
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
    backgroundColor: colors.background.dark,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.secondary,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.primary,
  },
})

export default LearnTabs

