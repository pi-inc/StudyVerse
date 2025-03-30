// Theme configuration with support for dark and light modes

// Light theme colors
const lightColors = {
  primary: "#7c3aed", // Purple
  primaryLight: "#a78bfa",
  secondary: "#3b82f6", // Blue
  accent: "#10b981", // Green
  info: "#0ea5e9", // Light blue
  warning: "#f59e0b", // Orange
  error: "#ef4444", // Red
  success: "#10b981", // Green

  background: {
    primary: "#ffffff",
    secondary: "#f3f4f6",
    card: "#ffffff",
    elevated: "#f9fafb",
  },

  text: {
    primary: "#111827", // Very dark gray
    secondary: "#374151", // Dark gray
    tertiary: "#6b7280", // Medium gray
    muted: "#9ca3af", // Light gray
    inverse: "#f8fafc", // White text for dark backgrounds
  },

  border: {
    light: "#e5e7eb",
    dark: "#d1d5db",
  },
}

// Dark theme colors
const darkColors = {
  primary: "#7c3aed", // Purple
  primaryLight: "#a78bfa",
  secondary: "#3b82f6", // Blue
  accent: "#10b981", // Green
  info: "#0ea5e9", // Light blue
  warning: "#f59e0b", // Orange
  error: "#ef4444", // Red
  success: "#10b981", // Green

  background: {
    primary: "#0f172a", // Dark blue
    secondary: "#1e293b",
    card: "#1e293b",
    elevated: "#334155",
  },

  text: {
    primary: "#f8fafc", // Very light gray, almost white
    secondary: "#cbd5e1", // Light gray
    tertiary: "#94a3b8", // Medium gray
    muted: "#64748b", // Dark gray
    inverse: "#111827", // Dark text for light backgrounds
  },

  border: {
    light: "#334155",
    dark: "#1e293b",
  },
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    bold: "700",
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
}

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
}

// Export theme configurations
export const themes = {
  light: {
    colors: lightColors,
    spacing,
    typography,
    borderRadius,
    isDark: false,
  },
  dark: {
    colors: darkColors,
    spacing,
    typography,
    borderRadius,
    isDark: true,
  },
}

// For backward compatibility, export the dark theme colors as the default
export const colors = darkColors

