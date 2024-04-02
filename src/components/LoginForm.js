/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {validateEmail} from '../utils/validations';
import {auth} from '../utils/firebase.js';

export default function LoginForm({changeForm}) {
  const [formData, setFormData] = useState(defaultValues());
  const [formError, setFromError] = useState({});

  const login = () => {
    let errors = {};

    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      signInWithEmailAndPassword(auth, formData.email, formData.password).catch(
        () => {
          setFromError({
            email: true,
            password: true,
          });
        },
      );
    }

    setFromError(errors);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#969696"
        style={[styles.input, formError.email && styles.error]}
        onChange={e => onChange(e, 'email')}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#969696"
        style={[styles.input, formError.password && styles.error]}
        secureTextEntry
        onChange={e => onChange(e, 'password')}
      />

      <TouchableOpacity onPress={login}>
        <Text style={styles.textButton}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.textButton}> Register </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValues() {
  return {email: '', password: ''};
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
  register: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  error: {
    borderColor: '#940c0c',
  },
});
