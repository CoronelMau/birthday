/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import 'firebase/firestore';

import {db} from '../utils/firebase';
import {addDoc, collection} from 'firebase/firestore';

export default function AddBirthday() {
  const [isDataPickerVisible, setIsDataPickerVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [date, setDate] = useState(new Date());

  const handleConfirm = e => {
    const dateBirth = e.nativeEvent.timestamp;
    setDate(new Date(dateBirth));
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    setFormData({...formData, date});
    setIsDataPickerVisible(false);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const showDatePicker = () => {
    if (formData.dateBirth) {
      setFormData({});
    }
    setIsDataPickerVisible(true);
  };

  const onSubmit = async () => {
    let errors = {};

    if (!formData.name || !formData.lastName || !formData.date) {
      if (!formData.name) errors.name = true;
      if (!formData.lastName) errors.lastName = true;
      if (!formData.date) errors.date = true;
      console.log('Errors');
    } else {
      formData.date.setYear(0);
      const docRef = await addDoc(collection(db, 'birthday'), formData);
      console.log(docRef.id);
    }
    setFormErrors(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formErrors.name && styles.errors]}
          placeholder="Name"
          placeholderTextColor="#969696"
          onChange={e => {
            onChange(e, 'name');
          }}
        />
        <TextInput
          style={[styles.input, formErrors.lastName && styles.errors]}
          placeholder="Last Name"
          placeholderTextColor="#969696"
          onChange={e => {
            onChange(e, 'lastName');
          }}
        />
        <View
          style={[
            styles.input,
            styles.datepicker,
            formErrors.date && styles.errors,
          ]}>
          <Text
            style={{
              color: `${formData.date ? '#fff' : '#969696'}`,
              fontSize: 18,
            }}
            onPress={showDatePicker}>
            {formData.date ? moment(formData.date).format('LL') : 'Birthday'}
          </Text>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addButton}> Create Birthday</Text>
        </TouchableOpacity>
      </View>
      {isDataPickerVisible && (
        <RNDateTimePicker
          value={date}
          display="spinner"
          onChange={handleConfirm}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  datepicker: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#fff',
  },
  errors: {
    borderColor: 'red',
  },
});
