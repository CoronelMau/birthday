/* eslint-disable prettier/prettier */
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAfxZAyD3kbX-BLSx9nUs6o3fWqnCg8wuo',
  authDomain: 'brithday-982e1.firebaseapp.com',
  databaseURL: 'https://brithday-982e1-default-rtdb.firebaseio.com',
  projectId: 'brithday-982e1',
  storageBucket: 'brithday-982e1.appspot.com',
  messagingSenderId: '84344647919',
  appId: '1:84344647919:web:aa483bae0315c3196f6b1a',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
export const auth = getAuth(firebase);
