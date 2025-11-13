import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { LoaderProvider } from './app/providers/LoaderProvider';
import store from './app/store';
import AppNavigationContainer from './app/navigation/AppNavigation';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { makeServer } from './app/core/server';

makeServer();
const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <LoaderProvider>
          <SafeAreaProvider>
            <KeyboardProvider>
              <QueryClientProvider client={queryClient}>
                <AppNavigationContainer />
              </QueryClientProvider>
            </KeyboardProvider>
          </SafeAreaProvider>
        </LoaderProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
