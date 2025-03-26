"use client"
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { useOnboarding } from "../../context/OnboardingContext"
import { Feather } from "@expo/vector-icons"

const ImprovedOnboarding = () => {
  const { theme } = useTheme()
  const { currentStep, isTooltipVisible, nextStep, endTour } = useOnboarding()

  if (!isTooltipVisible || !currentStep) {
    return null
  }

  return (
    <Modal transparent visible={isTooltipVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.tooltipContainer, { backgroundColor: theme.card }]}>
          <View style={styles.tooltipHeader}>
            <Text style={[styles.tooltipTitle, { color: theme.foreground }]}>{currentStep.title}</Text>
            <TouchableOpacity onPress={endTour}>
              <Feather name="x" size={20} color={theme.mutedForeground} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.tooltipDescription, { color: theme.mutedForeground }]}>{currentStep.description}</Text>

          <View style={styles.tooltipFooter}>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={nextStep}>
              <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  tooltipContainer: {
    width: "90%",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tooltipTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  tooltipDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  tooltipFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
})

export default ImprovedOnboarding

