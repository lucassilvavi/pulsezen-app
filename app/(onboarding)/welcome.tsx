import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={styles.image}
          resizeMode="contain"
        />
        
        <Text style={[styles.title, { color: colors.text }]}>
          Bem-vindo ao PulseZen
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Sua jornada para uma vida mais equilibrada começa aqui
        </Text>
      </View>

      <BlurView intensity={20} style={styles.footer}>
        <Link href="/features" asChild>
          <View style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Começar</Text>
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '80%',
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
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