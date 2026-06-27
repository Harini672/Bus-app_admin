import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4C39D7',
    width: '80%',
    padding: 18,
    borderRadius: 40,
    alignItems: 'center',
    elevation: 8,
  },

  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});