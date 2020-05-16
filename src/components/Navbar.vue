<template>
  <div>
    <nav
      class="navbar is-fixed-top is-info is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item">
          <router-link tag="span" :to="{ name : 'home' }" id="logo">SCRUM POKER</router-link>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong @click="signIn()">{{ uid }}</strong>
            </a>
            <div id="firebaseui-auth-container"></div>

            <router-link to="/create" class="button is-primary">
              <strong>Create Room</strong>
            </router-link>

            <router-link to="/dashboard" class="button is-primary">
              <strong>Dashboard</strong>
            </router-link>
          </div>
        </div>
      </div>
      <div></div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { store } from "../store.js";

export default {
  data() {
    return {
      uid: "Sign in"
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
          firebase.auth().signInAnonymously();
        });
      store.createVisitedRooms();
      this.uid = store.currentUser.uid;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap");
@import "~firebaseui/dist/firebaseui.css";

#logo {
  font-family: "Oswald", sans-serif;
}
</style>