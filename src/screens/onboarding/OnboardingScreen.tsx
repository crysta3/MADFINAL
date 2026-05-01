import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { useProfile } from '../../hooks/useProfile';
import { Gender, UserGoal } from '../../types/user';

const goals: { label: string; value: UserGoal }[] = [
  { label: 'Menjaga berat badan', value: 'maintain_weight' },
  { label: 'Menurunkan berat badan', value: 'lose_weight' },
  { label: 'Menambah berat badan', value: 'gain_weight' },
  { label: 'Makan lebih sehat', value: 'eat_healthier' },
];

const genders: { label: string; value: Gender }[] = [
  { label: 'Laki-laki', value: 'male' },
  { label: 'Perempuan', value: 'female' },
  { label: 'Lainnya', value: 'other' },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useProfile();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [goal, setGoal] = useState<UserGoal>('eat_healthier');

  async function handleSubmit() {
    if (!name || !age || !heightCm || !weightKg) {
      Alert.alert('Data belum lengkap', 'Lengkapi seluruh data dasar terlebih dahulu.');
      return;
    }

    await completeOnboarding({ name, age, gender, heightCm, weightKg, goal });
  }

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Setup Profil</Text>
        <Text style={styles.title}>Isi data dasar supaya pemantauan gizi terasa lebih personal.</Text>
      </View>

      <View style={styles.formCard}>
        <CustomInput label="Nama" placeholder="Nama Anda" value={name} onChangeText={setName} />
        <CustomInput
          keyboardType="numeric"
          label="Umur"
          placeholder="21"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.sectionTitle}>Jenis kelamin</Text>
        <View style={styles.choiceRow}>
          {genders.map((item) => {
            const selected = item.value === gender;
            return (
              <Pressable
                key={item.value}
                onPress={() => setGender(item.value)}
                style={[styles.choice, selected && styles.choiceSelected]}>
                <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <CustomInput
          keyboardType="numeric"
          label="Tinggi badan (cm)"
          placeholder="170"
          value={heightCm}
          onChangeText={setHeightCm}
        />
        <CustomInput
          keyboardType="numeric"
          label="Berat badan (kg)"
          placeholder="65"
          value={weightKg}
          onChangeText={setWeightKg}
        />

        <Text style={styles.sectionTitle}>Tujuan penggunaan</Text>
        <View style={styles.goalList}>
          {goals.map((item) => {
            const selected = item.value === goal;
            return (
              <Pressable
                key={item.value}
                onPress={() => setGoal(item.value)}
                style={[styles.goalCard, selected && styles.goalCardSelected]}>
                <Text style={[styles.goalTitle, selected && styles.goalTitleSelected]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <CustomButton title="Simpan & Masuk Dashboard" onPress={handleSubmit} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 38,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    gap: spacing.md,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  choice: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  choiceSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  choiceText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  choiceTextSelected: {
    color: colors.surface,
  },
  goalList: {
    gap: spacing.sm,
  },
  goalCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: spacing.md,
  },
  goalCardSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  goalTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  goalTitleSelected: {
    color: colors.primary,
  },
});
