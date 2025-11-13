import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../constants/theme';

export const useAppTheme = () => {
  return useColorScheme() === 'dark' ? DarkTheme : LightTheme;
};
