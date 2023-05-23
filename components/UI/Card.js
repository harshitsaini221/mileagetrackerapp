import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2e2f32',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    width: '100%',
    marginBottom: 16,
  },
});

export default Card;
