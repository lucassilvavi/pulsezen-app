import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
}

export default function JournalScreen() {
  const { colors } = useTheme();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '😊',
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem('journal_entries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleAddEntry = async () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toLocaleDateString(),
      mood: newEntry.mood,
    };

    try {
      const updatedEntries = [entry, ...entries];
      await AsyncStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      setNewEntry({ title: '', content: '', mood: '😊' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Meu Diário
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setIsAdding(true)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {isAdding ? (
        <View style={styles.addEntryContainer}>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Título"
            placeholderTextColor={colors.text + '80'}
            value={newEntry.title}
            onChangeText={(text: string) => setNewEntry({ ...newEntry, title: text })}
          />
          <TextInput
            style={[styles.input, styles.contentInput, { color: colors.text, borderColor: colors.border }]}
            placeholder="Como você está se sentindo hoje?"
            placeholderTextColor={colors.text + '80'}
            multiline
            value={newEntry.content}
            onChangeText={(text: string) => setNewEntry({ ...newEntry, content: text })}
          />
          <View style={styles.moodContainer}>
            {['😊', '😐', '😢', '😡', '😴'].map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodButton,
                  newEntry.mood === mood && { backgroundColor: colors.primary + '20' },
                ]}
                onPress={() => setNewEntry({ ...newEntry, mood })}
              >
                <Text style={styles.moodText}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.border }]}
              onPress={() => setIsAdding(false)}
            >
              <Text style={[styles.actionButtonText, { color: colors.text }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={handleAddEntry}
            >
              <Text style={styles.actionButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.entriesContainer}>
          {entries.map((entry: JournalEntry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              asChild
            >
              <TouchableOpacity
                style={[styles.entryCard, { backgroundColor: colors.card }]}
              >
                <View style={styles.entryHeader}>
                  <Text style={[styles.entryTitle, { color: colors.text }]}>
                    {entry.title}
                  </Text>
                  <Text style={styles.entryMood}>{entry.mood}</Text>
                </View>
                <Text
                  style={[styles.entryContent, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {entry.content}
                </Text>
                <Text style={[styles.entryDate, { color: colors.text }]}>
                  {entry.date}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addEntryContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  moodButton: {
    padding: 12,
    borderRadius: 12,
  },
  moodText: {
    fontSize: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  entriesContainer: {
    flex: 1,
    padding: 20,
  },
  entryCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  entryMood: {
    fontSize: 24,
  },
  entryContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 14,
    opacity: 0.6,
  },
}); 