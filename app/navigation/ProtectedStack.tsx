import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { HomeScreen } from '../screens/home';
import { ProfileScreen } from '../screens/profile';
import { SCREENS } from './screens';
import { useTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

const TabStack = createBottomTabNavigator();

export const ProtectedStack = () => {
  const theme = useTheme();
  return (
    <TabStack.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        animation: Platform.OS === 'android' ? 'none' : 'fade',
      }}
    >
      <TabStack.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'home'}
              color={focused ? theme.colors.primary : theme.colors.text}
              size={24}
            />
          ),
        }}
      />
      <TabStack.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'person'}
              color={focused ? theme.colors.primary : theme.colors.text}
              size={24}
            />
          ),
        }}
      />
      {/* Other protected user screens should be listed here */}
    </TabStack.Navigator>
  );
};
