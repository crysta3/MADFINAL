import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

type RecommendationCardProps = {
  items: string[];
};

export default function RecommendationCard({ items }: RecommendationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Insight & Rekomendasi</Text>
      {items.length ? (
        items.map((item) => (
          <View key={item} style={styles.itemRow}>
            <View style={styles.dot} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.itemText}>Data sudah seimbang. Pertahankan pola makan hari ini.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondarySoft,
    borderRadius: 28,
    gap: spacing.md,
    padding: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  itemRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    backgroundColor: colors.secondary,
    borderRadius: 999,
    height: 10,
    marginTop: 7,
    width: 10,
  },
  itemText: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
});
