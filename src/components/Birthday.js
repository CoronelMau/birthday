/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Birthday({birthday, deleteBirthday}) {
  const past = birthday.days > 0 ? true : false;

  const infoDay = () => {
    if (birthday.days === 0) {
      return <Text>Today!!!</Text>;
    }
    return (
      <Text style={{color: '#fff', fontWeight: 'bold'}}>
        {Math.abs(birthday.days)} days
      </Text>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        past
          ? styles.past
          : birthday.days === 0
          ? styles.today
          : styles.current,
      ]}
      onPress={() => {
        deleteBirthday(birthday);
        console.log(birthday.id);
      }}>
      <Text
        style={styles.username}>{`${birthday.name} ${birthday.lastName}`}</Text>
      {past ? <Text>Passed</Text> : infoDay(birthday.days)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  username: {
    color: '#fff',
    width: '80%',
    fontWeight: 'bold',
    fontSize: 16,
  },
  past: {
    backgroundColor: '#820000',
  },
  current: {
    backgroundColor: '#1ea1f2',
  },
  today: {
    backgroundColor: '#559204',
  },
});
