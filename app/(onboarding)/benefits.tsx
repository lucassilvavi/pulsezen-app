import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const benefits = [
  {
    icon: 'happy-outline',
    title: 'Bem-estar Emocional',
    description: 'Aprenda a gerenciar suas emoções e reduzir o estresse diário',
  },
  {
    icon: 'fitness-outline',
    title: 'Saúde Física',
    description: 'Melhore sua saúde física através de exercícios de respiração e relaxamento',
  },
  {
    icon: 'moon-outline',
    title: 'Melhor Qualidade de Sono',
    description: 'Desenvolva hábitos saudáveis para uma noite de sono mais tranquila',
  },
  {
    icon: 'people-outline',
    title: 'Relacionamentos',
    description: 'Melhore seus relacionamentos através do autoconhecimento',
  },
];

export default function BenefitsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Benefícios
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Como o PulseZen pode transformar sua vida
          </Text>
        </View>

        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View
              key={index}
              style={[styles.benefitCard, { backgroundColor: colors.card }]}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons
                  name={benefit.icon as any}
                  size={32}
                  color={colors.primary}
                />
              </View>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>
                {benefit.title}
              </Text>
              <Text style={[styles.benefitDescription, { color: colors.text }]}>
                {benefit.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BlurView intensity={20} style={styles.footer}>
        <Link href="/setup" asChild>
          <View style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Começar Agora</Text>
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
  benefitsContainer: {
    padding: 20,
  },
  benefitCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  benefitDescription: {
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