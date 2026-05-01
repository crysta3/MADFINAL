import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthSession } from '../types/user';

type AuthState = {
  session: AuthSession | null;
  hasHydrated: boolean;
  setSession: (session: AuthSession | null) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

const STORAGE_KEY = 'final-app-storage-v2';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      hasHydrated: false,
      setSession: (session) => set({ session }),
      logout: () => set({ session: null }),
      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ session: state.session }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
