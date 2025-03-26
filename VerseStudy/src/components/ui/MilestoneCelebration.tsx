"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Modal, Animated, TouchableOpacity } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { LinearGradient } from "expo-linear-gradient"
import LottieView from "lottie-react-native"
import { Feather } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"

interface MilestoneCelebrationProps {
  visible: boolean
  onClose: () => void
  milestone: {
    title: string
    description: string
    icon: string
  }
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxWidth: 320,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  confetti: {
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  shareIcon: {
    marginRight: 8,
  },
  shareText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
})

const MilestoneCelebration: React.FC<MilestoneCelebrationProps> = ({
  visible,
  onClose,
  milestone = {
    title: "7-Day Streak!",
    description: "You've studied for 7 days in a row. Keep up the great work!",
    icon: "award",
  },
}) => {
  const { theme } = useTheme()
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      // Trigger haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

      // Start animations
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Reset animations
      scaleAnim.setValue(0.5)
      opacityAnim.setValue(0)
    }
  }, [visible, scaleAnim, opacityAnim])

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.background,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color={theme.foreground} />
          </TouchableOpacity>

          <View style={styles.confettiContainer}>
            <LottieView
              source={require("../../assets/animations/confetti.json")}
              autoPlay
              loop={false}
              style={styles.confetti}
            />
          </View>

          <LinearGradient
            colors={[theme.study.purple, theme.study.blue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconContainer}
          >
            <Feather name={milestone.icon} size={40} color="white" />
          </LinearGradient>

          <Text style={[styles.title, { color: theme.foreground }]}>{milestone.title}</Text>

          <Text style={[styles.description, { color: theme.mutedForeground }]}>{milestone.description}</Text>

          <TouchableOpacity
            style={[styles.shareButton, { borderColor: theme.border }]}
            onPress={() => {
              // In a real app, you would implement sharing functionality
              console.log("Share milestone")
              onClose()
            }}
          >
            <Feather name="share-2" size={16} color={theme.primary} style={styles.shareIcon} />
            <Text style={[styles.shareText, { color: theme.primary }]}>Share Achievement</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default MilestoneCelebration

