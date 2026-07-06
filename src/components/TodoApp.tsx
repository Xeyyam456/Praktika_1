

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

type Todo = {
  id: number;
  title: string;
};

export default function TodoApp(): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>('');

  const addTodo = (): void => {
    if (text.trim().length === 0) return;
    setTodos((prev) => [...prev, { id: Date.now(), title: text.trim() }]);
    setText('');
  };

  const deleteTodo = (id: number): void => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // Sola sürüşdürəndə görünəcək Delete düyməsi
  const renderRightActions = (id: number): React.JSX.Element => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTodo(id)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Todo }): React.JSX.Element => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.title}</Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.header}>Todo List</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Yeni todo yaz..."
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Əlavə et</Text>
          </TouchableOpacity>
        </View>

        <FlashList
          data={todos}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  todoItem: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  todoText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
