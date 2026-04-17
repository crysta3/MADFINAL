export type UserGoal =
  | 'maintain_weight'
  | 'lose_weight'
  | 'gain_weight'
  | 'eat_healthier';

export type Gender = 'male' | 'female' | 'other';

export type UserProfile = {
  name: string;
  age: string;
  gender: Gender;
  heightCm: string;
  weightKg: string;
  goal: UserGoal;
  updatedAt: string;
};

export type UserAccount = {
  id: string;
  email: string;
  password: string;
  registeredAt: string;
  profile: UserProfile | null;
};

export type AuthSession = {
  userId: string;
  email: string;
  name: string;
};
