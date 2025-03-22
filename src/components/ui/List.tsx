import type React from "react"
import { View, Text, TouchableOpacity, type ViewProps } from "react-native"
import tw from "twrnc"

export interface ListItemProps {
  title: string
  description?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onPress?: () => void
  disabled?: boolean
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  leftIcon,
  rightIcon,
  onPress,
  disabled = false,
}) => {
  const Container = onPress ? TouchableOpacity : View

  return (
    <Container
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.7}
      style={[
        tw`flex-row items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700`,
        disabled ? tw`opacity-50` : {},
      ]}
      disabled={disabled}
    >
      {leftIcon && <View style={tw`mr-3`}>{leftIcon}</View>}
      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-medium text-gray-900 dark:text-white`}>{title}</Text>
        {description && <Text style={tw`text-sm text-gray-500 dark:text-gray-400 mt-0.5`}>{description}</Text>}
      </View>
      {rightIcon && <View style={tw`ml-2`}>{rightIcon}</View>}
    </Container>
  )
}

export interface ListProps extends ViewProps {
  header?: string
  footer?: string
  bordered?: boolean
}

export const List: React.FC<ListProps> = ({ children, header, footer, bordered = true, style, ...props }) => {
  return (
    <View style={tw`mb-4`}>
      {header && (
        <Text style={tw`text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1 px-4`}>{header}</Text>
      )}
      <View
        style={[
          tw`bg-white dark:bg-gray-800 overflow-hidden`,
          bordered ? tw`border border-gray-200 dark:border-gray-700 rounded-md` : {},
          style,
        ]}
        {...props}
      >
        {children}
      </View>
      {footer && <Text style={tw`text-xs text-gray-500 dark:text-gray-400 mt-1 px-4`}>{footer}</Text>}
    </View>
  )
}

