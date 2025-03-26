"use client"

import type React from "react"
import { RefreshControl, ScrollView, StyleSheet, type ViewStyle } from "react-native"
import { useTheme } from "../../context/ThemeContext"

interface PullToRefreshProps {
  refreshing: boolean
  onRefresh: () => void
  children: React.ReactNode
  contentContainerStyle?: ViewStyle
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ refreshing, onRefresh, children, contentContainerStyle }) => {
  const { theme } = useTheme()

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.primary]}
          tintColor={theme.primary}
          progressBackgroundColor={theme.background}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
})

export default PullToRefresh

