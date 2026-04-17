export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type MealFormValues = {
  name: string;
  portion: string;
  category: MealCategory;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  mealTime: string;
};

export type Meal = {
  id: string;
  userId: string;
  name: string;
  portion: string;
  category: MealCategory;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealTime: string;
  createdAt: string;
};
