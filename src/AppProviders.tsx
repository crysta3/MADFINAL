import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ConvexProvider } from 'convex/react';
import { convexClient } from './services/convex/client';
import { colors } from './constants/colors';

type AppProvidersProps = {
  children: ReactNode;
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.primary,
  },
};

export default function AppProviders({ children }: AppProvidersProps) {
  const content = (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>{children}</NavigationContainer>
    </SafeAreaProvider>
  );

  if (!convexClient) {
    return content;
  }

  return <ConvexProvider client={convexClient}>{content}</ConvexProvider>;
}
