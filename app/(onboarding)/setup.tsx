import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Link, router } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const notifications = [
  {
    id: 'daily_reminder',
    title: 'Lembretes Diários',
    description: 'Receba lembretes para praticar exercícios de respiração',
  },
  {
    id: 'mood_tracking',
    title: 'Rastreamento de Humor',
    description: 'Lembretes para registrar seu humor diariamente',
  },
  {
    id: 'sleep_reminder',
    title: 'Lembretes de Sono',
    description: 'Lembretes para preparar sua rotina de sono',
  },
];

export default function SetupScreen() {
  const { colors } = useTheme();
  const [settings, setSettings] = useState({
    daily_reminder: true,
    mood_tracking: true,
    sleep_reminder: true,
  });

  const toggleSetting = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      await AsyncStorage.setItem('user_settings', JSON.stringify(settings));
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Configuração Inicial
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Personalize sua experiência
          </Text>
        </View>

        <View style={styles.settingsContainer}>
          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={[styles.settingCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  {notification.title}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.text }]}>
                  {notification.description}
                </Text>
              </View>
              <Switch
                value={settings[notification.id as keyof typeof settings]}
                onValueChange={() => toggleSetting(notification.id)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <BlurView intensity={20} style={styles.footer}>
        <View style={[styles.button, { backgroundColor: colors.primary }]} onTouchEnd={handleComplete}>
          <Text style={styles.buttonText}>Começar a Usar</Text>
        </View>
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
  settingsContainer: {
    padding: 20,
  },
  settingCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
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