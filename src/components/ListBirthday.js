/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getDocs, collection} from 'firebase/firestore';

import {db} from '../utils/firebase';

import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';

export default function ListBirthday({user}) {
  const [showList, setShowList] = useState(true);
  const [birthday, setBirthday] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemsArray = [];
      const querySnap = await getDocs(collection(db, user.uid));
      querySnap.forEach(doc => {
        const data = doc.data();
        itemsArray.push(data);
      });
      setBirthday(itemsArray);
    };

    fetchData();
  }, [user.uid]);

  return (
    <View style={styles.container}>
      {showList ? (
        <Text>Birthday</Text>
      ) : (
        <AddBirthday user={user} setShowList={setShowList} />
      )}
      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
});
