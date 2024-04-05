import React, {useEffect, useState} from 'react';

import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

import {auth} from './src/utils/firebase';

import Auth from './src/components/auth';
import ListBirthday from './src/components/ListBirthday';

export default function App() {
  const [user, setUser] = useState<any>();

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
        {user ? <ListBirthday /> : <Auth />}
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
