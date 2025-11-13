import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import FacebookSvg from '../assets/svgs/FacebookSvg';
import { LogoSvg } from '../assets/svgs/LogoSvg';
import { colors } from '../constants/colors';
import { IGButton } from '../core/components/IGButton';
import { IGInput } from '../core/components/IGInput';
import { IGText } from '../core/components/IGText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { ILoginForm } from '../models/auth';
import { loginValidationSchema } from '../utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { TEST_IDS } from '../constants/testids';
import { useAuth } from '../hooks/useAuth';

export const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [invalid, setInvalid] = useState(false);

  const nop = () => {
    // Forgot password, login with Facebook and sign up are not implemented
  };

  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: 'test@example.com',
      password: 'test123',
    },
  });

  const onSubmit = (data: ILoginForm) => {
    Keyboard.dismiss();
    setInvalid(false);
    login(data).then(success => {
      if (!success) {
        setInvalid(true);
      }
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={0}
          style={styles.content}
        >
          <View accessible={false} style={styles.container}>
            <LogoSvg width={200} height={120} />
            <View accessible={false} style={styles.form}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IGInput
                    testID={TEST_IDS.LOGIN_EMAIL_INPUT}
                    placeholder="E-mail address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    invalid={!!errors.email?.message || invalid}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IGInput
                    testID={TEST_IDS.LOGIN_PASSWORD_INPUT}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    invalid={!!errors.password?.message || invalid}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <IGText
                style={styles.forgotPassword}
                color={theme.colors.primary}
                onPress={nop}
              >
                Forgot password?
              </IGText>
              <IGButton
                testID={TEST_IDS.LOGIN_BUTTON}
                title="Log In"
                backgroundColor={theme.colors.primary}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <View style={styles.seperatorContainer}>
              <View style={styles.seperatorLine} />
              <IGText style={styles.seperatorText}>OR</IGText>
              <View style={styles.seperatorLine} />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={nop}
              style={styles.loginFacebookContainer}
            >
              <FacebookSvg fill={theme.colors.primary} />
              <IGText color={theme.colors.primary} style={styles.loginFacebook}>
                Log in with Facebook
              </IGText>
            </TouchableOpacity>
            {invalid && (
              <IGText style={styles.invalidText} color={colors.error}>
                {invalid ? 'Invalid email or password' : ''}
              </IGText>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View
        style={[styles.bottomContainer, { paddingBottom: insets.bottom + 12 }]}
      >
        <IGText>
          Don't have an account?{' '}
          <IGText style={styles.signUpText} onPress={nop}>
            Sign Up
          </IGText>
        </IGText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
    gap: 12,
  },
  forgotPassword: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    paddingBottom: 12,
  },
  seperatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    width: '100%',
  },
  seperatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.textGray,
  },
  seperatorText: {
    fontWeight: 'bold',
    color: colors.textGray,
  },
  loginFacebookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    gap: 4,
  },
  loginFacebook: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    borderTopWidth: 1,
    alignItems: 'center',
    borderTopColor: colors.textGray,
    paddingTop: 24,
  },
  signUpText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  invalidContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  invalidText: {
    marginTop: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
