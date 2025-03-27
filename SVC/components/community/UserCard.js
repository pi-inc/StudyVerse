"use client"

import { useRef } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const UserCard = ({ user }) => {
  const navigation = useNavigation()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const handleMessagePress = () => {
    // Navigate to messaging screen with this user
    // navigation.navigate('Messages', { userId: user.id });
    console.log("Message user:", user.id)
  }

  const handleStudyPress = () => {
    // Navigate to study session screen with this user
    // navigation.navigate('StudySession', { userId: user.id });
    console.log("Study with user:", user.id)
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              defaultSource={require("../../assets/icon.png")}
            />
            {user.isOnline && <View style={styles.onlineIndicator} />}
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.topicContainer}>
              <Feather name="book-open" size={14} color="#8a70ff" style={styles.topicIcon} />
              <Text style={styles.topicText}>{user.topic}</Text>
            </View>
          </View>

          <View style={styles.matchContainer}>
            <Text style={styles.matchText}>{user.matchPercentage}%</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.messageButton} onPress={handleMessagePress}>
            <Feather name="message-circle" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.studyButton} onPress={handleStudyPress}>
            <Feather name="video" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Study</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2d2d44",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#1a1a2e",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  topicContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(138, 112, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  topicIcon: {
    marginRight: 4,
  },
  topicText: {
    fontSize: 12,
    color: "#8a70ff",
    fontWeight: "bold",
  },
  matchContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1e3a8a",
    alignItems: "center",
    justifyContent: "center",
  },
  matchText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2d2d44",
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  studyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8a70ff",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
})

export default UserCard

