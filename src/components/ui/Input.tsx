import type React from "react"
import { forwardRef } from "react"
import { TextInput, View, Text, type TextInputProps } from "react-native"
import tw from "twrnc"

export interface InputProps extends TextInputProps {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, leftIcon, rightIcon, style, ...props }, ref) => {
    return (
      <View style={tw`mb-4`}>
        {label && <Text style={tw`text-sm font-medium text-gray-700 dark:text-gray-300 mb-1`}>{label}</Text>}
        <View style={tw`relative`}>
          {leftIcon && <View style={tw`absolute left-3 top-2.5 z-10`}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[
              tw`bg-white dark:bg-gray-800 border rounded-md py-2 px-3 text-gray-900 dark:text-white`,
              error ? tw`border-red-500` : tw`border-gray-300 dark:border-gray-600`,
              leftIcon ? tw`pl-10` : {},
              rightIcon ? tw`pr-10` : {},
              style,
            ]}
            placeholderTextColor="#9CA3AF"
            {...props}
          />
          {rightIcon && <View style={tw`absolute right-3 top-2.5 z-10`}>{rightIcon}</View>}
        </View>
        {error && <Text style={tw`mt-1 text-xs text-red-500`}>{error}</Text>}
      </View>
    )
  },
)

Input.displayName = "Input"

