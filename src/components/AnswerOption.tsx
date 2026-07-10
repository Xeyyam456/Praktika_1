import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radius, shadow } from '../theme';

type Props = {
  letter: string;
  label: string;
  status: 'idle' | 'correct' | 'incorrect';
  disabled: boolean;
  onPress: () => void;
};

export default function AnswerOption({
  letter,
  label,
  status,
  disabled,
  onPress,
}: Props): React.JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.option,
        status === 'correct' && styles.optionCorrect,
        status === 'incorrect' && styles.optionIncorrect,
      ]}
    >
      <Text
        style={[
          styles.letter,
          status === 'correct' && styles.letterCorrect,
          status === 'incorrect' && styles.letterIncorrect,
        ]}
      >
        {letter}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    ...shadow,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successBg,
  },
  optionIncorrect: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerBg,
  },
  letter: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 15,
    width: 28,
    height: 28,
    lineHeight: 28,
    textAlign: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
    marginRight: 12,
  },
  letterCorrect: {
    color: colors.success,
  },
  letterIncorrect: {
    color: colors.danger,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    flexShrink: 1,
  },
});
