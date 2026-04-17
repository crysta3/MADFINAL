import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { Meal } from '../../types/meal';
import { formatDate } from '../../utils/formatDate';

type MealItemProps = {
  meal: Meal;
  onEdit: (mealId: string) => void;
  onDelete: (mealId: string) => void;
};

export default function MealItem({ meal, onEdit, onDelete }: MealItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{meal.name}</Text>
          <Text style={styles.meta}>
            {meal.portion} • {meal.category}
          </Text>
        </View>
        <Text style={styles.time}>
          {formatDate(meal.mealTime, { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <View style={styles.nutritionRow}>
        <Text style={styles.nutrient}>{meal.calories} kkal</Text>
        <Text style={styles.nutrient}>P {meal.protein}g</Text>
        <Text style={styles.nutrient}>K {meal.carbs}g</Text>
        <Text style={styles.nutrient}>L {meal.fat}g</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(meal.id)} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(meal.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Hapus</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    gap: spacing.md,
    padding: spacing.md,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  nutritionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  nutrient: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  editButton: {
    backgroundColor: colors.secondarySoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  editText: {
    color: colors.secondary,
    fontWeight: '800',
  },
  deleteButton: {
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  deleteText: {
    color: colors.accent,
    fontWeight: '800',
  },
});
