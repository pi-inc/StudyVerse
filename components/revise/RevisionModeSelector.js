"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

export const RevisionModeSelector = ({ selectedMode, onModeChange }) => {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      <TouchableOpacity
        style={[
          styles.modeButton,
          selectedMode === "flashcards" && [styles.selectedMode, { backgroundColor: theme.colors.background.accent }],
        ]}
        onPress={() => onModeChange("flashcards")}
      >
        <Ionicons
          name="layers-outline"
          size={20}
          color={selectedMode === "flashcards" ? theme.colors.text.primary : theme.colors.text.tertiary}
        />
        <Text
          style={[
            styles.modeText,
            { color: theme.colors.text.tertiary },
            selectedMode === "flashcards" && { color: theme.colors.text.primary },
          ]}
        >
          Flashcards
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.modeButton,
          selectedMode === "quiz" && [styles.selectedMode, { backgroundColor: theme.colors.background.accent }],
        ]}
        onPress={() => onModeChange("quiz")}
      >
        <Ionicons
          name="help-circle-outline"
          size={20}
          color={selectedMode === "quiz" ? theme.colors.text.primary : theme.colors.text.tertiary}
        />
        <Text
          style={[
            styles.modeText,
            { color: theme.colors.text.tertiary },
            selectedMode === "quiz" && { color: theme.colors.text.primary },
          ]}
        >
          Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.text.tertiary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  modeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  selectedMode: {
    borderRadius: 8,
  },
  modeText: {
    fontSize: 14,
    marginLeft: 8,
  },
  moreButton: {
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
})

