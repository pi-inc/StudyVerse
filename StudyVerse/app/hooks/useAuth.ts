import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  signOutUser,
  resetPassword,
  signInWithGoogle,
  sendPhoneVerificationCode,
  confirmPhoneVerificationCode,
  subscribeToAuthChanges,
} from '../services/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  confirmationResult: any | null;
}

interface AuthActions {
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  sendPhoneCode: (phoneNumber: string) => Promise<void>;
  verifyPhoneCode: (code: string) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): [AuthState, AuthActions] => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    confirmationResult: null,
  });

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setState((prevState) => ({
        ...prevState,
        user,
        loading: false,
      }));
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, displayName: string): Promise<void> => {
    try {
      setState({ ...state, loading: true, error: null });
      await signUpWithEmailAndPassword(email, password, displayName);
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setState({ ...state, loading: true, error: null });
      await loginWithEmailAndPassword(email, password);
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setState({ ...state, loading: true, error: null });
      await signOutUser();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

  const resetUserPassword = async (email: string): Promise<void> => {
    try {
      setState({ ...state, loading: true, error: null });
      await resetPassword(email);
      setState({ ...state, loading: false });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

  const googleLogin = async (): Promise<void> => {
    try {
      setState({ ...state, loading: true, error: null });
      await signInWithGoogle();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

  const sendPhoneCode = async (phoneNumber: string): Promise<void> => {
    try {
      setState({ ...state, loading: true, error: null });
      const confirmationResult = await sendPhoneVerificationCode(phoneNumber);
      setState({ 
        ...state, 
        loading: false, 
        confirmationResult 
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

  const verifyPhoneCode = async (code: string): Promise<void> => {
    try {
      if (!state.confirmationResult) {
        throw new Error('Phone verification not initiated');
      }
      
      setState({ ...state, loading: true, error: null });
      await confirmPhoneVerificationCode(state.confirmationResult, code);
      setState({ 
        ...state, 
        loading: false, 
        confirmationResult: null 
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

  const clearError = (): void => {
    setState({ ...state, error: null });
  };

  return [
    state,
    {
      signup,
      login,
      logout,
      resetUserPassword,
      googleLogin,
      sendPhoneCode,
      verifyPhoneCode,
      clearError,
    },
  ];
}; 