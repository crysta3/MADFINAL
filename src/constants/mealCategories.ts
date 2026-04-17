import { MealCategory } from '../types/meal';

export const mealCategories: {
  label: string;
  value: MealCategory;
}[] = [
  { label: 'Sarapan', value: 'breakfast' },
  { label: 'Makan Siang', value: 'lunch' },
  { label: 'Makan Malam', value: 'dinner' },
  { label: 'Snack', value: 'snack' },
];
