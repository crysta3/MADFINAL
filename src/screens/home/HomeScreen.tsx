import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import ProgressCard from '../../components/home/ProgressCard';
import NutritionCard from '../../components/home/NutritionCard';
import RecommendationCard from '../../components/home/RecommendationCard';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { useAuth } from '../../hooks/useAuth';
import { useSummary } from '../../hooks/useSummary';

export default function HomeScreen() {
  const { session } = useAuth();
  const { summary, recommendations } = useSummary();

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.greeting}>Halo, {session?.name ?? 'Pengguna'}</Text>
        <Text style={styles.subtitle}>Pantau asupan hari ini dan jaga target tetap seimbang.</Text>
      </View>

      <ProgressCard score={summary.completionScore} mealCount={summary.mealCount} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ringkasan Nutrisi</Text>
      </View>

      <View style={styles.grid}>
        <NutritionCard
          label="Kalori"
          progress={summary.progress.calories}
          target={summary.targets.calories}
          unit="kkal"
          value={summary.totals.calories}
        />
        <NutritionCard
          label="Protein"
          progress={summary.progress.protein}
          target={summary.targets.protein}
          unit="g"
          value={summary.totals.protein}
        />
        <NutritionCard
          label="Karbohidrat"
          progress={summary.progress.carbs}
          target={summary.targets.carbs}
          unit="g"
          value={summary.totals.carbs}
        />
        <NutritionCard
          label="Lemak"
          progress={summary.progress.fat}
          target={summary.targets.fat}
          unit="g"
          value={summary.totals.fat}
        />
      </View>

      <RecommendationCard items={recommendations} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: spacing.lg,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
});
