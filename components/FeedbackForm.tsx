import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  RefreshControl,
} from 'react-native';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    Keyboard.dismiss();
    setRefreshing(true);
    setName('');
    setMessage('');
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  function handleSubmit() {
    if (!name.trim() || !message.trim()) {
      Alert.alert('Xəta', 'Ad və mesaj sahələri boş ola bilməz.');
      return;
    }
    Alert.alert(
      'Təşəkkür edirik! 🎉',
      `${name}, rəyiniz qəbul edildi!`,
      [{ text: 'OK', onPress: () => { setName(''); setMessage(''); } }],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F4F7" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#63ff78']}
            tintColor="#6C63FF"
          />
        }>
        <Text style={styles.title}>Rəy Formu</Text>
        <Text style={styles.subtitle}>Fikirlərinizi bizimlə paylaşın</Text>

        <Text style={styles.label}>Adınız</Text>
        <TextInput
          style={styles.input}
          placeholder="Adınızı daxil edin..."
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
        />

        <Text style={styles.label}>Mesajınız</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Rəyinizi yazın..."
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        <TouchableOpacity
          style={[
            styles.button,
            (!name.trim() || !message.trim()) && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Göndər 📨</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F4F7'
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4
  },

  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#54585f',
    marginBottom: 32
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1A1A2E',
    marginBottom: 20,
  },
  textArea: { height: 130, textAlignVertical: 'top' },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { backgroundColor: '#C4B5FD' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
