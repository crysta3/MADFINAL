import { useMemo } from 'react';
import { useAuthStore } from '../store/authStore';

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function useMeals(date = new Date()) {
  const meals = useAuthStore((state) => state.meals);
  const session = useAuthStore((state) => state.session);
  const saveMeal = useAuthStore((state) => state.saveMeal);
  const deleteMeal = useAuthStore((state) => state.deleteMeal);
  const dateKey = toDateKey(date);

  const userMeals = useMemo(
    () => meals.filter((meal) => meal.userId === session?.userId),
    [meals, session?.userId],
  );

  const mealsToday = useMemo(
    () => userMeals.filter((meal) => meal.mealTime.slice(0, 10) === dateKey),
    [dateKey, userMeals],
  );

  return {
    meals: userMeals,
    mealsToday,
    saveMeal,
    deleteMeal,
  };
}
