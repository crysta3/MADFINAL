import React, { useEffect, useMemo, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { hasHydrated, isAuthenticated, hasCompletedOnboarding } = useAuth();
  const [minimumSplashDone, setMinimumSplashDone] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMinimumSplashDone(true);
    }, 1200);

    const persistApi = (useAuthStore as typeof useAuthStore & {
      persist?: {
        rehydrate?: () => Promise<void>;
      };
    }).persist;

    Promise.resolve(persistApi?.rehydrate?.())
      .catch(() => undefined)
      .finally(() => {
        useAuthStore.getState().setHydrated(true);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const initialRouteName = useMemo<keyof RootStackParamList>(() => {
    if (!isAuthenticated) {
      return 'Auth';
    }

    if (!hasCompletedOnboarding) {
      return 'Onboarding';
    }

    return 'Main';
  }, [hasCompletedOnboarding, isAuthenticated]);

  if (!hasHydrated || !minimumSplashDone) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? <Stack.Screen component={AuthNavigator} name="Auth" /> : null}
      {isAuthenticated && !hasCompletedOnboarding ? (
        <Stack.Screen component={OnboardingScreen} name="Onboarding" />
      ) : null}
      {isAuthenticated && hasCompletedOnboarding ? (
        <Stack.Screen component={MainTabNavigator} name="Main" />
      ) : null}
    </Stack.Navigator>
  );
}
