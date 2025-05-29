import Typography from '@/components/base/Typography';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  color?: string;
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  label,
  leftIcon,
  rightIcon,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  style,
  children,
  ...props
}: ButtonProps) => {
  
  const getButtonStyles = () => {
    const baseStyles = [styles.button, styles[size], styles[variant]];
   
    /*
    if (fullWidth) {
      baseStyles.push([styles.fullWidth]);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabled);
    }

    */
    return baseStyles;
  };
  
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.white;
      case 'secondary':
        return Colors.primary[700];
      case 'outline':
        return Colors.primary[600];
      case 'text':
        return Colors.primary[600];
      default:
        return Colors.white;
    }
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? Colors.white : Colors.primary[600]} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          
          {label && (
            <Typography 
              variant={size === 'small' ? 'bodySmall' : 'body'}
              weight="medium"
              color={getTextColor()}
            >
              {label}
            </Typography>
          )}
          
          {children}
          
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary[600],
  },
  secondary: {
    backgroundColor: Colors.primary[100],
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primary[600],
  },
  text: {
    backgroundColor: Colors.transparent,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
