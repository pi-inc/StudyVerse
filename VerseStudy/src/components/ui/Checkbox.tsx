"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { Feather } from "@expo/vector-icons"

interface CheckboxProps {
  checked: boolean
  onCheck: () => void
  label?: string
  disabled?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheck, label, disabled = false }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity style={styles.container} onPress={onCheck} disabled={disabled} activeOpacity={0.7}>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? theme.primary : "transparent",
            borderColor: checked ? theme.primary : theme.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {checked && <Feather name="check" size={14} color={theme.primaryForeground} />}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.foreground,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
})

export default Checkbox

