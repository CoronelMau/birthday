import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  View,
  Button,
} from 'react-native';

import {auth} from './src/utils/firebase';

import Auth from './src/components/auth';

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
        {user ? <Logout /> : <Auth />}
      </SafeAreaView>
    </>
  );
}

function Logout() {
  const logout = () => {
    auth.signOut();
  };

  return (
    <View>
      <Text>You are logged</Text>
      <Button title="Close session" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
