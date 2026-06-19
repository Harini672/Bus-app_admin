import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Admin Dashboard
      </Text>

      <Text style={styles.subtitle}>
        Welcome Admin!
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4C39D7'
  },

  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginTop: 20
  }
});