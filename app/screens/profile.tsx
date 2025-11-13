import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { IGButton } from '../core/components/IGButton';
import { IGText } from '../core/components/IGText';
import { useAuth } from '../hooks/useAuth';

export const ProfileScreen = () => {
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <IGText style={styles.header}>Profile</IGText>
      <View style={styles.content}>
        <IGButton
          title="Logout"
          onPress={logout}
          backgroundColor={colors.error}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 16,
  },
  logoutText: {
    fontWeight: '500',
  },
});
