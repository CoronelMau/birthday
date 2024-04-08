/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {getDocs, collection} from 'firebase/firestore';
import moment from 'moment';

import {db} from '../utils/firebase';

import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import Birthday from './Birthday';

export default function ListBirthday({user}) {
  const [showList, setShowList] = useState(true);
  const [futureBirthdays, setFutureBirthdays] = useState([]);
  const [pastBirthdays, setPastBirthdays] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setFutureBirthdays([]);
    setPastBirthdays([]);

    const fetchData = async () => {
      const itemsArray = [];
      const querySnap = await getDocs(collection(db, user.uid));
      querySnap.forEach(doc => {
        const data = doc.data();
        itemsArray.push(data);
      });
      formatData(itemsArray);
    };

    fetchData();
    setReloadData(false);
  }, [user.uid, reloadData]);

  const formatData = items => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const tempFutureBirthArray = [];
    const tempPastBirthArray = [];

    items.forEach(item => {
      const dateBirth = new Date(item.date.seconds * 1000);
      const formatedDateBirth = moment(dateBirth);
      const currentYear = moment().get('year');

      formatedDateBirth.set({year: currentYear});

      const diffDate = currentDate.diff(formatedDateBirth, 'days');
      const itemTemp = item;
      itemTemp.dateBirth = formatedDateBirth;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        tempFutureBirthArray.push(item);
      } else {
        tempPastBirthArray.push(item);
      }
    });
    setFutureBirthdays(tempFutureBirthArray);
    setPastBirthdays(tempPastBirthArray);
  };

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView styles={styles.scrollView}>
          {futureBirthdays.map((item, index) => (
            <Birthday key={index} birthday={item} />
          ))}
          {pastBirthdays.map((item, index) => (
            <Birthday key={index} birthday={item} />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReloadData={setReloadData}
        />
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
  scrollView: {
    marginBottom: 50,
    width: 'width',
  },
});
