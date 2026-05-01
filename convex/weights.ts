import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const logWeight = mutation({
  args: {
    userId: v.id('users'),
    weightKg: v.number(),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.insert('weightLogs', {
      userId: args.userId,
      weightKg: args.weightKg,
      loggedAt: new Date().toISOString(),
    });

    const user = await ctx.db.get(args.userId);
    if (user?.profile) {
      await ctx.db.patch(args.userId, {
        profile: {
          ...user.profile,
          weightKg: String(args.weightKg),
          updatedAt: new Date().toISOString(),
        },
      });
    }
  },
});

export const getWeightLogs = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx: any, args: any) => {
    return ctx.db
      .query('weightLogs')
      .withIndex('by_user', (q: any) => q.eq('userId', args.userId))
      .order('desc')
      .collect();
  },
});
