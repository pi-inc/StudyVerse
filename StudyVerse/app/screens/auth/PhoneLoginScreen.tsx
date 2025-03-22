import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import PhoneAuthRecaptcha from '../../components/PhoneAuthRecaptcha';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

// Define form values interfaces
interface PhoneNumberFormValues {
  phoneNumber: string;
}

interface VerificationFormValues {
  verificationCode: string;
}

// Validation schemas
const PhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+[1-9]\d{1,14}$/, 'Phone number must be in international format (e.g., +12345678900)')
    .required('Phone number is required'),
});

const VerificationCodeSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .matches(/^\d{6}$/, 'Verification code must be 6 digits')
    .required('Verification code is required'),
});

const PhoneLoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [state, { sendPhoneCode, verifyPhoneCode, clearError }] = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };

  const handleSendCode = async (values: PhoneNumberFormValues, { setSubmitting }: FormikHelpers<PhoneNumberFormValues>) => {
    try {
      setErrorMessage('');
      clearError();
      await sendPhoneCode(values.phoneNumber);
      setCodeSent(true);
      console.log('Verification code sent successfully!');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error sending verification code:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyCode = async (values: VerificationFormValues, { setSubmitting }: FormikHelpers<VerificationFormValues>) => {
    try {
      setErrorMessage('');
      clearError();
      await verifyPhoneCode(values.verificationCode);
      console.log('Phone number verified successfully!');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error verifying code:', error);
    } finally {
      setSubmitting(false);
    }
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
            <Text style={styles.subtitle}>
              {codeSent ? 'Enter verification code' : 'Sign in with phone number'}
            </Text>
          </View>

          {/* Add the recaptcha component */}
          <PhoneAuthRecaptcha handleRecaptchaVerify={handleRecaptchaVerify} />

          {!codeSent ? (
            // Phone Number Form
            <Formik
              initialValues={{ phoneNumber: '' }}
              validationSchema={PhoneNumberSchema}
              onSubmit={handleSendCode}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.formContainer}>
                  <CustomInput
                    label="Phone Number"
                    leftIcon={<MaterialIcons name="phone" size={20} color="#757575" />}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number (e.g., +1234567890)"
                  />

                  {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                  <CustomButton
                    title="Send Verification Code"
                    onPress={handleSubmit}
                    loading={isSubmitting || state.loading}
                    disabled={isSubmitting || state.loading}
                    style={styles.button}
                  />

                  {/* Add development mode information */}
                  <View style={styles.developmentNote}>
                    <Text style={styles.noteText}>
                      Development Mode: Any valid phone number format will work.
                    </Text>
                  </View>

                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Want to use email instead? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.loginLink}>Login with Email</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          ) : (
            // Verification Code Form
            <Formik
              initialValues={{ verificationCode: '' }}
              validationSchema={VerificationCodeSchema}
              onSubmit={handleVerifyCode}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.formContainer}>
                  <CustomInput
                    label="Verification Code"
                    leftIcon={<MaterialIcons name="lock" size={20} color="#757575" />}
                    onChangeText={handleChange('verificationCode')}
                    onBlur={handleBlur('verificationCode')}
                    value={values.verificationCode}
                    error={touched.verificationCode && errors.verificationCode ? errors.verificationCode : ''}
                    keyboardType="number-pad"
                    placeholder="Enter the 6-digit code"
                  />

                  {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                  <CustomButton
                    title="Verify Code"
                    onPress={handleSubmit}
                    loading={isSubmitting || state.loading}
                    disabled={isSubmitting || state.loading}
                    style={styles.button}
                  />

                  {/* Add instructions for development mode */}
                  <View style={styles.developmentNote}>
                    <Text style={styles.noteText}>
                      Development Mode: Use code "123456" for testing.
                    </Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.resendCode}
                    onPress={() => setCodeSent(false)}
                  >
                    <Text style={styles.resendCodeText}>Change phone number or resend code</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          )}
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
  button: {
    marginTop: 20,
  },
  errorText: {
    color: '#b00020',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#757575',
  },
  loginLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  resendCode: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendCodeText: {
    color: '#6200ee',
    fontWeight: '500',
  },
  developmentNote: {
    marginTop: 20,
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

export default PhoneLoginScreen; 