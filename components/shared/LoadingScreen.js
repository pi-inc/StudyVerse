"use client"

import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { colors } from "../../styles/theme"

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.dark,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.primary,
  },
})

export default LoadingScreen

