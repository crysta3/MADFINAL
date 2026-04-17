import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { formatNumber } from '../../utils/formatNumber';

type NutritionCardProps = {
  label: string;
  value: number;
  unit: string;
  target: number;
  progress: number;
};

export default function NutritionCard({
  label,
  value,
  unit,
  target,
  progress,
}: NutritionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {formatNumber(value)}
        <Text style={styles.unit}> {unit}</Text>
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(100, progress)}%` }]} />
      </View>
      <Text style={styles.meta}>Target {formatNumber(target)} {unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    gap: spacing.sm,
    padding: spacing.md,
    width: '48%',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  value: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  unit: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  track: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: '100%',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
});
