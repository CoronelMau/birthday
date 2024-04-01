/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default function LoginForm({changeForm}) {
  return (
    <View>
      <Text>Login Form</Text>
      <TouchableOpacity onPress={changeForm}>
        <Text style={styles.textButton}> Register </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textButton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
