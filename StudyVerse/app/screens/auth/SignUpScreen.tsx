import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
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

// Define form values interface
interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [, { signup, googleLogin, clearError }] = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
    try {
      setErrorMessage('');
      clearError();
      await signup(values.email, values.password, values.name);
      console.log('User created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error creating user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setErrorMessage('');
      clearError();
      await googleLogin();
      console.log('User signed up with Google successfully!');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error signing up with Google:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>StudyVerse</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.formContainer}>
              <CustomInput
                label="Full Name"
                leftIcon={<MaterialIcons name="person" size={20} color="#757575" />}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                error={touched.name && errors.name ? errors.name : ''}
                placeholder="Enter your full name"
              />

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
                placeholder="Create a password"
              />

              <CustomInput
                label="Confirm Password"
                leftIcon={<MaterialIcons name="lock" size={20} color="#757575" />}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                secureTextEntry
                placeholder="Confirm your password"
              />

              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

              <CustomButton
                title="Sign Up"
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
                style={styles.button}
              />

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <CustomButton
                title="Sign up with Google"
                onPress={handleGoogleSignUp}
                type="outline"
                icon={<FontAwesome name="google" size={20} color="#6200ee" style={styles.googleIcon} />}
                style={styles.googleButton}
              />

              <CustomButton
                title="Sign up with Phone Number"
                onPress={() => navigation.navigate('PhoneLogin')}
                type="outline"
                icon={<MaterialIcons name="phone" size={20} color="#6200ee" style={styles.googleIcon} />}
                style={styles.phoneButton}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
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
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginTop: 8,
  },
  formContainer: {
    padding: 20,
  },
  button: {
    marginTop: 10,
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
});

export default SignUpScreen; 