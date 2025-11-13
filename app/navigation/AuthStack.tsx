import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/login';
import { SCREENS } from './screens';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      {/* Other unprotected auth screens should be listed here */}
    </Stack.Navigator>
  );
};
