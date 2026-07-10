import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Question } from '../types/game';
import AnswerOption from '../components/AnswerOption';
import QuestionProgressDrawer from '../components/QuestionProgressDrawer';
import TimerRing from '../components/TimerRing';
import { colors, radius, shadow } from '../theme';

const LETTERS = ['A', 'B', 'C', 'D'];
const TIME_LIMIT = 30;
const TIMEOUT = -1;

const DIFFICULTY_LABELS: Record<Question['difficulty'], string> = {
  easy: 'ASAN',
  medium: 'ORTA',
  hard: 'ÇƏTİN',
};

type Props = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  onAnswered: (correct: boolean) => void;
};

export default function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  score,
  onAnswered,
}: Props): React.JSX.Element {
  const [selected, setSelected] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSelected(null);
    setSecondsLeft(TIME_LIMIT);

    const tick = (remaining: number): void => {
      timerRef.current = setTimeout(() => {
        if (remaining <= 1) {
          setSecondsLeft(0);
          setSelected(TIMEOUT);
          return;
        }
        setSecondsLeft(remaining - 1);
        tick(remaining - 1);
      }, 1000);
    };
    tick(TIME_LIMIT);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [question.id]);

  const handleSelect = (index: number): void => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSelected(index);
  };

  const isLocked = selected !== null;
  const isTimeout = selected === TIMEOUT;
  const isCorrect = isLocked && selected === question.correctAnswer;

  const optionStatus = (index: number): 'idle' | 'correct' | 'incorrect' => {
    if (!isLocked) return 'idle';
    if (index === question.correctAnswer) return 'correct';
    if (index === selected) return 'incorrect';
    return 'idle';
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TimerRing secondsLeft={secondsLeft} />

        <View style={styles.questionBox}>
          <Text style={styles.difficulty}>{DIFFICULTY_LABELS[question.difficulty]}</Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <FlatList
          data={question.options}
          keyExtractor={(_, index) => `${question.id}-${index}`}
          renderItem={({ item, index }) => (
            <AnswerOption
              letter={LETTERS[index]}
              label={item}
              status={optionStatus(index)}
              disabled={isLocked}
              onPress={() => handleSelect(index)}
            />
          )}
        />

        {isLocked && (
          <View style={styles.feedbackRow}>
            <Text
              style={[
                styles.feedbackText,
                isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
              ]}
            >
              {isTimeout ? '⏰ Vaxt bitdi!' : isCorrect ? '✅ Düzdür!' : '❌ Səhvdir!'}
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              activeOpacity={0.85}
              onPress={() => onAnswered(isCorrect)}
            >
              <Text style={styles.nextButtonText}>
                {isCorrect && questionNumber === totalQuestions
                  ? 'Bitir'
                  : isCorrect
                  ? 'Növbəti Sual'
                  : 'Nəticəyə Bax'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <QuestionProgressDrawer
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        score={score}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: Platform.OS === 'android' ? 32 : 12,
  },
  questionBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16,
    ...shadow,
  },
  difficulty: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 1.5,
  },
  questionText: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 26,
  },
  feedbackRow: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  feedbackCorrect: {
    color: colors.success,
  },
  feedbackIncorrect: {
    color: colors.danger,
  },
  nextButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 32,
    ...shadow,
  },
  nextButtonText: {
    color: colors.accentText,
    fontSize: 16,
    fontWeight: '800',
  },
});
