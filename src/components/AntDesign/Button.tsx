import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator, type TouchableOpacityProps, View } from "react-native"
import tw from "twrnc"

interface ButtonProps extends TouchableOpacityProps {
  type?: "primary" | "ghost" | "warning" | "default"
  size?: "small" | "large" | "default"
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  type = "default",
  size = "default",
  loading = false,
  disabled = false,
  children,
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case "primary":
        return tw`bg-blue-500`
      case "ghost":
        return tw`bg-transparent border border-gray-300`
      case "warning":
        return tw`bg-red-500`
      default:
        return tw`bg-gray-200`
    }
  }

  const getTextStyle = () => {
    switch (type) {
      case "primary":
        return tw`text-white`
      case "ghost":
        return tw`text-gray-700`
      case "warning":
        return tw`text-white`
      default:
        return tw`text-gray-700`
    }
  }

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return tw`py-1 px-3`
      case "large":
        return tw`py-3 px-6`
      default:
        return tw`py-2 px-4`
    }
  }

  const getTextSizeStyle = () => {
    switch (size) {
      case "small":
        return tw`text-xs`
      case "large":
        return tw`text-lg`
      default:
        return tw`text-base`
    }
  }

  return (
    <TouchableOpacity
      style={[
        tw`rounded-md items-center justify-center`,
        getButtonStyle(),
        getSizeStyle(),
        disabled && tw`opacity-50`,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      <View style={tw`flex-row items-center justify-center`}>
        {loading && (
          <ActivityIndicator size="small" color={type === "ghost" ? "#374151" : "#ffffff"} style={tw`mr-2`} />
        )}
        <Text style={[getTextStyle(), getTextSizeStyle()]}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

