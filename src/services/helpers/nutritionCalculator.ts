import { Meal } from '../../types/meal';
import { DailySummary, NutrientTargets, NutrientTotals } from '../../types/summary';
import { UserGoal, UserProfile } from '../../types/user';

const baseTargetsByGoal: Record<UserGoal, NutrientTargets> = {
  maintain_weight: { calories: 2100, protein: 90, carbs: 260, fat: 70 },
  lose_weight: { calories: 1800, protein: 100, carbs: 190, fat: 60 },
  gain_weight: { calories: 2400, protein: 120, carbs: 300, fat: 75 },
  eat_healthier: { calories: 2000, protein: 95, carbs: 230, fat: 65 },
};

function getNumericValue(value?: string) {
  return Number(value ?? 0);
}

export function getNutritionTargets(profile: UserProfile | null): NutrientTargets {
  if (!profile) {
    return baseTargetsByGoal.maintain_weight;
  }

  const base = baseTargetsByGoal[profile.goal];
  const weight = getNumericValue(profile.weightKg);
  const height = getNumericValue(profile.heightCm);
  const age = getNumericValue(profile.age);

  const calorieAdjustment = Math.max(-150, Math.min(150, weight * 2 + height * 0.2 - age));

  return {
    calories: Math.round(base.calories + calorieAdjustment),
    protein: Math.round(base.protein + weight * 0.1),
    carbs: Math.round(base.carbs + height * 0.05),
    fat: Math.round(base.fat + weight * 0.03),
  };
}

export function calculateNutritionTotals(meals: Meal[]): NutrientTotals {
  return meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fat: totals.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

function getProgress(total: number, target: number) {
  if (!target) {
    return 0;
  }

  return Math.min(100, Math.round((total / target) * 100));
}

function getStatus(total: number, target: number) {
  const ratio = target ? total / target : 0;

  if (ratio < 0.7) {
    return { label: 'Masih kurang', tone: 'warning' as const };
  }

  if (ratio <= 1.1) {
    return { label: 'Sudah pas', tone: 'success' as const };
  }

  return { label: 'Terlalu tinggi', tone: 'danger' as const };
}

export function buildDailySummary(meals: Meal[], profile: UserProfile | null): DailySummary {
  const totals = calculateNutritionTotals(meals);
  const targets = getNutritionTargets(profile);

  const progress = {
    calories: getProgress(totals.calories, targets.calories),
    protein: getProgress(totals.protein, targets.protein),
    carbs: getProgress(totals.carbs, targets.carbs),
    fat: getProgress(totals.fat, targets.fat),
  };

  const completionScore = Math.round(
    (progress.calories + progress.protein + progress.carbs + progress.fat) / 4,
  );

  return {
    totals,
    targets,
    progress,
    status: {
      calories: getStatus(totals.calories, targets.calories),
      protein: getStatus(totals.protein, targets.protein),
      carbs: getStatus(totals.carbs, targets.carbs),
      fat: getStatus(totals.fat, targets.fat),
    },
    completionScore,
    mealCount: meals.length,
  };
}
