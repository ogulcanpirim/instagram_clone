import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../hooks/useAppSelector';

export const LoaderProvider = ({ children }: PropsWithChildren) => {
  const { globalLoading } = useAppSelector(state => state.coreData);
  return (
    <>
      {children}
      {globalLoading && (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: 99,
  },
});
