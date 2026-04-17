import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import ProfileInfoCard from '../../components/profile/ProfileInfoCard';
import CustomButton from '../../components/common/CustomButton';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function ProfileScreen() {
  const { profile, completeOnboarding } = useProfile();
  const { session, logout } = useAuth();

  if (!profile || !session) {
    return null;
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Jaga data tetap relevan agar rekomendasi nutrisi makin akurat.</Text>

      <ProfileInfoCard email={session.email} profile={profile} />

      <View style={styles.actions}>
        <CustomButton
          title="Update Berat +1 kg"
          variant="secondary"
          onPress={() =>
            completeOnboarding({
              ...profile,
              weightKg: String(Number(profile.weightKg) + 1),
            })
          }
        />
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
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
