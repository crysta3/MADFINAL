import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { UserProfile } from '../../types/user';

type ProfileInfoCardProps = {
  profile: UserProfile;
  email: string;
};

export default function ProfileInfoCard({ profile, email }: ProfileInfoCardProps) {
  const stats = [
    { label: 'Umur', value: `${profile.age} tahun` },
    { label: 'Gender', value: profile.gender },
    { label: 'Tinggi', value: `${profile.heightCm} cm` },
    { label: 'Berat', value: `${profile.weightKg} kg` },
    { label: 'Goal', value: profile.goal },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.grid}>
        {stats.map((item) => (
          <View key={item.label} style={styles.item}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={styles.itemValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    gap: spacing.lg,
    padding: spacing.lg,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  email: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: -8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  item: {
    backgroundColor: colors.primarySoft,
    borderRadius: 20,
    minWidth: '47%',
    padding: spacing.md,
  },
  itemLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  itemValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
});
