import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { mealCategories } from '../../constants/mealCategories';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { MealCategory } from '../../types/meal';

type MealCategorySelectorProps = {
  value: MealCategory;
  onChange: (value: MealCategory) => void;
};

export default function MealCategorySelector({
  value,
  onChange,
}: MealCategorySelectorProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Kategori Makan</Text>
      <View style={styles.row}>
        {mealCategories.map((item) => {
          const selected = item.value === value;

          return (
            <Pressable
              key={item.value}
              onPress={() => onChange(item.value)}
              style={[styles.option, selected && styles.optionSelected]}>
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  optionTextSelected: {
    color: colors.surface,
  },
});
