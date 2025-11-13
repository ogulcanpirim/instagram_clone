import {
  createNavigationContainerRef,
  NavigationContainer,
  ParamListBase,
} from '@react-navigation/native';
import React from 'react';
import { SystemBars } from 'react-native-edge-to-edge';
import { useAuth } from '../hooks/useAuth';
import { useAppTheme } from '../hooks/useTheme';
import { AuthStack } from './AuthStack';
import { ProtectedStack } from './ProtectedStack';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

const AppNavigationContainer = () => {
  const theme = useAppTheme();
  const { session } = useAuth();

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <SystemBars style="auto" />
      {session ? <ProtectedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
