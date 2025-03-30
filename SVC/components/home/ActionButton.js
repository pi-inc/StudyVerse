import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../../styles/theme"

const ActionButton = ({ icon, text, backgroundColor, navigateTo, onPress }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else if (navigateTo) {
      navigation.navigate(navigateTo)
    }
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backgroundColor || colors.primary }]}
      onPress={handlePress}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel={text}
      accessibilityRole="button"
    >
      {icon && <Ionicons name={icon} size={20} color="#fff" style={styles.icon} />}
      <Text style={styles.text}>{text}</Text>
      <Ionicons name="chevron-forward" size={20} color="#fff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default ActionButton

