/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';

export default function RegisterForm({changeForm}) {
  const register = () => {
    console.log('Registering...');
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#969696"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#969696"
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        placeholderTextColor="#969696"
      />

      <TouchableOpacity onPress={register}>
        <Text style={styles.textButton}> Register </Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.textButton}> Log In </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textButton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
