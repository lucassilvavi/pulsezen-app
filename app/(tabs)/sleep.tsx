import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface SleepEntry {
  id: string;
  quality: number;
  hours: number;
  note: string;
  date: string;
}

const sleepQualities = [
  { value: 1, emoji: '😴', label: 'Muito Ruim' },
  { value: 2, emoji: '😕', label: 'Ruim' },
  { value: 3, emoji: '😐', label: 'Regular' },
  { value: 4, emoji: '😊', label: 'Bom' },
  { value: 5, emoji: '😴', label: 'Excelente' },
];

export default function SleepScreen() {
  const { colors } = useTheme();
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<number | null>(null);
  const [hours, setHours] = useState<number>(8);
  const [note, setNote] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem('sleep_entries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleSaveSleep = async () => {
    if (selectedQuality === null) return;

    const entry: SleepEntry = {
      id: Date.now().toString(),
      quality: selectedQuality,
      hours,
      note,
      date: new Date().toLocaleDateString(),
    };

    try {
      const updatedEntries = [entry, ...entries];
      await AsyncStorage.setItem('sleep_entries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      setSelectedQuality(null);
      setHours(8);
      setNote('');
    } catch (error) {
      console.error('Error saving sleep:', error);
    }
  };

  const chartData: ChartData = {
    labels: entries.slice(0, 7).map((entry: SleepEntry) => entry.date),
    datasets: [
      {
        data: entries.slice(0, 7).map((entry: SleepEntry) => entry.hours),
      },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Como você dormiu?
        </Text>
      </View>

      <View style={styles.qualityContainer}>
        {sleepQualities.map((quality) => (
          <TouchableOpacity
            key={quality.value}
            style={[
              styles.qualityButton,
              selectedQuality === quality.value && {
                backgroundColor: colors.primary + '20',
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setSelectedQuality(quality.value)}
          >
            <Text style={styles.qualityEmoji}>{quality.emoji}</Text>
            <Text style={[styles.qualityLabel, { color: colors.text }]}>
              {quality.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.hoursContainer}>
        <Text style={[styles.hoursLabel, { color: colors.text }]}>
          Horas de sono:
        </Text>
        <View style={styles.hoursButtons}>
          {[6, 7, 8, 9, 10].map((h) => (
            <TouchableOpacity
              key={h}
              style={[
                styles.hourButton,
                hours === h && {
                  backgroundColor: colors.primary + '20',
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setHours(h)}
            >
              <Text style={[styles.hourText, { color: colors.text }]}>
                {h}h
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedQuality !== null && (
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSaveSleep}
        >
          <Text style={styles.saveButtonText}>Salvar Sono</Text>
        </TouchableOpacity>
      )}

      {entries.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>
            Histórico de Sono
          </Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              decimalPlaces: 1,
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
        {entries.map((entry: SleepEntry) => (
          <View
            key={entry.id}
            style={[styles.entryCard, { backgroundColor: colors.card }]}
          >
            <View style={styles.entryHeader}>
              <Text style={styles.entryQuality}>
                {sleepQualities.find((q) => q.value === entry.quality)?.emoji}
              </Text>
              <Text style={[styles.entryHours, { color: colors.text }]}>
                {entry.hours}h
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
  qualityContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qualityButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  qualityEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  qualityLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  hoursContainer: {
    padding: 20,
  },
  hoursLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  hoursButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hourButton: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 60,
    alignItems: 'center',
  },
  hourText: {
    fontSize: 16,
    fontWeight: '600',
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
  entryQuality: {
    fontSize: 24,
  },
  entryHours: {
    fontSize: 16,
    fontWeight: '600',
  },
  entryDate: {
    fontSize: 14,
    opacity: 0.6,
  },
  entryNote: {
    fontSize: 16,
  },
}); 