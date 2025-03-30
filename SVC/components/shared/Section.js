"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { colors, spacing, typography } from "../../styles/theme"
import AnimatedListItem from "./AnimatedListItem"
import { Ionicons } from "@expo/vector-icons"

const Section = ({
  title,
  subtitle,
  children,
  actionText,
  onActionPress,
  showDivider = true,
  animationIndex = 0,
  style,
}) => {
  return (
    <AnimatedListItem index={animationIndex}>
      <View style={[styles.section, style]}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
          </View>

          {actionText && onActionPress && (
            <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
              <Text style={styles.actionText}>{actionText}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {showDivider && <View style={styles.divider} />}

        <View style={styles.sectionContent}>{children}</View>
      </View>
    </AnimatedListItem>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  divider: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginBottom: spacing.md,
  },
  sectionContent: {
    // No specific styles needed here
  },
})

export default Section

