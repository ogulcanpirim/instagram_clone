import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const IGSkeleton = () => {
  const opacity = useSharedValue(1);
  const theme = useTheme();

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );

    return () => {
      cancelAnimation(opacity);
    };
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.card,
    },
  ];

  return (
    <Animated.View style={[containerStyle, animatedStyle]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
