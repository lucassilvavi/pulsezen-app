import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const breathingTechniques = [
  {
    id: 'box',
    title: 'Respiração Quadrada',
    description: 'Técnica de 4 tempos para acalmar a mente',
    duration: '5 min',
    icon: 'square-outline',
  },
  {
    id: '4-7-8',
    title: '4-7-8',
    description: 'Inspire por 4, segure por 7, expire por 8',
    duration: '10 min',
    icon: 'timer-outline',
  },
  {
    id: 'alternate',
    title: 'Respiração Alternada',
    description: 'Alternando entre narinas para equilibrar',
    duration: '7 min',
    icon: 'repeat-outline',
  },
  {
    id: 'deep',
    title: 'Respiração Profunda',
    description: 'Técnica básica para relaxamento',
    duration: '5 min',
    icon: 'water-outline',
  },
];

export default function BreathingScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Exercícios de Respiração
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Escolha uma técnica para começar
          </Text>
        </View>

        <View style={styles.techniquesContainer}>
          {breathingTechniques.map((technique) => (
            <Link
              key={technique.id}
              href={`/breathing/${technique.id}`}
              asChild
            >
              <TouchableOpacity
                style={[styles.techniqueCard, { backgroundColor: colors.card }]}
              >
                <View style={styles.techniqueHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                    <Ionicons
                      name={technique.icon as any}
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.durationContainer}>
                    <Text style={[styles.duration, { color: colors.text }]}>
                      {technique.duration}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.techniqueTitle, { color: colors.text }]}>
                  {technique.title}
                </Text>
                <Text style={[styles.techniqueDescription, { color: colors.text }]}>
                  {technique.description}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
  },
  techniquesContainer: {
    padding: 20,
  },
  techniqueCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  techniqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  duration: {
    fontSize: 14,
    fontWeight: '600',
  },
  techniqueTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  techniqueDescription: {
    fontSize: 16,
    opacity: 0.8,
  },
}); 