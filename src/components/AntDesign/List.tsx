import type React from "react"
import { View, Text, TouchableOpacity, type ViewProps, type TouchableOpacityProps } from "react-native"
import tw from "twrnc"

interface ListProps extends ViewProps {
  children: React.ReactNode
  renderHeader?: React.ReactNode | (() => React.ReactNode)
  renderFooter?: React.ReactNode | (() => React.ReactNode)
}

export const List: React.FC<ListProps> = ({ children, renderHeader, renderFooter, style, ...props }) => {
  return (
    <View style={[tw`bg-white rounded-lg overflow-hidden mb-4`, style]} {...props}>
      {renderHeader && (
        <View style={tw`p-3 border-b border-gray-200`}>
          {typeof renderHeader === "function" ? renderHeader() : renderHeader}
        </View>
      )}
      <View>{children}</View>
      {renderFooter && (
        <View style={tw`p-3 border-t border-gray-200`}>
          {typeof renderFooter === "function" ? renderFooter() : renderFooter}
        </View>
      )}
    </View>
  )
}

interface ListItemProps extends TouchableOpacityProps {
  title: string
  subtitle?: string
  extra?: React.ReactNode
  arrow?: boolean
  thumb?: React.ReactNode
  children?: React.ReactNode
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  extra,
  arrow,
  thumb,
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity style={[tw`flex-row items-center p-4 border-b border-gray-200`, style]} {...props}>
      {thumb && <View style={tw`mr-3`}>{thumb}</View>}
      <View style={tw`flex-1`}>
        <Text style={tw`font-medium text-base`}>{title}</Text>
        {subtitle && <Text style={tw`text-gray-500 text-sm mt-1`}>{subtitle}</Text>}
        {children}
      </View>
      {extra && <View style={tw`ml-2`}>{extra}</View>}
      {arrow && <Text style={tw`text-gray-400 ml-2`}>›</Text>}
    </TouchableOpacity>
  )
}

