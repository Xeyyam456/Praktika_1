import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadow } from '../theme';

type Props = {
  playerName: string;
  score: number;
  won: boolean;
  questionsAnswered: number;
  totalQuestions: number;
  onRestart: () => void;
};

export default function ResultScreen({
  playerName,
  score,
  won,
  questionsAnswered,
  totalQuestions,
  onRestart,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={[styles.emojiCircle, won ? styles.emojiCircleWon : styles.emojiCircleLost]}>
        <Text style={styles.emoji}>{won ? '🏆' : '💀'}</Text>
      </View>

      <Text style={styles.title}>{won ? 'Qazandın!' : 'Oyun Bitdi'}</Text>
      <Text style={styles.name}>{playerName}</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>YEKUN MÜKAFAT</Text>
        <Text style={styles.summaryValue}>${score.toLocaleString()}</Text>
        <View style={styles.divider} />
        <Text style={styles.summarySub}>
          {questionsAnswered} / {totalQuestions} sual düzgün cavablandırıldı
        </Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onRestart}>
        <Text style={styles.buttonText}>Yenidən Oyna</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emojiCircle: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
  },
  emojiCircleWon: {
    backgroundColor: colors.successBg,
    borderColor: colors.success,
  },
  emojiCircleLost: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.danger,
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 4,
  },
  name: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 28,
  },
  summaryBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: 26,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
    ...shadow,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  summaryValue: {
    color: colors.success,
    fontSize: 38,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  summarySub: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: 16,
    paddingHorizontal: 48,
    ...shadow,
  },
  buttonText: {
    color: colors.accentText,
    fontSize: 17,
    fontWeight: '800',
  },
});
