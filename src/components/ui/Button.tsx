import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator, type TouchableOpacityProps, View } from "react-native"
import tw from "twrnc"

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return tw`bg-blue-600 border-blue-600`
      case "secondary":
        return tw`bg-gray-600 border-gray-600`
      case "outline":
        return tw`bg-transparent border-blue-600`
      case "ghost":
        return tw`bg-transparent border-transparent`
      default:
        return tw`bg-blue-600 border-blue-600`
    }
  }

  const getTextStyles = () => {
    switch (variant) {
      case "primary":
      case "secondary":
        return tw`text-white`
      case "outline":
      case "ghost":
        return tw`text-blue-600`
      default:
        return tw`text-white`
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return tw`py-1 px-3`
      case "md":
        return tw`py-2 px-4`
      case "lg":
        return tw`py-3 px-6`
      default:
        return tw`py-2 px-4`
    }
  }

  const getTextSizeStyles = () => {
    switch (size) {
      case "sm":
        return tw`text-xs`
      case "md":
        return tw`text-sm`
      case "lg":
        return tw`text-base`
      default:
        return tw`text-sm`
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={loading || props.disabled}
      style={[
        tw`rounded-md border items-center justify-center flex-row`,
        getVariantStyles(),
        getSizeStyles(),
        fullWidth ? tw`w-full` : {},
        props.disabled ? tw`opacity-50` : {},
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" || variant === "secondary" ? "white" : "#3B82F6"}
          style={tw`mr-2`}
        />
      ) : icon ? (
        <View style={tw`mr-2`}>{icon}</View>
      ) : null}
      <Text style={[tw`font-medium`, getTextStyles(), getTextSizeStyles()]}>{title}</Text>
    </TouchableOpacity>
  )
}

