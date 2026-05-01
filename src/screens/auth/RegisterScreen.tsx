import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/common/ScreenContainer';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { validators } from '../../utils/validators';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (!validators.required(name) || !validators.email(email) || password.length < 4) {
      Alert.alert('Data belum valid', 'Isi nama, email valid, dan password minimal 4 karakter.');
      return;
    }

    const result = await register({ name, email, password });

    if (!result.success) {
      Alert.alert('Register gagal', result.message);
    }
  }

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Mulai sekarang</Text>
        <Text style={styles.title}>Buat akun agar data makan dan profil tersimpan personal.</Text>
      </View>

      <View style={styles.card}>
        <CustomInput
          label="Nama"
          placeholder="Nama lengkap"
          value={name}
          onChangeText={setName}
        />
        <CustomInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          placeholder="nama@email.com"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          label="Password"
          placeholder="Minimal 4 karakter"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Register" onPress={handleRegister} />
        <CustomButton
          title="Sudah punya akun? Login"
          variant="ghost"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 24,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 30,
    gap: spacing.md,
    marginTop: 28,
    padding: spacing.lg,
  },
});
