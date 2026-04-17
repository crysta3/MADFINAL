import { useMemo } from 'react';
import { useMeals } from './useMeals';
import { useProfile } from './useProfile';
import { buildDailySummary } from '../services/helpers/nutritionCalculator';
import { recommendationEngine } from '../services/helpers/recommendationEngine';

export function useSummary() {
  const { mealsToday } = useMeals();
  const { profile } = useProfile();

  const summary = useMemo(() => buildDailySummary(mealsToday, profile), [mealsToday, profile]);
  const recommendations = useMemo(
    () => recommendationEngine(summary, profile),
    [profile, summary],
  );

  return {
    summary,
    recommendations,
  };
}
