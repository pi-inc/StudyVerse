"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native"
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"

const { width } = Dimensions.get("window")

const ReviewTabs = ({ activeTab, onTabChange }) => {
  const scrollViewRef = useRef(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const { theme } = useTheme()

  const tabs = [
    {
      id: "flashcards",
      label: "Flashcards",
      icon: "credit-card",
      iconType: "feather",
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: "help-circle",
      iconType: "feather",
    },
    {
      id: "concept-maps",
      label: "Concept Maps",
      icon: "share-2",
      iconType: "feather",
    },
    {
      id: "summary-notes",
      label: "Summary Notes",
      icon: "file-text",
      iconType: "feather",
    },
  ]

  // Handle scroll events to hide indicator when scrolled to the end
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const isScrolledToEnd = layoutMeasurement.width + contentOffset.x >= contentSize.width - 20

    if (isScrolledToEnd && showScrollIndicator) {
      setShowScrollIndicator(false)
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150, // Reduced from 300
        useNativeDriver: true,
      }).start()
    } else if (!isScrolledToEnd && !showScrollIndicator) {
      setShowScrollIndicator(true)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150, // Reduced from 300
        useNativeDriver: true,
      }).start()
    }
  }

  // Scroll to active tab
  useEffect(() => {
    if (scrollViewRef.current) {
      const tabIndex = tabs.findIndex((tab) => tab.id === activeTab)
      if (tabIndex > 1) {
        // Only scroll if not one of the first two tabs
        scrollViewRef.current.scrollTo({
          x: tabIndex * 120, // Approximate width of each tab
          animated: true,
        })
      }
    }
  }, [activeTab])

  const renderIcon = (tab) => {
    switch (tab.iconType) {
      case "feather":
        return (
          <Feather
            name={tab.icon}
            size={18}
            color={activeTab === tab.id ? theme.colors.text.primary : theme.colors.text.tertiary}
            style={styles.tabIcon}
          />
        )
      case "fontawesome":
        return (
          <FontAwesome5
            name={tab.icon}
            size={18}
            color={activeTab === tab.id ? theme.colors.text.primary : theme.colors.text.tertiary}
            style={styles.tabIcon}
          />
        )
      case "material":
        return (
          <MaterialIcons
            name={tab.icon}
            size={18}
            color={activeTab === tab.id ? theme.colors.text.primary : theme.colors.text.tertiary}
            style={styles.tabIcon}
          />
        )
      default:
        return (
          <Ionicons
            name={tab.icon}
            size={18}
            color={activeTab === tab.id ? theme.colors.text.primary : theme.colors.text.tertiary}
            style={styles.tabIcon}
          />
        )
    }
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background.secondary }]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && [styles.activeTab, { backgroundColor: theme.colors.background.accent }],
            ]}
            onPress={() => onTabChange(tab.id)}
          >
            {renderIcon(tab)}
            <Text
              style={[
                styles.tabText,
                { color: theme.colors.text.tertiary },
                activeTab === tab.id && [styles.activeTabText, { color: theme.colors.text.primary }],
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Animated.View style={[styles.scrollIndicator, { opacity: fadeAnim }]} pointerEvents="none">
        <View style={[styles.scrollIndicatorGradient, { backgroundColor: theme.colors.background.secondary }]} />
        <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    marginBottom: 24,
  },
  container: {
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    // color set dynamically
  },
  activeTabText: {
    fontWeight: "bold",
    // color set dynamically
  },
  scrollIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  scrollIndicatorGradient: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    opacity: 0.8,
  },
})

export default ReviewTabs

