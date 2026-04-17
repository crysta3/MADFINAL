import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const registerUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_email', (queryBuilder: any) => queryBuilder.eq('email', args.email))
      .unique();

    if (existing) {
      throw new Error('Email already exists');
    }

    return ctx.db.insert('users', {
      email: args.email,
      password: args.password,
      profile: null,
      registeredAt: new Date().toISOString(),
    });
  },
});

export const loginUser = query({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    return ctx.db
      .query('users')
      .withIndex('by_email', (queryBuilder: any) => queryBuilder.eq('email', args.email))
      .filter((queryBuilder: any) =>
        queryBuilder.eq(queryBuilder.field('password'), args.password),
      )
      .unique();
  },
});

export const updateProfile = mutation({
  args: {
    userId: v.id('users'),
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
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.patch(args.userId, {
      profile: {
        name: args.name,
        age: args.age,
        gender: args.gender,
        heightCm: args.heightCm,
        weightKg: args.weightKg,
        goal: args.goal,
        updatedAt: new Date().toISOString(),
      },
    });
  },
});
