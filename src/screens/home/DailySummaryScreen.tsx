import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import { useSummary } from '../../hooks/useSummary';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { formatNumber } from '../../utils/formatNumber';

export default function DailySummaryScreen() {
  const { summary, recommendations } = useSummary();

  const rows = [
    {
      label: 'Kalori',
      total: summary.totals.calories,
      target: summary.targets.calories,
      status: summary.status.calories.label,
    },
    {
      label: 'Protein',
      total: summary.totals.protein,
      target: summary.targets.protein,
      status: summary.status.protein.label,
    },
    {
      label: 'Karbohidrat',
      total: summary.totals.carbs,
      target: summary.targets.carbs,
      status: summary.status.carbs.label,
    },
    {
      label: 'Lemak',
      total: summary.totals.fat,
      target: summary.targets.fat,
      status: summary.status.fat.label,
    },
  ];

  return (
    <ScreenContainer>
      <Text style={styles.title}>Daily Summary</Text>
      <Text style={styles.subtitle}>
        Lihat apakah nutrisi hari ini sudah cukup, seimbang, atau masih perlu diperbaiki.
      </Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Skor harian</Text>
        <Text style={styles.scoreValue}>{summary.completionScore}%</Text>
        <Text style={styles.scoreCaption}>Target tercapai dari {summary.mealCount} meal tercatat.</Text>
      </View>

      <View style={styles.table}>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <View>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>
                {formatNumber(row.total)} / {formatNumber(row.target)}
              </Text>
            </View>
            <Text style={styles.rowStatus}>{row.status}</Text>
          </View>
        ))}
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Insight sederhana</Text>
        {recommendations.map((item) => (
          <Text key={item} style={styles.insightText}>
            • {item}
          </Text>
        ))}
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
  scoreCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: 28,
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  scoreLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  scoreValue: {
    color: colors.textPrimary,
    fontSize: 40,
    fontWeight: '900',
    marginVertical: spacing.sm,
  },
  scoreCaption: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  table: {
    backgroundColor: colors.card,
    borderRadius: 28,
    gap: spacing.md,
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  row: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
  },
  rowLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  rowValue: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  rowStatus: {
    color: colors.primary,
    fontWeight: '800',
  },
  insightCard: {
    backgroundColor: colors.secondarySoft,
    borderRadius: 28,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  insightTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  insightText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
  },
});
