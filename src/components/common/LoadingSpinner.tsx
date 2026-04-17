import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../../constants/colors';

export default function LoadingSpinner() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
}
