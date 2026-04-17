import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.bubbleTop} />
      <View style={styles.logoCard}>
        <Text style={styles.logoMark}>FN</Text>
      </View>
      <Text style={styles.title}>FoodNourish</Text>
      <Text style={styles.subtitle}>Pantau nutrisi harian dengan cepat dan personal.</Text>
      <View style={styles.bubbleBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  bubbleTop: {
    backgroundColor: colors.secondarySoft,
    borderRadius: 999,
    height: 180,
    position: 'absolute',
    right: -40,
    top: -30,
    width: 180,
  },
  bubbleBottom: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    bottom: -50,
    height: 220,
    left: -70,
    position: 'absolute',
    width: 220,
  },
  logoCard: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 36,
    height: 112,
    justifyContent: 'center',
    marginBottom: 24,
    width: 112,
  },
  logoMark: {
    color: colors.surface,
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    maxWidth: 280,
    textAlign: 'center',
  },
});
