import Typography from '@/components/base/Typography';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface FeatureCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
  iconBackgroundColor?: string;
  disabled?: boolean;
}

const FeatureCard = ({
  title,
  description,
  icon,
  onPress,
  backgroundColor = Colors.white,
  iconBackgroundColor = Colors.primary[100],
  disabled = false
}: FeatureCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor },
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        {icon}
      </View>
      
      <Typography 
        variant="body" 
        weight="medium" 
        color={Colors.primary[700]} 
        align="center"
        style={styles.title}
      >
        {title}
      </Typography>
      
      {description && (
        <Typography 
          variant="bodySmall" 
          color={Colors.gray[600]} 
          align="center"
        >
          {description}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    marginBottom: 4,
  }
});

export default FeatureCard;
