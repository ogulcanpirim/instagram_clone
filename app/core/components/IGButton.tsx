import { useTheme } from '@react-navigation/native';
import React, { memo } from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '../../constants/colors';
import { IGText } from './IGText';

interface IGButtonProps extends TouchableOpacityProps {
  title: string | React.ReactNode;
  titleColor?: ColorValue;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  borderWidth?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  titleFont?: string;
  fontSize?: number;
  gradient?: boolean;
}

export const IGButton = memo(
  ({
    title,
    titleColor,
    backgroundColor,
    borderColor,
    borderWidth,
    gradient,
    ...props
  }: IGButtonProps) => {
    const theme = useTheme();
    const buttonContent = (
      <>
        {props.icon}
        {typeof title === 'string' ? (
          <IGText
            style={[
              styles.title,
              { color: titleColor ?? colors.white },
              props.titleFont && { fontFamily: props.titleFont },
              (props.loading || props.disabled) && styles.disabledTitle,
              !!props.fontSize && { fontSize: props.fontSize },
            ]}
          >
            {title}
          </IGText>
        ) : (
          title
        )}
      </>
    );

    const buttonStyle = [
      styles.container,
      !gradient && { backgroundColor: backgroundColor ?? colors.textGray },
      props.loading && { backgroundColor: theme.colors.border },
      props.disabled && styles.disabled,
      { borderColor, borderWidth },
    ];

    return (
      <TouchableOpacity
        {...props}
        disabled={props.disabled || props.loading}
        activeOpacity={0.6}
        style={buttonStyle}
      >
        {buttonContent}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: colors.textGray,
  },
  disabledTitle: {
    color: colors.textGray,
  },
});
