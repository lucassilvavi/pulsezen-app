// React and React Native types
declare module 'react' {
  export * from 'react';
}

declare module 'react-native' {
  export const View: any;
  export const Text: any;
  export const StyleSheet: any;
  export const ScrollView: any;
  export const TouchableOpacity: any;
  export const TextInput: any;
  export const Linking: any;
  export const Dimensions: {
    get: (dimension: string) => number;
  };
}

// Expo Router types
declare module 'expo-router' {
  export const Tabs: any;
  export const Link: any;
  export const useRouter: () => {
    push: (route: string) => void;
    back: () => void;
  };
  export const useLocalSearchParams: () => Record<string, string>;
}

// Expo Vector Icons types
declare module '@expo/vector-icons' {
  export const Ionicons: any;
}

// Expo Blur types
declare module 'expo-blur' {
  export const BlurView: any;
}

// Expo AV types
declare module 'expo-av' {
  export const Audio: any;
}

// React Native Reanimated types
declare module 'react-native-reanimated' {
  export const Animated: any;
  export const useAnimatedStyle: any;
  export const withRepeat: any;
  export const withSequence: any;
  export const withTiming: any;
  export const useSharedValue: any;
}

// AsyncStorage types
declare module '@react-native-async-storage/async-storage' {
  const AsyncStorage: {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
  export default AsyncStorage;
}

// React Native Chart Kit types
declare module 'react-native-chart-kit' {
  export const LineChart: any;
}

// Fix implicit any types
declare namespace NodeJS {
  interface Timeout {}
}

// Type definitions for components
interface TabBarIconProps {
  color: string;
  size: number;
}

interface ChartConfig {
  backgroundColor: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces: number;
  color: (opacity?: number) => string;
  labelColor: (opacity?: number) => string;
  style: {
    borderRadius: number;
  };
  propsForDots: {
    r: string;
    strokeWidth: string;
    stroke: string;
  };
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

// Type definitions for data models
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
}

interface MoodEntry {
  id: string;
  mood: number;
  note: string;
  date: string;
}

interface SleepEntry {
  id: string;
  quality: number;
  hours: number;
  note: string;
  date: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
} 