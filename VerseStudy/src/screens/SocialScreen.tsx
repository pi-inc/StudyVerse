"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/layout/Header"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

// Mock data
const studyBuddies = [
  {
    id: "1",
    name: "Alex Johnson",
    image: "https://picsum.photos/200/200",
    course: "Introduction to React Native",
    online: true,
  },
  {
    id: "2",
    name: "Maria Garcia",
    image: "https://picsum.photos/200/201",
    course: "Advanced JavaScript",
    online: false,
  },
  {
    id: "3",
    name: "David Kim",
    image: "https://picsum.photos/200/202",
    course: "UI/UX Design Fundamentals",
    online: true,
  },
]

const studyGroups = [
  {
    id: "1",
    name: "React Native Developers",
    members: 24,
    image: "https://picsum.photos/200/203",
    description: "A group for React Native developers to share knowledge and help each other.",
  },
  {
    id: "2",
    name: "JavaScript Enthusiasts",
    members: 42,
    image: "https://picsum.photos/200/204",
    description: "Discuss JavaScript concepts, patterns, and best practices.",
  },
]

const upcomingSessions = [
  {
    id: "1",
    title: "React Native Styling Workshop",
    host: "Alex Johnson",
    time: "Today, 3:00 PM",
    participants: 8,
    maxParticipants: 10,
  },
  {
    id: "2",
    title: "JavaScript Algorithms Practice",
    host: "Maria Garcia",
    time: "Tomorrow, 5:00 PM",
    participants: 5,
    maxParticipants: 12,
  },
]

