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
            <div @click="signIn" class="button is-primary">
              <strong>{{ uid }}</strong>
            </div>

            <router-link :to="{name: 'create'}" class="button is-primary">
              <strong>Create Room</strong>
            </router-link>

            <router-link :to="{name: 'visited'}" class="button is-primary">
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
import { store } from "../store.js";

/* eslint-disable no-console*/

export default {
  data() {
    return {
      uid: "Sign in",
    };
  },
  methods: {
    signIn() {
      if(store.currentUser) {
        this.uid = store.currentUser.displayName;
      } else {
        this.$router.push({ name: "signInUp"});
      }
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap");
@import "~firebaseui/dist/firebaseui.css";

#logo {
  font-family: "Oswald", sans-serif;
}
</style>