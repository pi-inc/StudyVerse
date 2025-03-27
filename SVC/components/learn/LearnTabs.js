"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const LearnTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("courses")

  const tabs = [
    {
      id: "courses",
      label: "Courses",
      icon: "book-outline",
    },
    {
      id: "ai-tutor",
      label: "AI Tutor",
      icon: "bulb-outline",
    },
  ]

  const handleTabPress = (tabId) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => handleTabPress(tab.id)}
        >
          <Ionicons name={tab.icon} size={20} color="#fff" style={styles.tabIcon} />
          <Text style={styles.tabText}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#2d2d44",
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
})

export default LearnTabs

