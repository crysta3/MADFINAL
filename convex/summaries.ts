import { query } from './_generated/server';
import { v } from 'convex/values';

export const getDailySummary = query({
  args: {
    userId: v.id('users'),
    dateKey: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const meals = await ctx.db
      .query('meals')
      .withIndex('by_user_date', (queryBuilder: any) =>
        queryBuilder.eq('userId', args.userId).eq('dateKey', args.dateKey),
      )
      .collect();

    return meals.reduce(
      (totals: any, meal: any) => ({
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  },
});
