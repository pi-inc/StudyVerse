import type React from "react"
import { View, Text, type ViewProps } from "react-native"
import tw from "twrnc"

interface CardProps extends ViewProps {
  title?: string
  extra?: React.ReactNode
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, extra, children, style, ...props }) => {
  return (
    <View style={[tw`bg-white rounded-lg shadow-md overflow-hidden mb-4`, style]} {...props}>
      {(title || extra) && (
        <View style={tw`flex-row justify-between items-center p-3 border-b border-gray-200`}>
          {title && <Text style={tw`font-bold text-lg`}>{title}</Text>}
          {extra && <View>{extra}</View>}
        </View>
      )}
      <View style={tw`p-4`}>{children}</View>
    </View>
  )
}

