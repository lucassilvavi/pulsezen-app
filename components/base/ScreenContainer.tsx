import { Colors, Gradients } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface ScreenContainerProps extends ViewProps {
  gradient?: boolean;
   gradientColors?: [string, string, ...string[]];
  useSafeArea?: boolean;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

const ScreenContainer = ({
  children,
  gradient = true,
  gradientColors = Gradients.primary,
  useSafeArea = true,
  paddingHorizontal = 16,
  paddingTop = 24,
  paddingBottom = 80, // Extra padding for bottom tab navigation
  style,
  ...props
}: ScreenContainerProps) => {
  
  const containerStyles = [
    styles.container,
    {
      paddingHorizontal,
      paddingTop,
      paddingBottom,
    },
    style
  ];

  if (gradient) {
    return (
      <LinearGradient
        colors={gradientColors}
        style={[styles.container, { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0 }]}
        {...props}
      >
        <View style={containerStyles}>
          {children}
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default ScreenContainer;
