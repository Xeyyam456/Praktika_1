import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, shadow } from '../theme';

type Props = {
  onStart: (playerName: string) => void;
};

export default function StartScreen({ onStart }: Props): React.JSX.Element {
  const [name, setName] = useState('');
  const isNameValid = name.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {/* <View style={styles.badge}>
          <Text style={styles.badgeText}>200 SUALLIQ HOVUZ · JS · REACT · TS · HTML · CSS</Text>
        </View> */}

        <Text style={styles.title}>Kim Milyonçu{'\n'}Olmaq İstər?</Text>
        <Text style={styles.subtitle}>
          Hər sual üçün 30 saniyən var. Səhv cavab və ya vaxtın bitməsi
          oyunu bitirir — neçəyə qədər davam edə bilərsən?
        </Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Adınızı daxil edin"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            returnKeyType="done"
          />

          <TouchableOpacity
            style={[styles.button, !isNameValid && styles.buttonDisabled]}
            activeOpacity={0.85}
            disabled={!isNameValid}
            onPress={() => onStart(name.trim())}
          >
            <Text style={styles.buttonText}>Oyuna Başla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 40,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 20,
    ...shadow,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 18,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: colors.accentText,
    fontSize: 17,
    fontWeight: '800',
  },
});
