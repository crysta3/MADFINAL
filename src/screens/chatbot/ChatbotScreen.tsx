import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { ChatMessage, useChatbot } from '../../hooks/useChatbot';

// ─── Sub-components ───────────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <View style={styles.avatar}>
      <Ionicons color={colors.primary} name="nutrition" size={16} />
    </View>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.bubbleRow, isUser ? styles.bubbleRowUser : styles.bubbleRowAI]}>
      {!isUser && <BotAvatar />}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextAI]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

function TypingIndicator() {
  return (
    <View style={[styles.bubbleRow, styles.bubbleRowAI]}>
      <BotAvatar />
      <View style={[styles.bubble, styles.bubbleAI, styles.typingBubble]}>
        <ActivityIndicator color={colors.textMuted} size="small" />
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ChatbotScreen() {
  const { messages, isLoading, sendMessage, clearChat } = useChatbot();
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList>(null);

  const handleSend = useCallback(() => {
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText);
    setInputText('');
  }, [inputText, isLoading, sendMessage]);

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, []);

  const canSend = inputText.trim().length > 0 && !isLoading;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconWrap}>
            <Ionicons color={colors.primary} name="nutrition" size={20} />
          </View>
          <View>
            <Text style={styles.headerTitle}>NutriBot</Text>
            <Text style={styles.headerSubtitle}>AI Food Advisor</Text>
          </View>
        </View>
        <Pressable
          hitSlop={8}
          onPress={clearChat}
          style={({ pressed }) => [styles.clearBtn, pressed && styles.clearBtnPressed]}>
          <Ionicons color={colors.textMuted} name="refresh-outline" size={20} />
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* ── Messages + Input ── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
        style={styles.flex}>
        <FlatList
          ref={listRef}
          contentContainerStyle={styles.messageList}
          data={messages}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={isLoading ? <TypingIndicator /> : null}
          onContentSizeChange={scrollToBottom}
          renderItem={({ item }) => <MessageBubble message={item} />}
          showsVerticalScrollIndicator={false}
        />

        {/* ── Input Bar ── */}
        <View style={styles.inputBar}>
          <TextInput
            editable={!isLoading}
            multiline
            onChangeText={setInputText}
            placeholder="Ask me what to eat..."
            placeholderTextColor={colors.textMuted}
            style={styles.textInput}
            value={inputText}
          />
          <Pressable
            disabled={!canSend}
            onPress={handleSend}
            style={({ pressed }) => [
              styles.sendBtn,
              !canSend && styles.sendBtnDisabled,
              pressed && canSend && styles.sendBtnPressed,
            ]}>
            <Ionicons
              color={canSend ? colors.surface : colors.textMuted}
              name="send"
              size={18}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  flex: {
    flex: 1,
  },

  // Header
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerIconWrap: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.subheading,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  clearBtn: {
    alignItems: 'center',
    backgroundColor: colors.overlay,
    borderRadius: 20,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  clearBtnPressed: {
    opacity: 0.6,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
  },

  // Messages
  messageList: {
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  bubbleRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.xs,
    maxWidth: '85%',
  },
  bubbleRowUser: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  bubbleRowAI: {
    alignSelf: 'flex-start',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleAI: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
    borderColor: colors.border,
    borderWidth: 1,
  },
  bubbleText: {
    fontSize: typography.body,
    lineHeight: 22,
  },
  bubbleTextUser: {
    color: colors.surface,
  },
  bubbleTextAI: {
    color: colors.textPrimary,
  },
  typingBubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  // Input bar
  inputBar: {
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  textInput: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    color: colors.textPrimary,
    flex: 1,
    fontSize: typography.body,
    maxHeight: 100,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  sendBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  sendBtnDisabled: {
    backgroundColor: colors.overlay,
  },
  sendBtnPressed: {
    transform: [{ scale: 0.95 }],
  },
});
