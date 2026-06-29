import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
  source={require('../../assets/bus.png')}
  style={styles.image}
/>

      <Text style={styles.heading}>
        WHERE IS MY BUS?
      </Text>

      <Text style={styles.subheading}>
        "No more waiting in the dark, Track your bus, save your time"
      </Text>

      <CustomButton
        title="Admin Portal"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain'
  },

  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#4C39D7',
    marginTop: 20
  },

  subheading: {
    textAlign: 'center',
    color: '#4C39D7',
    fontSize: 20,
    marginHorizontal: 30,
    marginVertical: 20
  }
});