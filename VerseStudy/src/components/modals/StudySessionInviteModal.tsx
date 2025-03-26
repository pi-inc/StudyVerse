"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, FlatList } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Button from "../ui/Button"
import { Feather } from "@expo/vector-icons"

interface StudySessionInviteModalProps {
  visible: boolean
  onClose: () => void
  sessionTitle?: string
  sessionTime?: string
  host?: {
    name: string
    image: string
  }
}

// Mock data
const buddies = [
  {
    id: "1",
    name: "Alex Johnson",
    image: "https://picsum.photos/200/200",
    selected: false,
  },
  {
    id: "2",
    name: "Maria Garcia",
    image: "https://picsum.photos/200/201",
    selected: false,
  },
  {
    id: "3",
    name: "David Kim",
    image: "https://picsum.photos/200/202",
    selected: false,
  },
  {
    id: "4",
    name: "Sarah Williams",
    image: "https://picsum.photos/200/203",
    selected: false,
  },
  {
    id: "5",
    name: "James Brown",
    image: "https://picsum.photos/200/204",
    selected: false,
  },
]

const StudySessionInviteModal: React.FC<StudySessionInviteModalProps> = ({
  visible,
  onClose,
  sessionTitle = "React Native Study Session",
  sessionTime = "Today, 3:00 PM",
  host = {
    name: "You",
    image: "https://picsum.photos/200/200",
  },
}) => {
  const { theme } = useTheme()
  const [selectedBuddies, setSelectedBuddies] = useState<string[]>([])

  const toggleBuddySelection = (id: string) => {
    if (selectedBuddies.includes(id)) {
      setSelectedBuddies(selectedBuddies.filter((buddyId) => buddyId !== id))
    } else {
      setSelectedBuddies([...selectedBuddies, id])
    }
  }

  const handleSendInvites = () => {
    // In a real app, you would send invites to the selected buddies
    console.log("Sending invites to:", selectedBuddies)
    onClose()
  }

  const renderBuddyItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.buddyItem,
        {
          backgroundColor: selectedBuddies.includes(item.id) ? theme.primary + "20" : "transparent",
        },
      ]}
      onPress={() => toggleBuddySelection(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.buddyImage} />
      <Text style={[styles.buddyName, { color: theme.foreground }]}>{item.name}</Text>
      <View
        style={[
          styles.checkCircle,
          {
            borderColor: selectedBuddies.includes(item.id) ? theme.primary : theme.border,
            backgroundColor: selectedBuddies.includes(item.id) ? theme.primary : "transparent",
          },
        ]}
      >
        {selectedBuddies.includes(item.id) && <Feather name="check" size={14} color="white" />}
      </View>
    </TouchableOpacity>
  )

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.foreground }]}>Invite Study Buddies</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color={theme.foreground} />
            </TouchableOpacity>
          </View>

          <View style={styles.sessionInfo}>
            <Text style={[styles.sessionTitle, { color: theme.foreground }]}>{sessionTitle}</Text>
            <View style={styles.sessionDetails}>
              <View style={styles.sessionTime}>
                <Feather name="clock" size={16} color={theme.mutedForeground} />
                <Text style={[styles.sessionTimeText, { color: theme.mutedForeground }]}>{sessionTime}</Text>
              </View>
              <View style={styles.sessionHost}>
                <Feather name="user" size={16} color={theme.mutedForeground} />
                <Text style={[styles.sessionHostText, { color: theme.mutedForeground }]}>Hosted by {host.name}</Text>
              </View>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Select Buddies to Invite</Text>

          <FlatList
            data={buddies}
            renderItem={renderBuddyItem}
            keyExtractor={(item) => item.id}
            style={styles.buddiesList}
          />

          <View style={styles.modalFooter}>
            <Button variant="outline" onPress={onClose} style={styles.cancelButton}>
              Cancel
            </Button>
            <Button
              gradient
              onPress={handleSendInvites}
              disabled={selectedBuddies.length === 0}
              style={[
                styles.inviteButton,
                {
                  opacity: selectedBuddies.length === 0 ? 0.5 : 1,
                },
              ]}
            >
              Send Invites ({selectedBuddies.length})
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
    maxHeight: "80%",
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
  sessionInfo: {
    marginBottom: 20,
  },
  sessionTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  sessionDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sessionTime: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  sessionTimeText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 6,
  },
  sessionHost: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sessionHostText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  buddiesList: {
    flex: 1,
  },
  buddyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buddyImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  buddyName: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  modalFooter: {
    flexDirection: "row",
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  inviteButton: {
    flex: 2,
  },
})

export default StudySessionInviteModal

