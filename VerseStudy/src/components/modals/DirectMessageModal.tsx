"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Button from "../ui/Button"
import { Feather } from "@expo/vector-icons"

interface DirectMessageModalProps {
  visible: boolean
  onClose: () => void
  recipient?: {
    name: string
    id: string
  }
}

const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  visible,
  onClose,
  recipient = { name: "Alex Johnson", id: "1" },
}) => {
  const { theme } = useTheme()
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the recipient
      console.log("Sending message to:", recipient.id, message)
      setMessage("")
      onClose()
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.foreground }]}>Message to {recipient.name}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={24} color={theme.foreground} />
              </TouchableOpacity>
            </View>

            <View style={[styles.messageInputContainer, { backgroundColor: theme.muted, borderColor: theme.border }]}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message..."
                placeholderTextColor={theme.mutedForeground}
                style={[styles.messageInput, { color: theme.foreground }]}
                multiline
                autoFocus
              />
            </View>

            <View style={styles.modalFooter}>
              <Button variant="outline" onPress={onClose} style={styles.cancelButton}>
                Cancel
              </Button>
              <Button
                gradient
                onPress={handleSend}
                disabled={!message.trim()}
                style={[
                  styles.sendButton,
                  {
                    opacity: !message.trim() ? 0.5 : 1,
                  },
                ]}
              >
                Send Message
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  closeButton: {
    padding: 4,
  },
  messageInputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 120,
    marginBottom: 16,
  },
  messageInput: {
    padding: 12,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    textAlignVertical: "top",
    minHeight: 120,
  },
  modalFooter: {
    flexDirection: "row",
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  sendButton: {
    flex: 2,
  },
})

export default DirectMessageModal

