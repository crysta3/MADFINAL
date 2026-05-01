import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuthStore } from '../store/authStore';

type RegisterPayload = { email: string; password: string; name: string };
type LoginPayload = { email: string; password: string };
type AuthResult = { success: boolean; message?: string };

export function useAuth() {
  const session = useAuthStore((state) => state.session);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const setSession = useAuthStore((state) => state.setSession);
  const logout = useAuthStore((state) => state.logout);

  const registerMutation = useMutation(api.users.registerUser);
  const loginMutation = useMutation(api.users.loginUser);

  const currentUser = useQuery(
    api.users.getUser,
    session ? { userId: session.userId as any } : 'skip',
  );

  async function register({ email, password, name }: RegisterPayload): Promise<AuthResult> {
    try {
      const userId = await registerMutation({ email: email.trim().toLowerCase(), password });
      setSession({ userId, email: email.trim().toLowerCase(), name: name.trim() });
      return { success: true };
    } catch (e: any) {
      const message = e.message?.includes('Email already exists')
        ? 'Email sudah terdaftar.'
        : (e.message ?? 'Registrasi gagal.');
      return { success: false, message };
    }
  }

  async function login({ email, password }: LoginPayload): Promise<AuthResult> {
    try {
      const user = await loginMutation({ email: email.trim().toLowerCase(), password });
      if (!user) return { success: false, message: 'Email atau password belum cocok.' };
      setSession({
        userId: user._id,
        email: user.email,
        name: user.profile?.name ?? user.email.split('@')[0],
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message ?? 'Login gagal.' };
    }
  }

  return {
    session,
    hasHydrated,
    isAuthenticated: Boolean(session),
    hasCompletedOnboarding: Boolean(currentUser?.profile),
    currentUser,
    register,
    login,
    logout,
  };
}
