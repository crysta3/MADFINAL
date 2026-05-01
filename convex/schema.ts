import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(),
    profile: v.union(
      v.null(),
      v.object({
        name: v.string(),
        age: v.string(),
        gender: v.union(v.literal('male'), v.literal('female'), v.literal('other')),
        heightCm: v.string(),
        weightKg: v.string(),
        goal: v.union(
          v.literal('maintain_weight'),
          v.literal('lose_weight'),
          v.literal('gain_weight'),
          v.literal('eat_healthier'),
        ),
        updatedAt: v.string(),
      }),
    ),
    registeredAt: v.string(),
  }).index('by_email', ['email']),
  meals: defineTable({
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
    dateKey: v.string(),
    createdAt: v.string(),
  })
    .index('by_user', ['userId'])
    .index('by_user_date', ['userId', 'dateKey']),
  weightLogs: defineTable({
    userId: v.id('users'),
    weightKg: v.number(),
    loggedAt: v.string(),
  }).index('by_user', ['userId']),
});
