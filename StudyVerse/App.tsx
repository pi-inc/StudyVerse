import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import { auth } from './app/services/firebase';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app if needed
const app = initializeApp(firebaseConfig);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  
  // Handle user state changes
  function onAuthStateChangedHandler(user: User | null) {
    console.log('Auth state changed, user:', user ? 'signed in' : 'signed out');
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // Direct check for mock user
  useEffect(() => {
    // Check for a Google mock user in our global variable
    if (Platform.OS !== 'web' && !user) {
      const mockUser = (global as any).__FIREBASE_MOCK_USER__;
      if (mockUser) {
        console.log('Setting user directly from mock user');
        setUser(mockUser);
        if (initializing) setInitializing(false);
      }
    }
  }, []); // Only run once on mount
  
  // Firebase auth state listener
  useEffect(() => {
    console.log('Setting up Firebase auth state listener');
    // Subscribe to Firebase authentication state changes
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedHandler);
    
    // Cleanup function
    return () => {
      console.log('Cleaning up Firebase auth state listener');
      subscriber();
    };
  }, []); // Only run once on mount

  // This effect checks periodically for mock users (mobile only)
  useEffect(() => {
    if (Platform.OS === 'web' || user) return; // Skip for web or if already logged in
    
    console.log('Setting up periodic mock user check');
    
    // Check immediately and then set interval
    const checkForMockUser = () => {
      const mockUser = (global as any).__FIREBASE_MOCK_USER__;
      if (mockUser && !user) {
        console.log('Found mock user during periodic check');
        setUser(mockUser);
        return true;
      }
      return false;
    };
    
    // First check
    const initialFound = checkForMockUser();
    
    // Set up interval for subsequent checks, but only if not found initially
    let intervalId: any = null;
    if (!initialFound) {
      intervalId = setInterval(() => {
        const found = checkForMockUser();
        if (found && intervalId) {
          console.log('Clearing mock user check interval');
          clearInterval(intervalId);
        }
      }, 1000);
    }
    
    // Cleanup
    return () => {
      if (intervalId) {
        console.log('Cleaning up mock user check interval');
        clearInterval(intervalId);
      }
    };
  }, [user]); // Re-run if user changes

  // Show loading screen if still initializing
  if (initializing) {
    return null; // You could add a loading indicator here
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
