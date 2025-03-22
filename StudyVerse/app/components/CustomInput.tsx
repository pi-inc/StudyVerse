import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  leftIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  secureTextEntry = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
          inputStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor="#9e9e9e"
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={22}
              color="#757575"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    height: 50,
  },
  focusedInput: {
    borderColor: '#6200ee',
    backgroundColor: '#ffffff',
  },
  errorInput: {
    borderColor: '#b00020',
  },
  leftIconContainer: {
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#212121',
    height: 50,
  },
  passwordToggle: {
    padding: 12,
  },
  errorText: {
    color: '#b00020',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput; 