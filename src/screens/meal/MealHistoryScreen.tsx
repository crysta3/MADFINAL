import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/common/ScreenContainer';
import MealItem from '../../components/meal/MealItem';
import { MainTabParamList } from '../../navigation/types';
import { useMeals } from '../../hooks/useMeals';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

type Props = BottomTabScreenProps<MainTabParamList, 'MealHistory'>;

export default function MealHistoryScreen({ navigation }: Props) {
  const { meals, deleteMeal } = useMeals();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Meal History</Text>
      <Text style={styles.subtitle}>
        Lihat semua makanan yang sudah dicatat, lalu edit atau hapus bila ada data yang salah.
      </Text>

      <View style={styles.list}>
        {meals.length ? (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              onDelete={deleteMeal}
              onEdit={(mealId) => navigation.navigate('AddMeal', { mealId })}
            />
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Belum ada riwayat meal</Text>
            <Text style={styles.emptySubtitle}>
              Setelah Anda menyimpan meal, daftar makanan akan muncul di sini.
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  list: {
    gap: spacing.md,
  },
  empty: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.xl,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
