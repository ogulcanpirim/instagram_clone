import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

interface IGTextProps extends TextProps {
  color?: ColorValue;
  loading?: boolean;
}

export const IGText = (props: IGTextProps) => {
  const theme = useTheme();

  const givenStyle = StyleSheet.flatten(props.style);

  const textStyle: TextStyle = {
    ...givenStyle,
    color: props.color ?? givenStyle?.color ?? theme.colors.text,
    fontFamily: givenStyle?.fontFamily,
  };

  return <Text {...props} style={textStyle} allowFontScaling={false} />;
};
