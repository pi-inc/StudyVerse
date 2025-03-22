import type React from "react"
import { TextInput, View, Text, type TextInputProps, TouchableOpacity } from "react-native"
import tw from "twrnc"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  clear?: boolean
  onClear?: () => void
}

export const Input: React.FC<InputProps> = ({ label, error, prefix, suffix, clear, onClear, style, ...props }) => {
  return (
    <View style={tw`mb-4`}>
      {label && <Text style={tw`text-gray-700 mb-1 font-medium`}>{label}</Text>}
      <View
        style={[
          tw`flex-row items-center border rounded-md px-3 py-2`,
          error ? tw`border-red-500` : tw`border-gray-300`,
          props.editable === false && tw`bg-gray-100`,
        ]}
      >
        {prefix && <View style={tw`mr-2`}>{prefix}</View>}
        <TextInput style={[tw`flex-1 text-base`, style]} placeholderTextColor="#9CA3AF" {...props} />
        {suffix && <View style={tw`ml-2`}>{suffix}</View>}
        {clear && props.value && (
          <TouchableOpacity onPress={onClear} style={tw`ml-2`}>
            <Text style={tw`text-gray-400 text-lg`}>×</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={tw`text-red-500 mt-1 text-sm`}>{error}</Text>}
    </View>
  )
}

