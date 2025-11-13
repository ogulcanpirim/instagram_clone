import { useTheme } from '@react-navigation/native';
import { memo, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { IGText } from './IGText';

interface IGInputProps extends TextInputProps {
  invalid?: boolean;
  errorMessage?: string;
}

export const IGInput = memo((props: IGInputProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  const handleEyePress = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <View accessible={false} style={styles.container}>
      <TextInput
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={props.secureTextEntry && !showPassword}
        {...(props.placeholder && { placeholder: props.placeholder })}
        placeholderTextColor={colors.textGray}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            color: theme.colors.text,
          },
          focused && styles.inputFocused,
          props.invalid && {
            borderColor: colors.error,
            backgroundColor: `${colors.error}33`,
          },
        ]}
      />
      {props.secureTextEntry && props.value && props.value?.length > 0 && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleEyePress}
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={colors.textGray}
            />
          </TouchableOpacity>
        </View>
      )}
      {props.errorMessage && (
        <IGText style={styles.errorText} color={colors.error}>
          {props.errorMessage}
        </IGText>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 4,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
