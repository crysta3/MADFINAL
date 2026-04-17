import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/spacing';
import { MealFormValues } from '../../types/meal';
import CustomInput from '../common/CustomInput';
import MealCategorySelector from './MealCategorySelector';

type MealFormProps = {
  values: MealFormValues;
  onChange: <K extends keyof MealFormValues>(key: K, value: MealFormValues[K]) => void;
};

export default function MealForm({ values, onChange }: MealFormProps) {
  return (
    <View style={styles.form}>
      <CustomInput
        label="Nama makanan"
        placeholder="Contoh: Nasi ayam"
        value={values.name}
        onChangeText={(value) => onChange('name', value)}
      />
      <CustomInput
        label="Porsi"
        placeholder="Contoh: 1 piring"
        value={values.portion}
        onChangeText={(value) => onChange('portion', value)}
      />
      <MealCategorySelector value={values.category} onChange={(value) => onChange('category', value)} />
      <CustomInput
        keyboardType="numeric"
        label="Kalori"
        placeholder="350"
        value={values.calories}
        onChangeText={(value) => onChange('calories', value)}
      />
      <CustomInput
        keyboardType="numeric"
        label="Protein (g)"
        placeholder="20"
        value={values.protein}
        onChangeText={(value) => onChange('protein', value)}
      />
      <CustomInput
        keyboardType="numeric"
        label="Karbohidrat (g)"
        placeholder="45"
        value={values.carbs}
        onChangeText={(value) => onChange('carbs', value)}
      />
      <CustomInput
        keyboardType="numeric"
        label="Lemak (g)"
        placeholder="12"
        value={values.fat}
        onChangeText={(value) => onChange('fat', value)}
      />
      <CustomInput
        label="Waktu makan"
        hint="Format fleksibel, misalnya 2026-04-17T08:00:00.000Z"
        placeholder="ISO time atau kosongkan"
        value={values.mealTime}
        onChangeText={(value) => onChange('mealTime', value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
});
