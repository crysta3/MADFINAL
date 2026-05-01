import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuthStore } from '../store/authStore';
import { Meal, MealFormValues } from '../types/meal';

type SaveMealPayload = MealFormValues & { mealId?: string };

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toMeal(m: any): Meal {
  return {
    id: m._id,
    userId: m.userId,
    name: m.name,
    portion: m.portion,
    category: m.category,
    calories: m.calories,
    protein: m.protein,
    carbs: m.carbs,
    fat: m.fat,
    mealTime: m.mealTime,
    createdAt: m.createdAt,
  };
}

export function useMeals(date = new Date()) {
  const session = useAuthStore((state) => state.session);
  const dateKey = toDateKey(date);
  const userId: any = session?.userId;

  const rawMeals = useQuery(api.meals.getMealsByUser, userId ? { userId } : 'skip');
  const rawMealsToday = useQuery(
    api.meals.getMealsByDate,
    userId ? { userId, dateKey } : 'skip',
  );

  const addMealMutation = useMutation(api.meals.addMeal);
  const updateMealMutation = useMutation(api.meals.updateMeal);
  const deleteMealMutation = useMutation(api.meals.deleteMeal);

  const meals: Meal[] = (rawMeals ?? []).map(toMeal);
  const mealsToday: Meal[] = (rawMealsToday ?? []).map(toMeal);

  async function saveMeal(payload: SaveMealPayload) {
    if (!userId) return;
    const mealTime = payload.mealTime || new Date().toISOString();
    const args = {
      userId,
      name: payload.name.trim(),
      portion: payload.portion.trim(),
      category: payload.category,
      calories: Number(payload.calories),
      protein: Number(payload.protein),
      carbs: Number(payload.carbs),
      fat: Number(payload.fat),
      mealTime,
    };
    if (payload.mealId) {
      await updateMealMutation({ mealId: payload.mealId as any, ...args });
    } else {
      await addMealMutation(args);
    }
  }

  async function deleteMeal(mealId: string) {
    await deleteMealMutation({ mealId: mealId as any });
  }

  return { meals, mealsToday, saveMeal, deleteMeal };
}
