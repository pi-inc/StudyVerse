import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"

const CommunityTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "users", label: "Active Users", icon: "users" },
    { id: "groups", label: "Study Groups", icon: "message-square" },
    { id: "sessions", label: "Study Sessions", icon: "calendar" },
  ]

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Feather name={tab.icon} size={18} color={activeTab === tab.id ? "#fff" : "#6b7280"} style={styles.tabIcon} />
          <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
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
    marginBottom: 24,
    overflow: "hidden",
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
    backgroundColor: "#2d2d44",
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 12,
    color: "#6b7280",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default CommunityTabs

