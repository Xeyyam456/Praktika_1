import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

type User = {
  id: number;
  name: string;
  role: string;
};

const mockUsers: User[] = [
  { id: 1, name: 'Elizadə Xəyyam', role: 'React Native Developer' },
  { id: 2, name: 'Aysel Məmmədova', role: 'UI/UX Designer' },
  { id: 3, name: 'Tural Həsənov', role: 'Backend Developer' },
  { id: 4, name: 'Nərmin Əliyeva', role: 'QA Engineer' },
  { id: 5, name: 'Rəşad Quliyev', role: 'Product Manager' },
];

export default function UserList(): React.JSX.Element {
  const renderItem = ({ item }: { item: User }): React.JSX.Element => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>İstifadəçilər</Text>
      <FlashList
        data={mockUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});
