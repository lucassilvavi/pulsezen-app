import Typography from '@/components/base/Typography';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  variant?: 'default' | 'pill';
}

const TabBar = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default'
}: TabBarProps) => {
  return (
    <View style={[
      styles.container,
      variant === 'pill' ? styles.pillContainer : {}
    ]}>
      {tabs.map((tab, index) => {
        const isActive = tab === activeTab;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;
        
        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              variant === 'default' ? styles.defaultTab : styles.pillTab,
              isActive && (variant === 'default' ? styles.activeDefaultTab : styles.activePillTab),
              variant === 'pill' && isFirst && styles.pillTabFirst,
              variant === 'pill' && isLast && styles.pillTabLast,
            ]}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
          >
            <Typography
              variant="body"
              weight={isActive ? 'medium' : 'normal'}
              color={isActive ? Colors.primary[800] : Colors.gray[600]}
            >
              {tab}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  pillContainer: {
    backgroundColor: Colors.gray[100],
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeDefaultTab: {
    borderBottomColor: Colors.primary[600],
    backgroundColor: Colors.primary[50],
  },
  pillTab: {
    borderRadius: 0,
  },
  activePillTab: {
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  pillTabFirst: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  pillTabLast: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export default TabBar;
