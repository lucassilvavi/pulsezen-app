import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function OnboardingLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="features" />
      <Stack.Screen name="benefits" />
      <Stack.Screen name="setup" />
    </Stack>
  );
} 