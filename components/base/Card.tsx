import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'none' | 'small' | 'medium' | 'large';
  radius?: 'small' | 'medium' | 'large';
}



const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  radius = 'medium',
  style,
  ...props
}: CardProps) => {

  const paddingStyleKey = `padding${padding.charAt(0).toUpperCase() + padding.slice(1)}` as keyof typeof styles;
  const radiusStyleKey = `radius${radius.charAt(0).toUpperCase() + radius.slice(1)}` as keyof typeof styles;
  
  return (
    <View
      style={[
       styles.card,
      styles[variant],
      styles[paddingStyleKey],
      styles[radiusStyleKey],
      style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    width: '100%',
  },
  default: {
    backgroundColor: Colors.white,
  },
  elevated: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  outline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: 8,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 24,
  },
  radiusSmall: {
    borderRadius: 4,
  },
  radiusMedium: {
    borderRadius: 8,
  },
  radiusLarge: {
    borderRadius: 16,
  },
});

export default Card;
