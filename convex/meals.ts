import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const addMeal = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
    portion: v.string(),
    category: v.union(
      v.literal('breakfast'),
      v.literal('lunch'),
      v.literal('dinner'),
      v.literal('snack'),
    ),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
    mealTime: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    return ctx.db.insert('meals', {
      ...args,
      dateKey: args.mealTime.slice(0, 10),
      createdAt: new Date().toISOString(),
    });
  },
});

export const updateMeal = mutation({
  args: {
    mealId: v.id('meals'),
    name: v.string(),
    portion: v.string(),
    category: v.union(
      v.literal('breakfast'),
      v.literal('lunch'),
      v.literal('dinner'),
      v.literal('snack'),
    ),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
    mealTime: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.patch(args.mealId, {
      name: args.name,
      portion: args.portion,
      category: args.category,
      calories: args.calories,
      protein: args.protein,
      carbs: args.carbs,
      fat: args.fat,
      mealTime: args.mealTime,
      dateKey: args.mealTime.slice(0, 10),
    });
  },
});

export const deleteMeal = mutation({
  args: {
    mealId: v.id('meals'),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.delete(args.mealId);
  },
});

export const getMealsByDate = query({
  args: {
    userId: v.id('users'),
    dateKey: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    return ctx.db
      .query('meals')
      .withIndex('by_user_date', (queryBuilder: any) =>
        queryBuilder.eq('userId', args.userId).eq('dateKey', args.dateKey),
      )
      .collect();
  },
});
