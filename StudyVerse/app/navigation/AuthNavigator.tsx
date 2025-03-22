import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import PhoneLoginScreen from '../screens/auth/PhoneLoginScreen';

// Define the types for our auth stack
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  PhoneLogin: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator; 