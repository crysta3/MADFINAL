import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuthStore } from '../store/authStore';
import { UserProfile } from '../types/user';

export function useProfile() {
  const session = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const userId: any = session?.userId;

  const currentUser = useQuery(api.users.getUser, userId ? { userId } : 'skip');
  const updateProfileMutation = useMutation(api.users.updateProfile);

  const profile: UserProfile | null = currentUser?.profile ?? null;

  async function completeOnboarding(profileData: Omit<UserProfile, 'updatedAt'>) {
    if (!userId || !session) return;
    const { updatedAt: _, ...fields } = profileData as any;
    await updateProfileMutation({ userId, ...fields });
    setSession({ ...session, name: profileData.name });
  }

  return { profile, completeOnboarding };
}
