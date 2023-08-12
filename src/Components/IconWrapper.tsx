import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconWrapperProps {
    children: React.ReactElement;
  backgroundColor: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children, backgroundColor }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start', 
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconWrapper;