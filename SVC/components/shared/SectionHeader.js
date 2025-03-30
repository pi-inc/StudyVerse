"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const SectionHeader = ({ title, actionText, onActionPress }) => {
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
      {actionText && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>{actionText}</Text>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    marginRight: 4,
  },
})

export default SectionHeader

