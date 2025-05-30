import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const features = [
  {
    icon: 'leaf-outline',
    title: 'Exercícios de Respiração',
    description: 'Técnicas guiadas para acalmar sua mente e reduzir o estresse',
  },
  {
    icon: 'journal-outline',
    title: 'Diário Pessoal',
    description: 'Registre seus pensamentos e emoções em um espaço seguro',
  },
  {
    icon: 'heart-outline',
    title: 'Rastreador de Humor',
    description: 'Monitore seu bem-estar emocional ao longo do tempo',
  },
  {
    icon: 'moon-outline',
    title: 'Sono',
    description: 'Melhore a qualidade do seu sono com exercícios relaxantes',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'SOS',
    description: 'Acesso rápido a técnicas de emergência quando precisar',
  },
];

export default function FeaturesScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Recursos Principais
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Descubra como o PulseZen pode ajudar você
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={[styles.featureCard, { backgroundColor: colors.card }]}
            >
              <Ionicons
                name={feature.icon as any}
                size={32}
                color={colors.primary}
              />
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: colors.text }]}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BlurView intensity={20} style={styles.footer}>
        <Link href="/benefits" asChild>
          <View style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Próximo</Text>
          </View>
        </Link>
      </BlurView>
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
  featuresContainer: {
    padding: 20,
  },
  featureCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    opacity: 0.8,
  },
  footer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 