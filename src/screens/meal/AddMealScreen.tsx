import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/common/ScreenContainer';
import MealForm from '../../components/meal/MealForm';
import CustomButton from '../../components/common/CustomButton';
import { MainTabParamList } from '../../navigation/types';
import { MealFormValues } from '../../types/meal';
import { useMeals } from '../../hooks/useMeals';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { validators } from '../../utils/validators';

type Props = BottomTabScreenProps<MainTabParamList, 'AddMeal'>;

const initialValues: MealFormValues = {
  name: '',
  portion: '',
  category: 'breakfast',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
  mealTime: '',
};

export default function AddMealScreen({ route, navigation }: Props) {
  const { meals, saveMeal } = useMeals();
  const mealToEdit = meals.find((meal) => meal.id === route.params?.mealId) ?? null;
  const [values, setValues] = useState<MealFormValues>(initialValues);

  useEffect(() => {
    if (!mealToEdit) {
      setValues(initialValues);
      return;
    }

    setValues({
      name: mealToEdit.name,
      portion: mealToEdit.portion,
      category: mealToEdit.category,
      calories: String(mealToEdit.calories),
      protein: String(mealToEdit.protein),
      carbs: String(mealToEdit.carbs),
      fat: String(mealToEdit.fat),
      mealTime: mealToEdit.mealTime,
    });
  }, [mealToEdit]);

  function updateValue<K extends keyof MealFormValues>(key: K, value: MealFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit() {
    const requiredFields = [
      values.name,
      values.portion,
      values.calories,
      values.protein,
      values.carbs,
      values.fat,
    ];

    if (requiredFields.some((item) => !validators.required(item))) {
      Alert.alert('Data belum lengkap', 'Lengkapi semua field meal terlebih dahulu.');
      return;
    }

    saveMeal({ ...values, mealId: mealToEdit?.id });
    setValues(initialValues);
    navigation.setParams({ mealId: undefined });
    Alert.alert('Berhasil', mealToEdit ? 'Meal berhasil diperbarui.' : 'Meal berhasil disimpan.');
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>{mealToEdit ? 'Edit Meal' : 'Tambah Meal'}</Text>
        <Text style={styles.subtitle}>
          Isi data makanan setelah makan agar dashboard langsung ikut ter-update.
        </Text>
      </View>

      <View style={styles.card}>
        <MealForm values={values} onChange={updateValue} />
      </View>

      <CustomButton
        title={mealToEdit ? 'Update Meal' : 'Simpan Meal'}
        onPress={handleSubmit}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
});
