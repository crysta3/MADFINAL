export type NutrientTotals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type NutrientTargets = NutrientTotals;

export type NutrientStatus = {
  label: string;
  tone: 'success' | 'warning' | 'danger' | 'info';
};

export type DailySummary = {
  totals: NutrientTotals;
  targets: NutrientTargets;
  progress: NutrientTotals;
  status: Record<keyof NutrientTotals, NutrientStatus>;
  completionScore: number;
  mealCount: number;
};
