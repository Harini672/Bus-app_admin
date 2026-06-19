import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Admin Login
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

     <TouchableOpacity
  style={styles.loginButton}
  onPress={() => {
    console.log("Login clicked");
    navigation.navigate('Dashboard');
  }}
>
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <Text style={styles.or}>
        OR
      </Text>

     <TouchableOpacity
  style={styles.googleButton}
  onPress={() => {
    console.log("Google clicked");
    navigation.navigate('GoogleAuth');
  }}
>
        <Image
          source={require('../assets/google.png')}
          style={styles.googleIcon}
        />

        <Text style={styles.googleText}>
          Continue with Google
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
    fontSize: 40,
    color: '#4C39D7',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
    fontSize: 18
  },

  loginButton: {
    backgroundColor: '#4C39D7',
    padding: 18,
    borderRadius: 40,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },

  or: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18
  },

  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 18,
    borderRadius: 20
  },

  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 15
  },

  googleText: {
    fontSize: 20
  }
});