const SocialScreen = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("buddies")

  const renderTabContent = () => {
    switch (activeTab) {
      case "buddies":
        return (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Your Study Buddies</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.buddiesContainer}
              >
                {studyBuddies.map((buddy) => (
                  <TouchableOpacity key={buddy.id} style={styles.buddyCard}>
                    <View style={styles.buddyImageContainer}>
                      <Image source={{ uri: buddy.image }} style={styles.buddyImage} />
                      {buddy.online && (
                        <View style={[styles.onlineIndicator, { backgroundColor: theme.study.green }]} />
                      )}
                    </View>
                    <Text style={[styles.buddyName, { color: theme.foreground }]}>{buddy.name}</Text>
                    <Text style={[styles.buddyCourse, { color: theme.mutedForeground }]} numberOfLines={1}>
                      {buddy.course}
                    </Text>
                    <View style={styles.buddyActions}>
                      <TouchableOpacity style={[styles.buddyAction, { backgroundColor: theme.muted }]}>
                        <Feather name="message-circle" size={16} color={theme.foreground} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.buddyAction, { backgroundColor: theme.muted }]}>
                        <Feather name="video" size={16} color={theme.foreground} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.addBuddyCard}>
                  <View style={[styles.addBuddyCircle, { backgroundColor: theme.muted }]}>
                    <Feather name="plus" size={24} color={theme.foreground} />
                  </View>
                  <Text style={[styles.addBuddyText, { color: theme.foreground }]}>Find Buddies</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Recommended Study Groups</Text>

              {studyGroups.map((group) => (
                <Card key={group.id} style={styles.groupCard}>
                  <View style={styles.groupHeader}>
                    <Image source={{ uri: group.image }} style={styles.groupImage} />
                    <View style={styles.groupInfo}>
                      <Text style={[styles.groupName, { color: theme.foreground }]}>{group.name}</Text>
                      <Text style={[styles.groupMembers, { color: theme.mutedForeground }]}>
                        {group.members} members
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.groupDescription, { color: theme.mutedForeground }]}>{group.description}</Text>

                  <Button variant="outline" style={styles.joinButton}>
                    Join Group
                  </Button>
                </Card>
              ))}
            </View>
          </>
        )

      case "sessions":
        return (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Upcoming Study Sessions</Text>

              {upcomingSessions.map((session) => (
                <Card key={session.id} style={styles.sessionCard}>
                  <View style={styles.sessionHeader}>
                    <LinearGradient
                      colors={[theme.study.purple, theme.study.blue]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.sessionBadge}
                    >
                      <Feather name="users" size={16} color="white" />
                    </LinearGradient>
                    <View style={styles.sessionInfo}>
                      <Text style={[styles.sessionTitle, { color: theme.foreground }]}>{session.title}</Text>
                      <Text style={[styles.sessionHost, { color: theme.mutedForeground }]}>
                        Hosted by {session.host}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.sessionDetails}>
                    <View style={styles.sessionTime}>
                      <Feather name="clock" size={16} color={theme.mutedForeground} />
                      <Text style={[styles.sessionTimeText, { color: theme.mutedForeground }]}>{session.time}</Text>
                    </View>

                    <View style={styles.sessionParticipants}>
                      <Feather name="users" size={16} color={theme.mutedForeground} />
                      <Text style={[styles.sessionParticipantsText, { color: theme.mutedForeground }]}>
                        {session.participants}/{session.maxParticipants} participants
                      </Text>
                    </View>
                  </View>

                  <View style={styles.sessionActions}>
                    <Button gradient style={styles.joinSessionButton}>
                      Join Session
                    </Button>
                    <TouchableOpacity style={[styles.sessionAction, { backgroundColor: theme.muted }]}>
                      <Feather name="share-2" size={16} color={theme.foreground} />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}

              <Button variant="outline" style={styles.createSessionButton}>
                <Feather name="plus" size={16} color={theme.primary} style={styles.createSessionIcon} />
                Create Study Session
              </Button>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Find Study Partners</Text>

              <Card style={styles.findPartnersCard}>
                <Text style={[styles.findPartnersText, { color: theme.foreground }]}>
                  Looking for study partners with similar interests?
                </Text>
                <Button gradient style={styles.findPartnersButton}>
                  Find Partners
                </Button>
              </Card>
            </View>
          </>
        )

      default:
        return null
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Social" />

      <View style={[styles.tabsContainer, { backgroundColor: theme.muted }]}>
        <TouchableOpacity
          onPress={() => setActiveTab("buddies")}
          style={[styles.tab, activeTab === "buddies" && [styles.activeTab, { backgroundColor: theme.primary }]]}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "buddies" ? theme.primaryForeground : theme.mutedForeground,
              },
            ]}
          >
            Study Buddies
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("sessions")}
          style={[styles.tab, activeTab === "sessions" && [styles.activeTab, { backgroundColor: theme.primary }]]}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "sessions" ? theme.primaryForeground : theme.mutedForeground,
              },
            ]}
          >
            Study Sessions
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 16,
  },
  buddiesContainer: {
    paddingRight: 16,
  },
  buddyCard: {
    width: 120,
    marginRight: 16,
    alignItems: "center",
  },
  buddyImageContainer: {
    position: "relative",
    marginBottom: 8,
  },
  buddyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  buddyName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    marginBottom: 2,
  },
  buddyCourse: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: 8,
    width: "100%",
  },
  buddyActions: {
    flexDirection: "row",
    gap: 8,
  },
  buddyAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  addBuddyCard: {
    width: 120,
    alignItems: "center",
  },
  addBuddyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  addBuddyText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  groupCard: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
    justifyContent: "center",
  },
  groupName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  groupMembers: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  groupDescription: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
    lineHeight: 20,
  },
  joinButton: {
    alignSelf: "flex-end",
  },
  sessionCard: {
    marginBottom: 16,
  },
  sessionHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  sessionBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sessionInfo: {
    flex: 1,
    justifyContent: "center",
  },
  sessionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  sessionHost: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  sessionDetails: {
    flexDirection: "row",
    marginBottom: 16,
  },
  sessionTime: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  sessionTimeText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 6,
  },
  sessionParticipants: {
    flexDirection: "row",
    alignItems: "center",
  },
  sessionParticipantsText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 6,
  },
  sessionActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  joinSessionButton: {
    flex: 1,
    marginRight: 8,
  },
  sessionAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  createSessionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  createSessionIcon: {
    marginRight: 8,
  },
  findPartnersCard: {
    padding: 16,
    alignItems: "center",
  },
  findPartnersText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    marginBottom: 16,
  },
  findPartnersButton: {
    width: "100%",
  },
})

export default SocialScreen

