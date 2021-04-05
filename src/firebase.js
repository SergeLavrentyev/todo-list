import firebase from 'firebase/app';
import 'firebase/firestore';
const config = {
  apiKey: 'AIzaSyCtG8OrOrUXRg3qFrb919eG_AbjHQVLCMg',
  authDomain: 'todo-app-b2ea2.firebaseapp.com',
  databaseURL: 'https://todo-app-b2ea2-default-rtdb.firebaseio.com',
  projectId: 'todo-app-b2ea2',
  storageBucket: 'todo-app-b2ea2.appspot.com',
  messagingSenderId: '724374245914',
  appId: '1:724374245914:web:f296e19c293b5983eb77a3',
  measurementId: 'G-PR6G4NY9FD'
};

firebase.initializeApp(config);

export const db = firebase.firestore();
