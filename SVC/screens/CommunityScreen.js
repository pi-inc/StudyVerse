"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Animated } from "react-native"
import { Feather } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import CommunityTabs from "../components/community/CommunityTabs"
import UserCard from "../components/community/UserCard.js"
import FindStudyBuddiesButton from "../components/community/FindStudyBuddiesButton"
import AnimatedListItem from "../components/shared/AnimatedListItem"

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState("users")
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(30)).current
  const fabScaleAnim = useRef(new Animated.Value(0)).current

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
    ]).start()

    // Animate FAB with a slight delay
    Animated.spring(fabScaleAnim, {
      toValue: 1,
      friction: 3, // Reduced from 6
      tension: 60, // Increased from 40
      delay: 300, // Reduced from 500
      useNativeDriver: true,
    }).start()
  }, [])

  // Sample data for users studying similar topics
  const similarUsers = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://example.com/avatar1.jpg",
      topic: "Data Structures",
      matchPercentage: 85,
      isOnline: true,
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      avatar: "https://example.com/avatar2.jpg",
      topic: "Algorithms",
      matchPercentage: 78,
      isOnline: true,
    },
    {
      id: "3",
      name: "Alex Johnson",
      avatar: "https://example.com/avatar3.jpg",
      topic: "Web Development",
      matchPercentage: 72,
      isOnline: true,
    },
  ]

  const headerAnimStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  }

  const fabAnimStyle = {
    transform: [
      { scale: fabScaleAnim },
      {
        translateY: fabScaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
    opacity: fabScaleAnim,
  }

  return (
    <View style={styles.container}>
      <Header
        title="Study Community"
        showBackButton={true}
        rightButton={
          <TouchableOpacity style={styles.chatButton}>
            <Feather name="message-circle" size={24} color="white" />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={headerAnimStyle}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users, groups, topics..."
              placeholderTextColor="#6b7280"
            />
          </View>
        </Animated.View>

        <AnimatedListItem index={0}>
          {/* Tabs */}
          <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </AnimatedListItem>

        {/* Similar Topics Section */}
        <AnimatedListItem index={1}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Feather name="star" size={20} color="#8a70ff" style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Studying Similar Topics</Text>
              </View>
            </View>
          </View>
        </AnimatedListItem>

        {similarUsers.map((user, index) => (
          <AnimatedListItem key={user.id} index={index + 2}>
            <UserCard user={user} />
          </AnimatedListItem>
        ))}

        <AnimatedListItem index={5}>
          {/* Find Study Partners Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Find Study Partners</Text>
            <FindStudyBuddiesButton navigateTo="Community" />
          </View>
        </AnimatedListItem>
      </ScrollView>

      {/* Floating Action Button */}
      <Animated.View style={[styles.fabContainer, fabAnimStyle]}>
        <TouchableOpacity style={styles.fab}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  chatButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: "white",
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  fabContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#8a70ff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

export default CommunityScreen

