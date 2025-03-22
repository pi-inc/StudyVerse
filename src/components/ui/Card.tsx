import type React from "react"
import { View, Text, type ViewProps } from "react-native"
import tw from "twrnc"

export interface CardProps extends ViewProps {
  title?: string
  footer?: React.ReactNode
  bordered?: boolean
}

export const Card: React.FC<CardProps> = ({ children, title, footer, bordered = true, style, ...props }) => {
  return (
    <View
      style={[
        tw`bg-white dark:bg-gray-800 rounded-lg overflow-hidden`,
        bordered ? tw`border border-gray-200 dark:border-gray-700` : {},
        style,
      ]}
      {...props}
    >
      {title && (
        <View style={tw`px-4 py-3 border-b border-gray-200 dark:border-gray-700`}>
          <Text style={tw`font-semibold text-base text-gray-800 dark:text-white`}>{title}</Text>
        </View>
      )}
      <View style={tw`p-4`}>{children}</View>
      {footer && <View style={tw`px-4 py-3 border-t border-gray-200 dark:border-gray-700`}>{footer}</View>}
    </View>
  )
}

