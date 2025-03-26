"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Platform } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { useOnboarding } from "../../context/OnboardingContext"
import { Feather } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { useNavigation } from "@react-navigation/native"

const RestartOnboarding = () => {
  const { theme } = useTheme()
  const { resetOnboarding } = useOnboarding()
  const navigation = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleOpenModal = () => {
    setIsModalVisible(true)
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  const handleRestartOnboarding = async () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    setIsResetting(true)

    try {
      await resetOnboarding()
      setIsModalVisible(false)

      // Navigate to onboarding screen
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Onboarding" }],
        })
      }, 500)
    } catch (error) {
      console.error("Error restarting onboarding:", error)
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={[styles.container, { backgroundColor: theme.muted, borderColor: theme.border }]}
      >
        <Feather name="refresh-cw" size={20} color={theme.foreground} style={styles.icon} />
        <Text style={[styles.text, { color: theme.foreground }]}>Restart Onboarding</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.foreground }]}>Restart Onboarding</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Feather name="x" size={24} color={theme.mutedForeground} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalDescription, { color: theme.mutedForeground }]}>
              This will reset all onboarding tutorials and guides. You'll be taken through the initial onboarding
              process again.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleCloseModal} style={[styles.cancelButton, { borderColor: theme.border }]}>
                <Text style={[styles.cancelButtonText, { color: theme.foreground }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleRestartOnboarding}
                style={[styles.restartButton, { backgroundColor: theme.primary }]}
                disabled={isResetting}
              >
                {isResetting ? (
                  <ActivityIndicator size="small" color={theme.primaryForeground} />
                ) : (
                  <Text style={[styles.restartButtonText, { color: theme.primaryForeground }]}>Restart</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  closeButton: {
    padding: 4,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  restartButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  restartButtonText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
})

export default RestartOnboarding

