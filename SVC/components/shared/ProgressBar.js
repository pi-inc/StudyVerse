import { View, StyleSheet } from "react-native"

const ProgressBar = ({ progress, color = "#6366f1", height = 6, style }) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress || 0, 0), 100)

  return (
    <View style={[styles.container, { height }, style]}>
      <View
        style={[
          styles.progress,
          {
            width: `${safeProgress}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progress: {
    borderRadius: 4,
  },
})

export default ProgressBar

