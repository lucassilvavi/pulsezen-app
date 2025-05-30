import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface MoodEntry {
  id: string;
  mood: number;
  note: string;
  date: string;
}

const moods = [
  { value: 1, emoji: '😢', label: 'Muito Triste' },
  { value: 2, emoji: '😕', label: 'Triste' },
  { value: 3, emoji: '😐', label: 'Neutro' },
  { value: 4, emoji: '🙂', label: 'Feliz' },
  { value: 5, emoji: '😄', label: 'Muito Feliz' },
];

export default function MoodScreen() {
  const { colors } = useTheme();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem('mood_entries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleSaveMood = async () => {
    if (selectedMood === null) return;

    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note,
      date: new Date().toLocaleDateString(),
    };

    try {
      const updatedEntries = [entry, ...entries];
      await AsyncStorage.setItem('mood_entries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      setSelectedMood(null);
      setNote('');
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const chartData: ChartData = {
    labels: entries.slice(0, 7).map((entry: MoodEntry) => entry.date),
    datasets: [
      {
        data: entries.slice(0, 7).map((entry: MoodEntry) => entry.mood),
      },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Como você está se sentindo?
        </Text>
      </View>

      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodButton,
              selectedMood === mood.value && {
                backgroundColor: colors.primary + '20',
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setSelectedMood(mood.value)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={[styles.moodLabel, { color: colors.text }]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMood !== null && (
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSaveMood}
        >
          <Text style={styles.saveButtonText}>Salvar Humor</Text>
        </TouchableOpacity>
      )}

      {entries.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>
            Histórico de Humor
          </Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              decimalPlaces: 0,
              color: (opacity = 1) => colors.primary + opacity.toString(16).padStart(2, '0'),
              labelColor: (opacity = 1) => colors.text + opacity.toString(16).padStart(2, '0'),
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: colors.primary,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry: MoodEntry) => (
          <View
            key={entry.id}
            style={[styles.entryCard, { backgroundColor: colors.card }]}
          >
            <View style={styles.entryHeader}>
              <Text style={styles.entryMood}>
                {moods.find((m) => m.value === entry.mood)?.emoji}
              </Text>
              <Text style={[styles.entryDate, { color: colors.text }]}>
                {entry.date}
              </Text>
            </View>
            {entry.note && (
              <Text style={[styles.entryNote, { color: colors.text }]}>
                {entry.note}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  moodContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  saveButton: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  chartContainer: {
    padding: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  entriesContainer: {
    flex: 1,
    padding: 20,
  },
  entryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryMood: {
    fontSize: 24,
  },
  entryDate: {
    fontSize: 14,
    opacity: 0.6,
  },
  entryNote: {
    fontSize: 16,
  },
}); 