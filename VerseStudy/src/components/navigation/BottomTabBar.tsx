"use client"

import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../../context/ThemeContext"
import * as Haptics from "expo-haptics"

// Import icons
import HomeIcon from "../icons/HomeIcon"
import CoursesIcon from "../icons/CoursesIcon"
import ReviseIcon from "../icons/ReviseIcon"
import PlanIcon from "../icons/PlanIcon"
import SocialIcon from "../icons/SocialIcon"

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? theme.primaryForeground : theme.mutedForeground

    switch (routeName) {
      case "Home":
        return <HomeIcon color={color} />
      case "Courses":
        return <CoursesIcon color={color} />
      case "Revise":
        return <ReviseIcon color={color} />
      case "Plan":
        return <PlanIcon color={color} />
      case "Social":
        return <SocialIcon color={color} />
      default:
        return <HomeIcon color={color} />
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // Provide haptic feedback
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={`${label} tab`}
            onPress={onPress}
            style={styles.tabButton}
          >
            {isFocused ? (
              <LinearGradient
                colors={[theme.study.purple, theme.study.blue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.activeTabBackground}
              >
                {getIcon(route.name, isFocused)}
                <Text style={[styles.label, { color: theme.primaryForeground }]}>{route.name}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTabContent}>
                {getIcon(route.name, isFocused)}
                <Text style={[styles.label, { color: theme.mutedForeground }]}>{route.name}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  activeTabBackground: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveTabContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Inter_500Medium",
  },
})

export default BottomTabBar

