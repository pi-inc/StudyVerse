import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  User
} from 'firebase/auth';
import { Platform } from 'react-native';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<User> => {
  try {
    // Use appropriate sign-in method based on platform
    if (Platform.OS === 'web') {
      // For web, we can use popup or redirect
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } else {
      // For mobile (iOS/Android), we use a mock for testing
      console.log('Mobile Google Sign-In (Mock Implementation)');
      
      // Check if we already have a mock user to prevent duplicate logins
      if ((global as any).__FIREBASE_MOCK_USER__) {
        console.log('Reusing existing mock user');
        return (global as any).__FIREBASE_MOCK_USER__;
      }
      
      // Create a simplified mock user
      const mockUser = {
        uid: 'google-mock-uid-' + Date.now(),
        displayName: 'Google User',
        email: 'google.user@example.com',
        photoURL: 'https://example.com/profile.jpg',
        // Add minimal properties needed for the User interface
        emailVerified: true,
        isAnonymous: false,
        providerData: [
          {
            providerId: 'google.com',
            uid: 'mock-uid',
            displayName: 'Google User',
            email: 'google.user@example.com',
            phoneNumber: null,
            photoURL: 'https://example.com/profile.jpg',
          }
        ],
        getIdToken: () => Promise.resolve('mock-id-token'),
        reload: () => Promise.resolve(),
        delete: () => Promise.resolve(),
        toJSON: () => ({})
      } as unknown as User;
      
      // Store our mock user in a global variable
      (global as any).__FIREBASE_MOCK_USER__ = mockUser;
      
      // Instead of trying to trigger auth state change here, let App.tsx handle it
      // This avoids potential race conditions and loops
      
      return mockUser;
    }
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

// Phone Authentication
export const sendPhoneVerificationCode = async (phoneNumber: string): Promise<any> => {
  try {
    // For development purposes, we'll just return a mock confirmation result
    // In a production app, you would use the actual Firebase phone authentication
    console.log(`Sending code to ${phoneNumber}`);
    
    // Create a mock confirmation result
    const mockConfirmationResult = {
      confirm: async (code: string) => {
        // In a real app, this would verify the code with Firebase
        console.log(`Verifying code: ${code}`);
        if (code === '123456') {
          // Mock user
          return {
            user: {
              uid: 'mock-uid-' + Date.now(),
              phoneNumber,
              displayName: 'Phone User',
              email: null
            }
          };
        } else {
          throw new Error('Invalid verification code');
        }
      }
    };
    
    return mockConfirmationResult;
  } catch (error) {
    console.error('Phone auth error:', error);
    throw error;
  }
};

export const confirmPhoneVerificationCode = async (confirmationResult: any, verificationCode: string): Promise<User> => {
  try {
    const userCredential = await confirmationResult.confirm(verificationCode);
    return userCredential.user;
  } catch (error) {
    console.error('Code verification error:', error);
    throw error;
  }
};

// Auth state observer
export const subscribeToAuthChanges = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };
export default app; 