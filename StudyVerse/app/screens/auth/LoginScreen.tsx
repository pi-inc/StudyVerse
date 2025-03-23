import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { auth } from '../../services/firebase'; // Import auth directly

// Define form values interface
interface LoginFormValues {
  email: string;
  password: string;
}

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [authState, { login, googleLogin, clearError }] = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    try {
      setErrorMessage('');
      clearError();
      await login(values.email, values.password);
      console.log('User logged in successfully!');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error signing in:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage('');
      clearError();
      await googleLogin();
      console.log('User logged in with Google successfully!');
      
      // For mobile platforms, manually trigger a navigation check
      if (Platform.OS !== 'web') {
        // Force App.tsx to recheck the authentication state
        // This is helpful if the automatic detection isn't working
        const mockUser = (global as any).__FIREBASE_MOCK_USER__;
        if (mockUser) {
          console.log('Manual navigation trigger for mobile Google login');
          // We'll dispatch a custom event to help with debug
          setTimeout(() => {
            console.log('Dispatching navigation check event');
            // This is just for debugging - the actual navigation happens in App.tsx
          }, 500);
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error signing in with Google:', error);
    }
  };

  // Helper to determine if we're on mobile
  const isMobile = Platform.OS !== 'web';

  // Explanation text to show for Google login on mobile
  const renderGoogleSignInInfo = () => {
    if (isMobile) {
      return (
        <View style={styles.developmentNote}>
          <Text style={styles.noteText}>
            Development Mode: Mobile Google sign-in uses mock data.
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>StudyVerse</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
          </View>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <View style={styles.formContainer}>
                <CustomInput
                  label="Email"
                  leftIcon={<MaterialIcons name="email" size={20} color="#757575" />}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={touched.email && errors.email ? errors.email : ''}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter your email"
                />

                <CustomInput
                  label="Password"
                  leftIcon={<MaterialIcons name="lock" size={20} color="#757575" />}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={touched.password && errors.password ? errors.password : ''}
                  secureTextEntry
                  placeholder="Enter your password"
                />

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <CustomButton
                  title="Login"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={styles.button}
                />

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <CustomButton
                  title="Login with Google"
                  onPress={handleGoogleLogin}
                  type="outline"
                  icon={<FontAwesome name="google" size={20} color="#6200ee" style={styles.googleIcon} />}
                  style={styles.googleButton}
                />

                {renderGoogleSignInInfo()}

                <CustomButton
                  title="Login with Phone Number"
                  onPress={() => navigation.navigate('PhoneLogin')}
                  type="outline"
                  icon={<MaterialIcons name="phone" size={20} color="#6200ee" style={styles.googleIcon} />}
                  style={styles.phoneButton}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 18,
    color: '#757575',
    marginTop: 8,
  },
  formContainer: {
    padding: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6200ee',
    fontSize: 14,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: '#b00020',
    textAlign: 'center',
    marginBottom: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#757575',
  },
  signupLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    color: '#757575',
    paddingHorizontal: 10,
  },
  googleButton: {
    borderColor: '#6200ee',
    marginVertical: 10,
  },
  phoneButton: {
    borderColor: '#6200ee',
    marginTop: 10,
    marginBottom: 20,
  },
  googleIcon: {
    marginRight: 8,
  },
  developmentNote: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
  },
  noteText: {
    color: '#2e7d32',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default LoginScreen; 