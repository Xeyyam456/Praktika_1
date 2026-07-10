import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, radius } from '../theme';

const CRITICAL_THRESHOLD = 10;

const getColor = (secondsLeft: number): string => {
  if (secondsLeft <= 5) return colors.danger;
  if (secondsLeft <= 15) return colors.accent;
  return colors.success;
};

type Props = {
  secondsLeft: number;
};

export default function TimerRing({ secondsLeft }: Props): React.JSX.Element {
  const pulse = useSharedValue(1);
  const isCritical = secondsLeft > 0 && secondsLeft <= CRITICAL_THRESHOLD;

  useEffect(() => {
    if (isCritical) {
      pulse.value = withRepeat(
        withSequence(withTiming(1.08, { duration: 400 }), withTiming(1, { duration: 400 })),
        -1,
        true,
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(1, { duration: 200 });
    }
  }, [isCritical, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const color = getColor(secondsLeft);

  return (
    <Animated.View style={[styles.ring, { borderColor: color }, pulseStyle]}>
      <Text style={[styles.number, { color }]}>{secondsLeft}</Text>
      <Text style={styles.label}>SAN</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignSelf: 'center',
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    borderWidth: 5,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  number: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
});
