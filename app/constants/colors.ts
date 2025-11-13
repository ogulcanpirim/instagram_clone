export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#405DE6',
  secondary: '#00BFA5',
  purple: '#9B59B6',
  gray: '#BDC3C7',
  error: '#B71C1C',
  success: '#2ECC71',
  warning: '#F1C40F',
  darkBackground: '#000000',
  darkCard: '#1E1E1E',
  lightCard: '#FAFAFA',
  textGray: '#666666',
  successLight: '#E8F5E9',
  successDark: '#1B5E20',
  errorLight: '#FFEBEE',
  warningLight: '#FFF3E0',
  secondaryText: '#9CA3AF',
  lightText: '#000000',
  darkText: '#FFFFFF',
  lightBackground: '#FFFFFF',
  lightBorder: '#F0F0F0',
  darkBorder: '#3A3A3A',
  pro: '#B8860B',
  darkPro: '#8B4513',
};

export const lightColors = {
  background: colors.lightBackground,
  text: colors.lightText,
  card: colors.lightCard,
  border: colors.lightBorder,
  ...colors,
};

export const darkColors = {
  background: colors.darkBackground,
  text: colors.darkText,
  card: colors.darkCard,
  border: colors.darkBorder,
  ...colors,
};
