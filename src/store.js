import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './config.js'

/* eslint-disable no-console*/

firebase.initializeApp(firebaseConfig);

class Room {
  constructor (name, tickets, admin) {
      this.name = name;
      this.tickets = tickets;
      this.admin = admin;
      this.createdOn = new Date();
  }
  
}
  var roomConverter = {
    toFirestore: function (room) {
      return {
        name: room.name,
        tickets: room.tickets,
        admin: room.admin,
        createdOn: room.createdOn
      }
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new Room(data.name, data.tickets, data.admin)
    }
  }
  

const roomsCollection = firebase.firestore().collection('rooms');

export const store = {
  rooms: null,
  currentUser: null,
  createRoom: (name, tickets) => roomsCollection.doc(name).withConverter(roomConverter).set(
    new Room (name, tickets, store.currentUser.uid)
  ),
  get: (id) => roomsCollection.doc(id).withConverter(roomConverter).get().then(function (doc) {
    if (doc.exists) {
      const room = doc.data();
      console.log("Got room: " + room);
      return room;
    } else {
      console.log("No such document!");
    }
  }),
  updateTickets: (name, tickets) => firebase.firestore().batch().update((roomsCollection.doc(name)), {tickets}).commit().then(function () {
    console.log("updated");
  }).catch(function (error) {
    console.log(name);
    console.log(tickets);
    console.error(error);
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
  /* eslint no-console: 0*/
  console.log('Received Balls feed:', rooms);
  store.rooms = rooms;
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.currentUser = user;
  } else {
    // Sign in failed
  }
});