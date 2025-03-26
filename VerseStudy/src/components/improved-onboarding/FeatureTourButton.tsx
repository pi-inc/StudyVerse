"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { useOnboarding } from "../../context/OnboardingContext"
import { Feather } from "@expo/vector-icons"

interface FeatureTourButtonProps {
  tourId: string
  label: string
}

const FeatureTourButton: React.FC<FeatureTourButtonProps> = ({ tourId, label }) => {
  const { theme } = useTheme()
  const { startTour } = useOnboarding()

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => startTour(tourId)}>
      <Feather name="help-circle" size={16} color={theme.primaryForeground} />
      <Text style={[styles.label, { color: theme.primaryForeground }]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
})

export default FeatureTourButton

