/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import {auth} from '../utils/firebase.js';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';

import {validateEmail} from '../utils/validations.js';

export default function RegisterForm({changeForm}) {
  const [formData, setFormData] = useState(defaultValues());
  const [formError, setFormError] = useState({});

  const register = () => {
    let errors = {};

    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (validateEmail(formData.email) === false) {
      errors.email = true;
    } else if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => console.log('Account created'))
        .catch(err => console.log(err));
    }

    setFormError(errors);
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Email"
        placeholderTextColor="#969696"
        onChange={e => setFormData({...formData, email: e.nativeEvent.text})}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Password"
        placeholderTextColor="#969696"
        secureTextEntry
        onChange={e => setFormData({...formData, password: e.nativeEvent.text})}
      />
      <TextInput
        style={[styles.input, formError.repeatPassword && styles.error]}
        placeholder="Repeat Password"
        placeholderTextColor="#969696"
        secureTextEntry
        onChange={e =>
          setFormData({...formData, repeatPassword: e.nativeEvent.text})
        }
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

const defaultValues = () => {
  return {email: '', password: '', repeatPassword: ''};
};

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
  error: {
    borderColor: '#940c0c',
  },
});
