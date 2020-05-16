import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './config.js';
// var firebaseui = require('firebaseui');

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
const visitedRoomsCollection = firebase.firestore().collection('visitedRooms');

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
  createVisitedRooms: () => visitedRoomsCollection.doc(store.currentUser.uid).set({rooms: {}}),
  getVisitedRooms: () => visitedRoomsCollection.doc('hcKtwIrSPHRndAXIIWJXeoAui612').get().then(function (doc){
    if(doc.exists) {
      return doc.data()
    }
  }),
  updateVisitedRooms: (roomName) => visitedRoomsCollection.doc('hcKtwIrSPHRndAXIIWJXeoAui612').update({
    ['rooms.'+roomName]: Date.now()
  }),
}

// roomsCollection.onSnapshot((roomRef) => {
//   const rooms = [];
//   roomRef.forEach((doc) => {
//     const room = doc.data();
//     room.id = doc.id;
//     room.name = doc.name;
//     rooms.push(room);
//   });
//   /* eslint no-console: 0*/
//   console.log('Received Balls feed:', rooms);
//   store.rooms = rooms;
// });


// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       if (authResult) {
//         store.currentUser = user;
//       }
//       return true;
//     },
//     // uiShown: function() {
//     //   // The widget is rendered.
//     //   // Hide the loader.
//     //   document.getElementById('loader').style.display = 'none';
//     // }
//   },
//   signInFlow: 'popup',
//   signInSuccessUrl: '/create',
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
// };

// ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.currentUser = user;
  } else {
    // Sign in failed
  }
});