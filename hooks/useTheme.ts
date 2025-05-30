import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();

  const colors = {
    primary: '#6B4EFF',
    secondary: '#FF6B6B',
    background: colorScheme === 'dark' ? '#000000' : '#FFFFFF',
    text: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    card: colorScheme === 'dark' ? '#1C1C1E' : '#F2F2F7',
    border: colorScheme === 'dark' ? '#38383A' : '#C6C6C8',
    notification: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
  };

  return {
    colors,
    colorScheme,
  };
}; 