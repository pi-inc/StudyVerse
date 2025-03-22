import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  User
} from 'firebase/auth';

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
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
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