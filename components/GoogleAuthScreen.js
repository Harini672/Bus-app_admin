import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function GoogleAuthScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Complete Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: 'white'
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4C39D7',
    textAlign: 'center',
    marginBottom: 40
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 18,
    borderRadius: 20,
    marginBottom: 20
  },

  button: {
    backgroundColor: '#4C39D7',
    padding: 18,
    borderRadius: 40,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  }
});