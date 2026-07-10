import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, radius } from '../theme';

const PANEL_WIDTH = 280;
const CLOSED_X = -PANEL_WIDTH;

type Props = {
  questionNumber: number;
  totalQuestions: number;
  score: number;
};

export default function QuestionProgressDrawer({
  questionNumber,
  totalQuestions,
  score,
}: Props): React.JSX.Element {
  const translateX = useSharedValue(CLOSED_X);
  const [isOpen, setIsOpen] = useState(false);

  const close = (): void => {
    translateX.value = withTiming(CLOSED_X, { duration: 220, easing: Easing.out(Easing.cubic) });
    setIsOpen(false);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const next = CLOSED_X + event.translationX;
      translateX.value = Math.min(0, Math.max(CLOSED_X, next));
    })
    .onEnd((event) => {
      const shouldOpen = translateX.value > CLOSED_X / 2 || event.velocityX > 500;
      translateX.value = withTiming(shouldOpen ? 0 : CLOSED_X, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
      runOnJS(setIsOpen)(shouldOpen);
    });

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.root} pointerEvents="box-none">
      {isOpen && (
        <Pressable style={styles.backdrop} onPress={close} testID="drawer-backdrop" />
      )}

      <GestureDetector gesture={panGesture}>
        <View style={styles.edgeZone} />
      </GestureDetector>

      <Animated.View style={[styles.panel, panelStyle]} pointerEvents="none">
        <Text style={styles.label}>SUAL</Text>
        <Text style={styles.value}>
          {questionNumber} / {totalQuestions}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.label}>QAZANC</Text>
        <Text style={styles.money}>${score.toLocaleString()}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 8,
  },
  edgeZone: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 40,
    zIndex: 10,
  },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: PANEL_WIDTH,
    backgroundColor: colors.surfaceAlt,
    opacity: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderTopRightRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    zIndex: 9,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },
  money: {
    color: colors.success,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
});
