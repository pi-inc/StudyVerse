"use client"

import { useRef, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import AnimatedListItem from "../components/shared/AnimatedListItem"
import { useTheme } from "../context/ThemeContext"

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current
  const profileImageAnim = useRef(new Animated.Value(0.5)).current
  const { theme } = useTheme()

  useEffect(() => {
    // Animate main content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // Reduced from 800
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500, // Reduced from 800
        useNativeDriver: true,
      }),
      Animated.spring(profileImageAnim, {
        toValue: 1,
        friction: 3, // Reduced from 6
        tension: 60, // Increased from 40
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const userInfo = {
    name: "John Doe",
    title: "Computer Science Student",
    level: 5,
    points: 750,
    email: "john.doe@example.com",
    joinDate: "September 2023",
    location: "New York, USA",
    streak: {
      days: 5,
      label: "5 day streak",
      progress: 0.7, // 5/7
    },
    recentActivities: [
      {
        id: 1,
        type: "Completed quiz",
        subject: "Arrays and Linked Lists",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "Reviewed flashcards",
        subject: "Data Structures",
        time: "Yesterday",
      },
      {
        id: 3,
        type: "Started course",
        subject: "Advanced Algorithms",
        time: "3 days ago",
      },
      {
        id: 4,
        type: "Earned achievement",
        subject: "Perfect Score",
        time: "1 week ago",
      },
    ],
  }

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  const profileImageAnimStyle = {
    transform: [{ scale: profileImageAnim }],
    opacity: profileImageAnim,
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <Animated.View style={headerAnimStyle}>
          <View style={styles.titleSection}>
            <Text style={[styles.titleText, { color: theme.colors.primary }]}>My Profile</Text>
            <View style={[styles.purpleDivider, { backgroundColor: theme.colors.primary }]} />
          </View>
        </Animated.View>

        <View style={styles.profileSection}>
          <Animated.View style={[styles.profileImageContainer, profileImageAnimStyle]}>
            <View style={[styles.profileImage, { backgroundColor: theme.colors.background.secondary }]} />
            <TouchableOpacity
              style={[
                styles.editButton,
                { backgroundColor: theme.colors.background.secondary, borderColor: theme.colors.background.accent },
              ]}
            >
              <Ionicons name="pencil" size={16} color={theme.colors.text.primary} />
              <Text style={[styles.editText, { color: theme.colors.text.primary }]}>Edit</Text>
            </TouchableOpacity>
          </Animated.View>

          <AnimatedListItem index={0}>
            <Text style={[styles.userName, { color: theme.colors.text.primary }]}>{userInfo.name}</Text>
            <Text style={[styles.userTitle, { color: theme.colors.text.secondary }]}>{userInfo.title}</Text>
          </AnimatedListItem>

          <AnimatedListItem index={1}>
            <View style={styles.badgesContainer}>
              <View style={[styles.levelBadge, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>Level {userInfo.level}</Text>
              </View>
              <View style={[styles.pointsBadge, { backgroundColor: theme.colors.background.secondary }]}>
                <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>{userInfo.points} Points</Text>
              </View>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={2}>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Ionicons name="person-outline" size={18} color={theme.colors.primary} style={styles.infoIcon} />
                <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>{userInfo.name}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="mail-outline" size={18} color={theme.colors.primary} style={styles.infoIcon} />
                <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>{userInfo.email}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={18} color={theme.colors.primary} style={styles.infoIcon} />
                <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>Joined {userInfo.joinDate}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={18} color={theme.colors.primary} style={styles.infoIcon} />
                <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>{userInfo.location}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="school-outline" size={18} color={theme.colors.primary} style={styles.infoIcon} />
                <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>{userInfo.title}</Text>
              </View>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={3}>
            <View style={styles.streakSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Current Study Streak</Text>
              <View style={styles.streakContainer}>
                <View style={[styles.streakBadge, { backgroundColor: theme.colors.secondary }]}>
                  <Text style={[styles.streakNumber, { color: theme.colors.text.primary }]}>
                    {userInfo.streak.days}
                  </Text>
                </View>
                <View style={styles.streakInfo}>
                  <Text style={[styles.streakLabel, { color: theme.colors.text.primary }]}>
                    {userInfo.streak.label}
                  </Text>
                  <View style={[styles.streakProgressContainer, { backgroundColor: theme.colors.background.accent }]}>
                    <Animated.View
                      style={[
                        styles.streakProgress,
                        {
                          width: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", `${userInfo.streak.progress * 100}%`],
                          }),
                          backgroundColor: theme.colors.warning,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.streakGoal, { color: theme.colors.text.secondary }]}>5/7</Text>
                </View>
              </View>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={4}>
            <View style={[styles.tabsContainer, { backgroundColor: theme.colors.background.secondary }]}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "overview" && [styles.activeTab, { backgroundColor: theme.colors.primary }],
                ]}
                onPress={() => setActiveTab("overview")}
              >
                <Ionicons name="person-outline" size={18} color={theme.colors.text.primary} />
                <Text style={[styles.tabText, { color: theme.colors.text.primary }]}>Overview</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "courses" && [styles.activeTab, { backgroundColor: theme.colors.primary }],
                ]}
                onPress={() => setActiveTab("courses")}
              >
                <Ionicons name="book-outline" size={18} color={theme.colors.text.primary} />
                <Text style={[styles.tabText, { color: theme.colors.text.primary }]}>Courses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "achievements" && [styles.activeTab, { backgroundColor: theme.colors.primary }],
                ]}
                onPress={() => setActiveTab("achievements")}
              >
                <Ionicons name="trophy-outline" size={18} color={theme.colors.text.primary} />
                <Text style={[styles.tabText, { color: theme.colors.text.primary }]}>Achievements</Text>
              </TouchableOpacity>
            </View>
          </AnimatedListItem>
        </View>

        <AnimatedListItem index={5}>
          <View style={[styles.divider, { backgroundColor: theme.colors.background.accent }]} />
          <View style={[styles.blueDivider, { backgroundColor: theme.colors.info }]} />
        </AnimatedListItem>

        <AnimatedListItem index={6}>
          <View style={styles.activitySection}>
            <Text style={[styles.activityTitle, { color: theme.colors.text.primary }]}>Recent Activity</Text>
            <Text style={[styles.activitySubtitle, { color: theme.colors.text.secondary }]}>
              Your latest learning activities
            </Text>
          </View>
        </AnimatedListItem>

        {userInfo.recentActivities.map((activity, index) => (
          <AnimatedListItem key={activity.id} index={index + 7}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIconContainer, { backgroundColor: `${theme.colors.info}20` }]}>
                <Ionicons name="time-outline" size={20} color={theme.colors.info} />
              </View>
              <View style={[styles.activityContent, { borderBottomColor: theme.colors.background.accent }]}>
                <Text style={[styles.activityType, { color: theme.colors.text.primary }]}>{activity.type}</Text>
                <Text style={[styles.activitySubject, { color: theme.colors.text.secondary }]}>{activity.subject}</Text>
                <Text style={[styles.activityTime, { color: theme.colors.text.tertiary }]}>{activity.time}</Text>
              </View>
            </View>
          </AnimatedListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor set dynamically
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    // color set dynamically
    marginBottom: 10,
  },
  purpleDivider: {
    height: 4,
    // backgroundColor set dynamically
    borderRadius: 2,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // backgroundColor set dynamically
  },
  editButton: {
    position: "absolute",
    right: -20,
    top: 10,
    // backgroundColor set dynamically
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    // borderColor set dynamically
  },
  editText: {
    // color set dynamically
    marginLeft: 4,
    fontSize: 14,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    // color set dynamically
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    // color set dynamically
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  levelBadge: {
    // backgroundColor set dynamically
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  pointsBadge: {
    // backgroundColor set dynamically
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    // color set dynamically
    fontWeight: "bold",
    fontSize: 14,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
    width: 24,
  },
  infoText: {
    // color set dynamically
    fontSize: 15,
  },
  streakSection: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // color set dynamically
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor set dynamically
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  streakNumber: {
    // color set dynamically
    fontWeight: "bold",
    fontSize: 18,
  },
  streakInfo: {
    flex: 1,
  },
  streakLabel: {
    // color set dynamically
    marginBottom: 8,
  },
  streakProgressContainer: {
    height: 8,
    // backgroundColor set dynamically
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 4,
  },
  streakProgress: {
    height: "100%",
    // backgroundColor set dynamically
    borderRadius: 4,
  },
  streakGoal: {
    // color set dynamically
    fontSize: 12,
    alignSelf: "flex-end",
  },
  tabsContainer: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor set dynamically
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 6,
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabText: {
    // color set dynamically
    marginLeft: 6,
    fontSize: 14,
  },
  divider: {
    height: 1,
    // backgroundColor set dynamically
    marginVertical: 8,
  },
  blueDivider: {
    height: 4,
    // backgroundColor set dynamically
    borderRadius: 2,
    marginBottom: 24,
  },
  activitySection: {
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color set dynamically
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    // color set dynamically
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // backgroundColor set dynamically
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
    borderBottomWidth: 1,
    // borderBottomColor set dynamically
    paddingBottom: 16,
  },
  activityType: {
    fontSize: 16,
    fontWeight: "bold",
    // color set dynamically
    marginBottom: 2,
  },
  activitySubject: {
    fontSize: 14,
    // color set dynamically
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    // color set dynamically
  },
})

export default ProfileScreen

