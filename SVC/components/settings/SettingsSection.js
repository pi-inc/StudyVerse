"use client"

import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const SettingsSection = ({ title, icon, description, items }) => {
  const [expanded, setExpanded] = useState(false)
  const [toggleStates, setToggleStates] = useState(
    items.reduce((acc, item) => {
      if (item.toggle) {
        acc[item.id] = false
      }
      return acc
    }, {}),
  )

  const [selectedOptions, setSelectedOptions] = useState(
    items.reduce((acc, item) => {
      if (item.options) {
        acc[item.id] = item.options[0]
      }
      return acc
    }, {}),
  )

  const rotateAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  const toggleSwitch = (id) => {
    setToggleStates({
      ...toggleStates,
      [id]: !toggleStates[id],
    })
  }

  const selectOption = (id, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [id]: option,
    })
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)

    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

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

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const arrowStyles = {
    transform: [{ rotate: rotateInterpolate }],
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <TouchableOpacity
          style={styles.headerContainer}
          onPress={toggleExpand}
          activeOpacity={0.7}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color="#a78bfa" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Animated.View style={arrowStyles}>
            <Ionicons name="chevron-down" size={24} color="#a78bfa" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {expanded && (
        <View style={styles.itemsContainer}>
          {items.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{
                opacity: 1,
                transform: [
                  {
                    translateY: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <View style={[styles.itemRow, item.danger && styles.dangerItem]}>
                <View style={styles.itemLeft}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={item.danger ? "#ef4444" : "#a78bfa"}
                    style={styles.itemIcon}
                  />
                  <Text style={[styles.itemText, item.danger && styles.dangerText]}>{item.title}</Text>
                </View>

                <View style={styles.itemRight}>
                  {item.toggle && (
                    <Switch
                      trackColor={{ false: "#374151", true: "#7c3aed" }}
                      thumbColor={toggleStates[item.id] ? "#a78bfa" : "#f4f3f4"}
                      ios_backgroundColor="#374151"
                      onValueChange={() => toggleSwitch(item.id)}
                      value={toggleStates[item.id]}
                    />
                  )}

                  {item.options && (
                    <TouchableOpacity style={styles.optionSelector}>
                      <Text style={styles.optionText}>{selectedOptions[item.id]}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                    </TouchableOpacity>
                  )}

                  {!item.toggle && !item.options && <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      )}

      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#9ca3af",
  },
  itemsContainer: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2d2d44",
  },
  dangerItem: {
    borderLeftWidth: 3,
    borderLeftColor: "#ef4444",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
  dangerText: {
    color: "#ef4444",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    color: "#9ca3af",
    marginRight: 8,
  },
  divider: {
    height: 4,
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    borderRadius: 2,
    marginTop: 8,
  },
})

export default SettingsSection

