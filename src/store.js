import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './config.js';
var firebaseui = require('firebaseui');

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
    new Room (name, tickets, store.currentUser.displayName)
  ),
  get: id => roomsCollection.doc(id).withConverter(roomConverter).get().then(doc => { return doc.exists ? doc.data() : null; }),
  updateTickets: (name, tickets) => firebase.firestore().batch()
  .update((roomsCollection.doc(name)), {tickets})
  .commit()
  .then(() => {
    console.log("updated");
  }).catch(function (error) {
    console.log(name);
    console.log(tickets);
    console.error(error);
  }),
  createVisitedRooms: () => visitedRoomsCollection.doc(store.currentUser.displayName).set({rooms: {}}),
  getVisitedRooms: () => visitedRoomsCollection.doc(store.currentUser.displayName).get().then(function (doc){
    if(doc.exists) {
      return doc.data()
    }
  }),
  updateVisitedRooms: (roomName) => visitedRoomsCollection.doc(store.currentUser.displayName).update({
    ['rooms.'+roomName]: Date.now()
  }),
  startFirebaseUi: () => ui.start('#firebaseui-auth-container', uiConfig),
  getFirebase: () => {return firebase;},
  getTicketsForRoom: id => { roomsCollection.doc(id).onSnapshot((doc) => { 
    // console.log('Someone updated the ticket list ');
    // console.log(doc.data().tickets);
    return doc.data();
  })},
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


var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      if (authResult) {
        console.log(authResult);
        // store.currentUser = user;
      }
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader. 
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    store.currentUser = user;
  } else {
    // Sign in failed
  }
});