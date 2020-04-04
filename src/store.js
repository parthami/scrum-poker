import firebase from 'firebase/app';
import 'firebase/firestore';
import {firebaseConfig} from './config.js'

firebase.initializeApp(firebaseConfig);

const roomsCollection = firebase.firestore().collection('rooms');

export const store = {
    rooms: null,
    currentUser: null,
    createRoom: (name) => roomsCollection.add({
        createdOn:  new Date(),
        admin: store.currentUser.uid,
        name: name
    }),
}

roomsCollection.onSnapshot((roomRef) => {
    const rooms = [];
    roomRef.forEach((doc) => {
        const room = doc.data();
        room.id = doc.id;
        room.name = doc.name;
        rooms.push(room);
    });
    store.rooms = rooms;
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.currentUser = user;
    } else {
      // Sign in failed
    }
  });