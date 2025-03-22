"use client"

import { useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { Avatar } from "../components/Avatar"
import { Badge } from "../components/Badge"
import { Card, CardContent } from "../components/Card"
import { Button } from "../components/Button"

const ProfileScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Computer Science Student",
    joinDate: "September 2023",
    location: "New York, USA",
    bio: "Computer Science student passionate about learning new technologies.",
    level: 5,
    points: 750,
    streak: 5,
  }

  const courses = [
    { id: 1, name: "Data Structures", progress: 65, totalHours: 24, completedHours: 15.6 },
    { id: 2, name: "Algorithms", progress: 40, totalHours: 30, completedHours: 12 },
    { id: 3, name: "Web Development", progress: 80, totalHours: 40, completedHours: 32 },
  ]

  const achievements = [
    { id: 1, name: "Fast Learner", description: "Completed 5 lessons in one day", icon: "🚀", date: "Oct 15, 2023" },
    { id: 2, name: "Perfect Score", description: "Scored 100% on a quiz", icon: "🎯", date: "Oct 12, 2023" },
    { id: 3, name: "Streak Keeper", description: "Maintained a 7-day study streak", icon: "🔥", date: "Oct 5, 2023" },
  ]

  const activities = [
    { id: 1, action: "Completed quiz", subject: "Arrays and Linked Lists", time: "2 hours ago" },
    { id: 2, action: "Reviewed flashcards", subject: "Data Structures", time: "Yesterday" },
    { id: 3, action: "Started course", subject: "Advanced Algorithms", time: "3 days ago" },
    { id: 4, action: "Earned achievement", subject: "Perfect Score", time: "1 week ago" },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Avatar initials="JD" size={80} backgroundColor={theme.studyPurple} style={styles.avatar} />
            <Text style={[styles.userName, { color: theme.foreground }]}>{user.name}</Text>
            <Text style={[styles.userRole, { color: theme.mutedForeground }]}>{user.role}</Text>
            <View style={styles.badges}>
              <Badge label={`Level ${user.level}`} color={theme.studyPurple} style={styles.badge} />
              <Badge label={`${user.points} Points`} color={theme.studyBlue} style={styles.badge} />
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <View style={[styles.tabs, { backgroundColor: theme.muted }]}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "overview" && [styles.activeTab, { backgroundColor: theme.primary }]]}
              onPress={() => setActiveTab("overview")}
            >
              <Text style={[styles.tabText, { color: activeTab === "overview" ? "white" : theme.mutedForeground }]}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "courses" && [styles.activeTab, { backgroundColor: theme.primary }]]}
              onPress={() => setActiveTab("courses")}
            >
              <Text style={[styles.tabText, { color: activeTab === "courses" ? "white" : theme.mutedForeground }]}>
                Courses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "achievements" && [styles.activeTab, { backgroundColor: theme.primary }],
              ]}
              onPress={() => setActiveTab("achievements")}
            >
              <Text style={[styles.tabText, { color: activeTab === "achievements" ? "white" : theme.mutedForeground }]}>
                Achievements
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {activeTab === "overview" && (
            <>
              <Card style={styles.card}>
                <CardContent>
                  <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Personal Information</Text>
                  <View style={styles.infoItem}>
                    <View style={styles.infoIcon}>
                      <Ionicons name="person-outline" size={20} color={theme.studyPurple} />
                    </View>
                    <Text style={[styles.infoText, { color: theme.foreground }]}>{user.name}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.infoIcon}>
                      <Ionicons name="mail-outline" size={20} color={theme.studyBlue} />
                    </View>
                    <Text style={[styles.infoText, { color: theme.foreground }]}>{user.email}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.infoIcon}>
                      <Ionicons name="calendar-outline" size={20} color={theme.studyTeal} />
                    </View>
                    <Text style={[styles.infoText, { color: theme.foreground }]}>Joined {user.joinDate}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.infoIcon}>
                      <Ionicons name="location-outline" size={20} color={theme.studyGreen} />
                    </View>
                    <Text style={[styles.infoText, { color: theme.foreground }]}>{user.location}</Text>
                  </View>
                </CardContent>
              </Card>

              <Text style={[styles.sectionTitle, { color: theme.foreground, marginTop: 16 }]}>Recent Activity</Text>
              <Card style={styles.card}>
                <CardContent>
                  {activities.map((activity) => (
                    <View
                      key={activity.id}
                      style={[
                        styles.activityItem,
                        activity.id < activities.length && [styles.activityBorder, { borderBottomColor: theme.border }],
                      ]}
                    >
                      <View style={[styles.activityIcon, { backgroundColor: `${theme.studyBlue}20` }]}>
                        <Ionicons name="time-outline" size={20} color={theme.studyBlue} />
                      </View>
                      <View style={styles.activityContent}>
                        <Text style={[styles.activityTitle, { color: theme.foreground }]}>{activity.action}</Text>
                        <Text style={[styles.activitySubject, { color: theme.foreground }]}>{activity.subject}</Text>
                        <Text style={[styles.activityTime, { color: theme.mutedForeground }]}>{activity.time}</Text>
                      </View>
                    </View>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "courses" && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.foreground }]}>My Courses</Text>
              <Card style={styles.card}>
                <CardContent>
                  {courses.map((course, index) => (
                    <View
                      key={course.id}
                      style={[
                        styles.courseItem,
                        index < courses.length - 1 && [styles.courseBorder, { borderBottomColor: theme.border }],
                      ]}
                    >
                      <Text style={[styles.courseTitle, { color: theme.foreground }]}>{course.name}</Text>
                      <View style={styles.courseProgress}>
                        <View style={styles.progressHeader}>
                          <Text style={[styles.progressText, { color: theme.foreground }]}>
                            {course.progress}% complete
                          </Text>
                          <Text style={[styles.hoursText, { color: theme.mutedForeground }]}>
                            {course.completedHours} / {course.totalHours} hours
                          </Text>
                        </View>
                        <View style={[styles.progressBar, { backgroundColor: theme.muted }]}>
                          <View
                            style={[
                              styles.progressIndicator,
                              {
                                width: `${course.progress}%`,
                                backgroundColor:
                                  course.progress < 30
                                    ? theme.studyOrange
                                    : course.progress < 70
                                      ? theme.studyBlue
                                      : theme.studyGreen,
                              },
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "achievements" && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.foreground }]}>My Achievements</Text>
              <View style={styles.achievementsGrid}>
                {achievements.map((achievement) => (
                  <Card key={achievement.id} style={styles.achievementCard}>
                    <CardContent>
                      <View style={styles.achievementContent}>
                        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                        <Text style={[styles.achievementTitle, { color: theme.foreground }]}>{achievement.name}</Text>
                        <Text style={[styles.achievementDesc, { color: theme.mutedForeground }]}>
                          {achievement.description}
                        </Text>
                        <Text style={[styles.achievementDate, { color: theme.mutedForeground }]}>
                          Earned on {achievement.date}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                ))}
              </View>
            </>
          )}
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>Settings</Text>
          <Card style={styles.card}>
            <CardContent>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.foreground }]}>Dark Mode</Text>
                  <Text style={[styles.settingDesc, { color: theme.mutedForeground }]}>
                    Toggle between light and dark theme
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggleButton, { backgroundColor: isDark ? theme.studyGreen : theme.muted }]}
                  onPress={toggleTheme}
                >
                  <View
                    style={[
                      styles.toggleCircle,
                      {
                        backgroundColor: isDark ? "white" : theme.mutedForeground,
                        transform: [{ translateX: isDark ? 20 : 0 }],
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Edit Profile" variant="outline" style={styles.button} />
          <Button title="Log Out" variant="default" style={styles.button} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
  },
  profileHeader: {
    alignItems: "center",
  },
  avatar: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginBottom: 12,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "center",
  },
  badge: {
    marginHorizontal: 4,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: "#8B5CF6",
  },
  tabText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    width: 24,
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  activityItem: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  activityBorder: {
    borderBottomWidth: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    marginBottom: 2,
  },
  activitySubject: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  courseItem: {
    paddingVertical: 16,
  },
  courseBorder: {
    borderBottomWidth: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  courseProgress: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  hoursText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressIndicator: {
    height: "100%",
    borderRadius: 4,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  achievementCard: {
    width: "48%",
    marginBottom: 16,
  },
  achievementContent: {
    alignItems: "center",
    padding: 8,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 10,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
})

export default ProfileScreen

