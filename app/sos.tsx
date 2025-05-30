import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export default function SOSScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('emergency_contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleAddContact = () => {
    router.push('/sos/add-contact');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          SOS
        </Text>
      </View>

      <View style={styles.emergencyContainer}>
        <TouchableOpacity
          style={[styles.emergencyButton, { backgroundColor: colors.error }]}
          onPress={() => handleCall('192')}
        >
          <Ionicons name="medical" size={32} color="#FFFFFF" />
          <Text style={styles.emergencyButtonText}>
            SAMU
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.emergencyButton, { backgroundColor: colors.error }]}
          onPress={() => handleCall('193')}
        >
          <Ionicons name="flame" size={32} color="#FFFFFF" />
          <Text style={styles.emergencyButtonText}>
            Bombeiros
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.breathingContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Exercícios de Respiração
        </Text>
        <TouchableOpacity
          style={[styles.breathingButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/breathing/square')}
        >
          <Ionicons name="pulse" size={24} color="#FFFFFF" />
          <Text style={styles.breathingButtonText}>
            Respiração Quadrada
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactsContainer}>
        <View style={styles.contactsHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Contatos de Emergência
          </Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddContact}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.contactsList}>
          {contacts.map((contact: EmergencyContact) => (
            <TouchableOpacity
              key={contact.id}
              style={[styles.contactCard, { backgroundColor: colors.card }]}
              onPress={() => handleCall(contact.phone)}
            >
              <View style={styles.contactInfo}>
                <Text style={[styles.contactName, { color: colors.text }]}>
                  {contact.name}
                </Text>
                <Text style={[styles.contactRelationship, { color: colors.text }]}>
                  {contact.relationship}
                </Text>
              </View>
              <Ionicons name="call" size={24} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  emergencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  emergencyButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  breathingContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  breathingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  breathingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  contactsContainer: {
    flex: 1,
    padding: 20,
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactsList: {
    flex: 1,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactRelationship: {
    fontSize: 14,
    opacity: 0.6,
  },
}); 