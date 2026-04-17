import { useAuthStore } from '../store/authStore';

export function useProfile() {
  const accounts = useAuthStore((state) => state.accounts);
  const session = useAuthStore((state) => state.session);
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  const profile = accounts.find((account) => account.id === session?.userId)?.profile ?? null;

  return {
    profile,
    completeOnboarding,
  };
}
