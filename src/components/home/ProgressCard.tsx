import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

type ProgressCardProps = {
  score: number;
  mealCount: number;
};

export default function ProgressCard({ score, mealCount }: ProgressCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>Progress Hari Ini</Text>
        <Text style={styles.title}>{score}% target tercapai</Text>
        <Text style={styles.caption}>
          Anda sudah mencatat {mealCount} kali makan hari ini.
        </Text>
      </View>
      <View style={styles.circle}>
        <Text style={styles.circleValue}>{score}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  label: {
    color: '#CDEDE3',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  caption: {
    color: '#EAF9F3',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 220,
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#2D8A74',
    borderRadius: 999,
    height: 92,
    justifyContent: 'center',
    width: 92,
  },
  circleValue: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '800',
  },
});
