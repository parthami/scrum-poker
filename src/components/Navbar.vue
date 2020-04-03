<template>
  <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <span>Scrum Poker</span>
      </a>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong @click="signIn()">{{ uid }}</strong>
          </a>
          <router-link to="/create">
            <a class="button is-primary">
              <strong>Create Room</strong>
            </a>
          </router-link>
        </div>
      </div>
    </div>
    <div></div>
  </nav>
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
      firebase.auth().signInAnonymously();
      this.uid = store.currentUser.uid;
    },
  }
};
</script>

<style>
</style>