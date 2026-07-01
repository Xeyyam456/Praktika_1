import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

export default function ProfilKarti() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = isDarkMode ? dark : light;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.bg}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.bg}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }>
        <View style={[styles.header, {backgroundColor: theme.primary}]}>
          <Text style={styles.headerTitle}>Profil Kartı</Text>
        </View>
        <View style={[styles.card, {backgroundColor: theme.card}]}>
          <Image
            source={{uri: 'https://i.pravatar.cc/150?img=12'}}
            style={styles.avatar}
          />
          <Text style={[styles.name, {color: theme.text}]}>Elizade Xeyyam</Text>
          <Text style={[styles.role, {color: theme.subtext}]}>
            React Native Developer
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, {color: theme.primary}]}>128</Text>
              <Text style={[styles.statLabel, {color: theme.subtext}]}>Post</Text>
            </View>
            <View style={[styles.divider, {backgroundColor: theme.border}]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, {color: theme.primary}]}>4.2K</Text>
              <Text style={[styles.statLabel, {color: theme.subtext}]}>İzləyici</Text>
            </View>
            <View style={[styles.divider, {backgroundColor: theme.border}]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, {color: theme.primary}]}>312</Text>
              <Text style={[styles.statLabel, {color: theme.subtext}]}>İzlənən</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.modeButton, {backgroundColor: theme.primary}]}
            onPress={() => setIsDarkMode(prev => !prev)}
            activeOpacity={0.8}>
            <Text style={styles.modeButtonText}>
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const light = {
  bg: '#F2F4F7',
  card: '#FFFFFF',
  text: '#1A1A2E',
  subtext: '#6B7280',
  primary: '#6C63FF',
  border: '#E5E7EB',
};
const dark = {
  bg: '#0F0F1A',
  card: '#1E1E2E',
  text: '#F9FAFB',
  subtext: '#9CA3AF',
  primary: '#818CF8',
  border: '#374151',
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  scrollContent: {paddingBottom: 40},
  header: {paddingHorizontal: 20, paddingVertical: 16},
  headerTitle: {fontSize: 20, fontWeight: '700', color: '#fff'},
  card: {
    margin: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#6C63FF',
    marginBottom: 12,
  },
  name: {fontSize: 22, fontWeight: '700', marginBottom: 4},
  role: {fontSize: 14, marginBottom: 20},
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {alignItems: 'center', flex: 1},
  statNumber: {fontSize: 20, fontWeight: '700'},
  statLabel: {fontSize: 12, marginTop: 2},
  divider: {width: 1, height: 36},
  modeButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modeButtonText: {color: '#fff', fontSize: 16, fontWeight: '700'},
});
