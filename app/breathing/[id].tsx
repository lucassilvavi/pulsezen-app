import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const BREATHING_CIRCLE_SIZE = width * 0.6;

const breathingTechniques = {
  box: {
    title: 'Respiração Quadrada',
    description: 'Inspire, segure, expire e segure novamente, cada um por 4 segundos.',
    steps: [
      { action: 'Inspire', duration: 4000 },
      { action: 'Segure', duration: 4000 },
      { action: 'Expire', duration: 4000 },
      { action: 'Segure', duration: 4000 },
    ],
  },
  '4-7-8': {
    title: 'Respiração 4-7-8',
    description: 'Inspire por 4 segundos, segure por 7 e expire por 8 segundos.',
    steps: [
      { action: 'Inspire', duration: 4000 },
      { action: 'Segure', duration: 7000 },
      { action: 'Expire', duration: 8000 },
    ],
  },
  alternate: {
    title: 'Respiração Alternada',
    description: 'Alternando entre narinas para equilibrar a energia.',
    steps: [
      { action: 'Inspire pela esquerda', duration: 4000 },
      { action: 'Segure', duration: 4000 },
      { action: 'Expire pela direita', duration: 4000 },
      { action: 'Inspire pela direita', duration: 4000 },
      { action: 'Segure', duration: 4000 },
      { action: 'Expire pela esquerda', duration: 4000 },
    ],
  },
  deep: {
    title: 'Respiração Profunda',
    description: 'Inspire profundamente e expire lentamente.',
    steps: [
      { action: 'Inspire', duration: 4000 },
      { action: 'Expire', duration: 6000 },
    ],
  },
};

export default function BreathingExerciseScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const scale = useSharedValue(1);

  const technique = breathingTechniques[id as keyof typeof breathingTechniques];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % technique.steps.length);
      }, technique.steps[currentStep].duration);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, technique.steps]);

  const animatedStyle = useAnimatedStyle(() => {
    if (isPlaying) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: technique.steps[currentStep].duration }),
          withTiming(1, { duration: technique.steps[currentStep].duration })
        ),
        -1,
        true
      );
    } else {
      scale.value = withTiming(1);
    }
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          {technique.title}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.description, { color: colors.text }]}>
          {technique.description}
        </Text>

        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              { backgroundColor: colors.primary + '20' },
              animatedStyle,
            ]}
          >
            <Text style={[styles.breathingText, { color: colors.text }]}>
              {technique.steps[currentStep].action}
            </Text>
          </Animated.View>
        </View>

        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: colors.primary }]}
          onPress={handlePlayPause}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: BREATHING_CIRCLE_SIZE,
    height: BREATHING_CIRCLE_SIZE,
    borderRadius: BREATHING_CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingText: {
    fontSize: 24,
    fontWeight: '600',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
}); 