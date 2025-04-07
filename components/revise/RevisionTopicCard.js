"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const RevisionTopicCard = ({ topic, onPress }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>{topic.title}</Text>
        <View style={styles.proficiencyContainer}>
          <Text style={[styles.proficiencyText, { color: topic.proficiencyColor }]}>{topic.proficiency}</Text>
          <View style={[styles.proficiencyBar, { backgroundColor: topic.proficiencyColor }]} />
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.dueNowBadge, { backgroundColor: "rgba(245, 158, 11, 0.2)" }]}>
          <Text style={[styles.dueNowText, { color: theme.colors.warning }]}>{topic.dueStatus}</Text>
        </View>
        <Text style={[styles.lastReviewedText, { color: theme.colors.text.tertiary }]}>{topic.lastReviewed}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  proficiencyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  proficiencyText: {
    fontSize: 14,
    marginRight: 8,
  },
  proficiencyBar: {
    height: 6,
    width: 60,
    borderRadius: 3,
    opacity: 0.7,
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  dueNowBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  dueNowText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  lastReviewedText: {
    fontSize: 14,
  },
})

