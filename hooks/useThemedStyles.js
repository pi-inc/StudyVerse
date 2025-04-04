"use client"

import { useMemo } from "react"
import { StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"

/**
 * Hook to create themed styles
 * @param {Function} createStyles - Function that takes theme and returns StyleSheet
 * @returns {Object} - StyleSheet object with themed styles
 */
export const useThemedStyles = (createStyles) => {
  const { theme } = useTheme()

  // Memoize styles to prevent unnecessary re-renders
  return useMemo(() => {
    return StyleSheet.create(createStyles(theme))
  }, [theme, createStyles])
}

