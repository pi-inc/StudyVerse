import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyle = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    type === 'secondary' && styles.secondaryButton,
    type === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyleArray = [
    styles.text,
    type === 'primary' && styles.primaryText,
    type === 'secondary' && styles.secondaryText,
    type === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={type === 'outline' ? '#6200ee' : '#ffffff'}
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyleArray}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#6200ee',
  },
  secondaryButton: {
    backgroundColor: '#03dac6',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#000000',
  },
  outlineText: {
    color: '#6200ee',
  },
  disabledText: {
    color: '#9e9e9e',
  },
});

export default CustomButton; 