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

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (!validators.email(email) || !validators.required(password)) {
      Alert.alert('Data belum lengkap', 'Masukkan email valid dan password Anda.');
      return;
    }

    const result = login({ email, password });

    if (!result.success) {
      Alert.alert('Login gagal', result.message);
    }
  }

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Selamat datang kembali</Text>
        <Text style={styles.title}>Masuk untuk lanjut pantau nutrisi harianmu.</Text>
      </View>

      <View style={styles.card}>
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
          placeholder="Masukkan password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Login" onPress={handleLogin} />
        <CustomButton
          title="Belum punya akun? Register"
          variant="ghost"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 36,
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 42,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 30,
    gap: spacing.md,
    marginTop: 32,
    padding: spacing.lg,
  },
});
