import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import ScreenContainer from '../../components/common/ScreenContainer';
import ProfileInfoCard from '../../components/profile/ProfileInfoCard';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function ProfileScreen() {
  const { profile } = useProfile();
  const { session, logout } = useAuth();
  const [weightInput, setWeightInput] = useState('');

  const logWeightMutation = useMutation(api.weights.logWeight);
  const weightLogs = useQuery(
    api.weights.getWeightLogs,
    session ? { userId: session.userId as any } : 'skip',
  );

  useEffect(() => {
    if (profile?.weightKg) setWeightInput(profile.weightKg);
  }, [profile?.weightKg]);

  if (!profile || !session) {
    return null;
  }

  async function handleUpdateWeight() {
    const parsed = Number(weightInput);
    if (!weightInput || isNaN(parsed) || parsed <= 0) {
      Alert.alert('Berat tidak valid', 'Masukkan angka berat badan yang benar.');
      return;
    }
    await logWeightMutation({ userId: session!.userId as any, weightKg: parsed });
    Alert.alert('Berhasil', 'Berat badan berhasil dicatat.');
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Jaga data tetap relevan agar rekomendasi nutrisi makin akurat.</Text>

      <ProfileInfoCard email={session.email} profile={profile} />

      <View style={styles.weightCard}>
        <Text style={styles.weightLabel}>Update Berat Badan</Text>
        <CustomInput
          keyboardType="numeric"
          label="Berat badan (kg)"
          placeholder={profile.weightKg}
          value={weightInput}
          onChangeText={setWeightInput}
        />
        <CustomButton title="Simpan Berat" variant="secondary" onPress={handleUpdateWeight} />

        {weightLogs && weightLogs.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Riwayat Berat</Text>
            {weightLogs.slice(0, 5).map((log: any) => (
              <View key={log._id} style={styles.historyRow}>
                <Text style={styles.historyWeight}>{log.weightKg} kg</Text>
                <Text style={styles.historyDate}>
                  {new Date(log.loggedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <CustomButton title="Logout" variant="danger" onPress={logout} />
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
  weightCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  weightLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  historySection: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  historyTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  historyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyWeight: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  historyDate: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
