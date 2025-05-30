import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const quickActions = [
  {
    title: 'Respiração',
    icon: 'leaf-outline',
    color: '#4CAF50',
    route: '/breathing',
  },
  {
    title: 'Diário',
    icon: 'journal-outline',
    color: '#2196F3',
    route: '/journal',
  },
  {
    title: 'Humor',
    icon: 'heart-outline',
    color: '#E91E63',
    route: '/mood',
  },
  {
    title: 'Sono',
    icon: 'moon-outline',
    color: '#9C27B0',
    route: '/sleep',
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Olá, Bem-vindo!
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Como você está se sentindo hoje?
          </Text>
        </View>

        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <Link key={index} href={action.route} asChild>
              <TouchableOpacity
                style={[styles.actionCard, { backgroundColor: colors.card }]}
              >
                <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={[styles.actionTitle, { color: colors.text }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        <View style={styles.sosContainer}>
          <Link href="/sos" asChild>
            <TouchableOpacity
              style={[styles.sosButton, { backgroundColor: colors.error }]}
            >
              <Ionicons name="shield-checkmark-outline" size={24} color="#FFFFFF" />
              <Text style={styles.sosButtonText}>SOS</Text>
            </TouchableOpacity>
          </Link>
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
  quickActionsContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sosContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});
