import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, StatusBar} from 'react-native';

import {auth} from './src/utils/firebase';

import Auth from './src/components/auth';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(res => {
      setUser(res);
    });
  }, []);

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.background}>
        {user ? <Text>You are logged</Text> : <Auth />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
