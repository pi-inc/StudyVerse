"use client"

import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native"
import Header from "./Header"

const ScreenLayout = ({
  children,
  title,
  showHeader = true,
  showBack = false,
  onBackPress,
  headerRight,
  scrollEnabled = true,
  contentContainerStyle,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {showHeader && <Header title={title} showBack={showBack} onBackPress={onBackPress} rightButton={headerRight} />}

      {scrollEnabled ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Extra padding at bottom for tab bar
  },
})

export default ScreenLayout

