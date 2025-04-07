"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../../context/ThemeContext"

const DueForReviewCard = ({ count }) => {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.colors.warning }]}>Due for Review</Text>
        <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
          {count} topics need your attention based on spaced repetition
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.reviewButton,
          {
            backgroundColor: theme.colors.background.primary,
            borderColor: theme.colors.border.light,
          },
        ]}
      >
        <Text style={[styles.reviewButtonText, { color: theme.colors.warning }]}>Review Now</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  reviewButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default DueForReviewCard

