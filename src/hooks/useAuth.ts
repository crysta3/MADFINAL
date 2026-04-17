import { useMemo } from 'react';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const accounts = useAuthStore((state) => state.accounts);
  const session = useAuthStore((state) => state.session);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const currentAccount = useMemo(
    () => accounts.find((account) => account.id === session?.userId) ?? null,
    [accounts, session?.userId],
  );

  return {
    session,
    hasHydrated,
    isAuthenticated: Boolean(session),
    hasCompletedOnboarding: Boolean(currentAccount?.profile),
    currentAccount,
    register,
    login,
    logout,
  };
}
