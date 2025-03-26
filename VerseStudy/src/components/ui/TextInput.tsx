"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
  type TextInputProps as RNTextInputProps,
} from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { Feather } from "@expo/vector-icons"

interface TextInputProps extends RNTextInputProps {
  label?: string
  error?: string
  secureTextEntry?: boolean
}

const TextInput: React.FC<TextInputProps> = ({ label, error, secureTextEntry, ...props }) => {
  const { theme } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry)

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.foreground }]}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? theme.destructive : isFocused ? theme.primary : theme.border,
            backgroundColor: theme.background,
          },
        ]}
      >
        <RNTextInput
          style={[styles.input, { color: theme.foreground }]}
          placeholderTextColor={theme.mutedForeground}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
            <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={20} color={theme.mutedForeground} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={[styles.errorText, { color: theme.destructive }]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 44,
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 4,
  },
})

export default TextInput

