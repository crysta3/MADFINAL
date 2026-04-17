import { DailySummary } from '../../types/summary';
import { UserProfile } from '../../types/user';

export function recommendationEngine(summary: DailySummary, profile: UserProfile | null) {
  const tips: string[] = [];

  if (summary.totals.calories < summary.targets.calories * 0.75) {
    tips.push('Kalori hari ini masih rendah. Tambahkan makanan utama atau snack bernutrisi.');
  }

  if (summary.totals.protein < summary.targets.protein * 0.85) {
    tips.push('Protein belum cukup. Coba tambah telur, tempe, ayam, atau yogurt.');
  }

  if (summary.totals.fat > summary.targets.fat * 1.1) {
    tips.push('Lemak cukup tinggi. Pilih metode masak rebus, kukus, atau panggang.');
  }

  if (summary.mealCount < 3) {
    tips.push('Catatan makan masih sedikit. Isi meal setelah makan supaya progress lebih akurat.');
  }

  if (profile?.goal === 'lose_weight') {
    tips.push('Fokus pada porsi seimbang dan protein cukup agar kenyang lebih lama.');
  }

  if (profile?.goal === 'gain_weight') {
    tips.push('Target naik berat badan akan lebih mudah dengan snack tinggi protein di sela waktu makan.');
  }

  return tips.slice(0, 3);
}
