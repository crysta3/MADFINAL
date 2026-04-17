import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Meal, MealFormValues } from '../types/meal';
import { AuthSession, UserAccount, UserProfile } from '../types/user';

type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type SaveMealPayload = MealFormValues & {
  mealId?: string;
};

type AuthResult = {
  success: boolean;
  message?: string;
};

type AuthState = {
  accounts: UserAccount[];
  meals: Meal[];
  session: AuthSession | null;
  hasHydrated: boolean;
  register: (payload: RegisterPayload) => AuthResult;
  login: (payload: LoginPayload) => AuthResult;
  completeOnboarding: (profile: Omit<UserProfile, 'updatedAt'>) => void;
  saveMeal: (payload: SaveMealPayload) => void;
  deleteMeal: (mealId: string) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

const STORAGE_KEY = 'final-app-storage';

function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function normalizeMealPayload(payload: SaveMealPayload, userId: string): Meal {
  const createdAt = payload.mealTime || new Date().toISOString();

  return {
    id: payload.mealId ?? generateId('meal'),
    userId,
    name: payload.name.trim(),
    portion: payload.portion.trim(),
    category: payload.category,
    calories: Number(payload.calories),
    protein: Number(payload.protein),
    carbs: Number(payload.carbs),
    fat: Number(payload.fat),
    mealTime: createdAt,
    createdAt,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accounts: [],
      meals: [],
      session: null,
      hasHydrated: false,
      register: ({ email, password, name }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const existing = get().accounts.find((account) => account.email === normalizedEmail);

        if (existing) {
          return { success: false, message: 'Email sudah terdaftar.' };
        }

        const account: UserAccount = {
          id: generateId('user'),
          email: normalizedEmail,
          password,
          registeredAt: new Date().toISOString(),
          profile: null,
        };

        set((state) => ({
          accounts: [...state.accounts, account],
          session: {
            userId: account.id,
            email: account.email,
            name: name.trim(),
          },
        }));

        return { success: true };
      },
      login: ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const account = get().accounts.find(
          (item) => item.email === normalizedEmail && item.password === password,
        );

        if (!account) {
          return { success: false, message: 'Email atau password belum cocok.' };
        }

        set({
          session: {
            userId: account.id,
            email: account.email,
            name: account.profile?.name ?? account.email.split('@')[0],
          },
        });

        return { success: true };
      },
      completeOnboarding: (profile) => {
        const session = get().session;

        if (!session) {
          return;
        }

        const nextProfile: UserProfile = {
          ...profile,
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === session.userId ? { ...account, profile: nextProfile } : account,
          ),
          session: {
            ...session,
            name: nextProfile.name,
          },
        }));
      },
      saveMeal: (payload) => {
        const session = get().session;

        if (!session) {
          return;
        }

        const meal = normalizeMealPayload(payload, session.userId);

        set((state) => {
          const filtered = state.meals.filter((item) => item.id !== meal.id);

          return {
            meals: [meal, ...filtered].sort(
              (a, b) => new Date(b.mealTime).getTime() - new Date(a.mealTime).getTime(),
            ),
          };
        });
      },
      deleteMeal: (mealId) => {
        set((state) => ({
          meals: state.meals.filter((meal) => meal.id !== mealId),
        }));
      },
      logout: () => set({ session: null }),
      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accounts: state.accounts,
        meals: state.meals,
        session: state.session,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
