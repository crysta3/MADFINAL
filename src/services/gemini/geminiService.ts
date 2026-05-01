import { Meal } from '../../types/meal';
import { DailySummary } from '../../types/summary';
import { UserProfile } from '../../types/user';

const GEMINI_API_KEY = 'AIzaSyA4kkfA0VjpYvD5DIAoLt42bJAIY4h7IEo'; // Replace with your actual API key
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export type GeminiMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

const goalLabels: Record<string, string> = {
  maintain_weight: 'maintain weight',
  lose_weight: 'lose weight',
  gain_weight: 'gain weight',
  eat_healthier: 'eat healthier',
};

function buildSystemPrompt(
  profile: UserProfile | null,
  summary: DailySummary,
  mealsToday: Meal[],
): string {
  const profileSection = profile
    ? `User Profile:
- Name: ${profile.name}
- Age: ${profile.age} years old
- Gender: ${profile.gender}
- Height: ${profile.heightCm} cm
- Weight: ${profile.weightKg} kg
- Health Goal: ${goalLabels[profile.goal] ?? profile.goal}`
    : 'User Profile: Not yet set up.';

  const mealsSection =
    mealsToday.length > 0
      ? `Meals Logged Today:\n${mealsToday
          .map(
            (m) =>
              `- ${m.name} (${m.category}): ${m.calories} kcal, ${m.protein}g protein, ${m.carbs}g carbs, ${m.fat}g fat`,
          )
          .join('\n')}`
      : 'Meals Logged Today: None yet.';

  const summarySection = `Today's Nutrition Progress:
- Calories: ${summary.totals.calories} / ${summary.targets.calories} kcal (${summary.progress.calories}%)
- Protein: ${summary.totals.protein}g / ${summary.targets.protein}g (${summary.progress.protein}%)
- Carbs: ${summary.totals.carbs}g / ${summary.targets.carbs}g (${summary.progress.carbs}%)
- Fat: ${summary.totals.fat}g / ${summary.targets.fat}g (${summary.progress.fat}%)
- Overall Completion Score: ${summary.completionScore}%`;

  return `You are NutriBot, a friendly and knowledgeable AI food recommendation assistant built into a nutrition tracking app. Your job is to help users make smart, personalized food choices based on their health profile and daily nutritional progress.

${profileSection}

${summarySection}

${mealsSection}

Guidelines:
- Always analyze the user's remaining nutritional needs before recommending food.
- Suggest specific, realistic, and delicious food options with approximate macro values when relevant.
- Keep responses concise, warm, and encouraging — no longer than 3-4 sentences unless listing foods.
- If the user asks something unrelated to food or nutrition, gently redirect them back to their health goals.
- Respond in the same language the user writes in.`;
}

export async function sendMessageToGemini(
  userMessage: string,
  history: GeminiMessage[],
  profile: UserProfile | null,
  summary: DailySummary,
  mealsToday: Meal[],
): Promise<string> {
  const systemInstruction = buildSystemPrompt(profile, summary, mealsToday);

  const contents: GeminiMessage[] = [
    ...history,
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Empty response from Gemini API.');
  }

  return text;
}
