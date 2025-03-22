import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import LoginScreen from '../screens/auth/LoginScreen';

// Placeholder Home screen component
const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to StudyVerse!</Text>
    <Text>This is a placeholder for the Home screen.</Text>
  </View>
);

// Define the types for our app stack
export type AppStackParamList = {
  Home: undefined;
  Login: undefined; // Added Login to the stack param list
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'StudyVerse',
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          title: 'Login', // Optional: Customize the title
        }}
      />
      {/* Add other app screens here */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ee',
  },
});

export default AppNavigator;