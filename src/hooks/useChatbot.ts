import { useCallback, useRef, useState } from 'react';
import { GeminiMessage, sendMessageToGemini } from '../services/gemini/geminiService';
import { useMeals } from './useMeals';
import { useProfile } from './useProfile';
import { useSummary } from './useSummary';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm NutriBot, your personal food advisor. I've loaded your profile and today's nutrition data. What are you craving, or would you like me to suggest what to eat next?",
  timestamp: new Date(),
};

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useProfile();
  const { mealsToday } = useMeals();
  const { summary } = useSummary();

  // Stored outside state to avoid stale-closure issues in sendMessage
  const historyRef = useRef<GeminiMessage[]>([]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const reply = await sendMessageToGemini(
          trimmed,
          historyRef.current,
          profile,
          summary,
          mealsToday,
        );

        historyRef.current = [
          ...historyRef.current,
          { role: 'user', parts: [{ text: trimmed }] },
          { role: 'model', parts: [{ text: reply }] },
        ];

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: reply,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        console.error('[NutriBot] Gemini API error:', err);
        const detail = err instanceof Error ? err.message : String(err);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Something went wrong — ${detail}`,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, mealsToday, profile, summary],
  );

  const clearChat = useCallback(() => {
    historyRef.current = [];
    setMessages([{ ...WELCOME_MESSAGE, timestamp: new Date() }]);
  }, []);

  return { messages, isLoading, sendMessage, clearChat };
}
