"use client"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

// Mock data
const recommendations = [
  {
    id: "1",
    title: "Advanced React Native Animations",
    type: "course",
    image: "https://picsum.photos/400/200",
    reason: "Based on your interest in React Native",
    match: 95,
  },
  {
    id: "2",
    title: "JavaScript Design Patterns",
    type: "article",
    image: "https://picsum.photos/400/201",
    reason: "Popular among React Native developers",
    match: 87,
  },
  {
    id: "3",
    title: "Mobile UX Best Practices",
    type: "video",
    image: "https://picsum.photos/400/202",
    reason: "Recommended for UI/UX enthusiasts",
    match: 82,
  },
]

const PersonalizedRecommendations = () => {
  const { theme } = useTheme()
  const navigation = useNavigation()

  const getTypeIcon = (type) => {
    switch (type) {
      case "course":
        return "book-open"
      case "article":
        return "file-text"
      case "video":
        return "video"
      default:
        return "file"
    }
  }

  const renderRecommendationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendationItem}
      onPress={() => {
        // Navigate to the appropriate screen based on the recommendation type
        if (item.type === "course") {
          navigation.navigate("CourseDetail", { courseId: item.id })
        }
        // Handle other types accordingly
      }}
    >
      <Card style={styles.recommendationCard}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.matchContainer}>
            <Text style={[styles.matchText, { color: theme.study.green }]}>{item.match}% Match</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.typeContainer}>
            <Feather name={getTypeIcon(item.type)} size={14} color={theme.primary} />
            <Text style={[styles.typeText, { color: theme.primary }]}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>

          <Text style={[styles.title, { color: theme.foreground }]}>{item.title}</Text>

          <Text style={[styles.reason, { color: theme.mutedForeground }]}>{item.reason}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.foreground }]}>Recommended for You</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: theme.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recommendations}
        renderItem={renderRecommendationItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  listContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  recommendationItem: {
    width: 280,
    marginRight: 12,
  },
  recommendationCard: {
    padding: 0,
    overflow: "hidden",
  },
  imageContainer: {
    height: 140,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  matchContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  contentContainer: {
    padding: 12,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  typeText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    marginLeft: 4,
  },
  reason: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 4,
  },
})

export default PersonalizedRecommendations

