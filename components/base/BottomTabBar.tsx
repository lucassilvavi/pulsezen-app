import Typography from '@/components/base/Typography';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface BottomTabProps {
  tabs: {
    key: string;
    label: string;
    icon: React.ReactNode;
    activeIcon?: React.ReactNode;
  }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  centerButton?: {
    icon: React.ReactNode;
    onPress: () => void;
    backgroundColor?: string;
  };
}

const BottomTabBar = ({
  tabs,
  activeTab,
  onTabChange,
  centerButton
}: BottomTabProps) => {
  // Calculate tabs to display on each side of the center button
  const tabsPerSide = centerButton ? Math.floor(tabs.length / 2) : tabs.length;
  const leftTabs = tabs.slice(0, tabsPerSide);
  const rightTabs = centerButton ? tabs.slice(tabsPerSide) : [];

  return (
    <View style={styles.container}>
      {/* Left side tabs */}
      {leftTabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabButton}
          onPress={() => onTabChange(tab.key)}
          activeOpacity={0.7}
        >
          <View style={styles.tabContent}>
            {activeTab === tab.key && tab.activeIcon ? tab.activeIcon : tab.icon}
            <Typography
              variant="bodySmall"
              color={activeTab === tab.key ? Colors.primary[600] : Colors.gray[500]}
              style={styles.tabLabel}
            >
              {tab.label}
            </Typography>
          </View>
        </TouchableOpacity>
      ))}

      {/* Center special button */}
      {centerButton && (
        <View style={styles.centerButtonContainer}>
          <TouchableOpacity
            style={[
              styles.centerButton,
              { backgroundColor: centerButton.backgroundColor || Colors.red[500] }
            ]}
            onPress={centerButton.onPress}
            activeOpacity={0.8}
          >
            {centerButton.icon}
          </TouchableOpacity>
        </View>
      )}

      {/* Right side tabs */}
      {rightTabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabButton}
          onPress={() => onTabChange(tab.key)}
          activeOpacity={0.7}
        >
          <View style={styles.tabContent}>
            {activeTab === tab.key && tab.activeIcon ? tab.activeIcon : tab.icon}
            <Typography
              variant="bodySmall"
              color={activeTab === tab.key ? Colors.primary[600] : Colors.gray[500]}
              style={styles.tabLabel}
            >
              {tab.label}
            </Typography>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    paddingBottom: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 4,
  },
  centerButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default BottomTabBar;
