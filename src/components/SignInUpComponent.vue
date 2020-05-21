<template>
  <section class="section">
    <div class="columns is-gapless">
      <div class="column has-text-centered left">
        <div id="firebaseui-auth-container"></div>
      </div>
      <div class="column has-text-centered is-centered right">
        <div class="welcome" v-if="room == null">
          <h1 class="has-text-white">Welcome!</h1>
        </div>
        <div v-else class="text">
          <h1 class="shift-left has-text-white">Trying to join</h1>
          <h1 class="has-text-white">the {{ room }} room?</h1>
          <h1 class="shift-right has-text-white">Sign up!</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from "../store.js";

export default {
  props: ["room"],
  mounted() {
    store.startFirebaseUi();

    store.getFirebase().auth().onAuthStateChanged((user) =>  {
      /* eslint-disable no-console*/
      console.log('state change');
      if(user) {
        if(this.room) {
          /* eslint-disable no-console*/
          console.log('had room redirect');
          this.$router.push({name: 'room', params: {id: this.room}});
        } else {
          /* eslint-disable no-console*/
          // console.log('create a room redirect');
          this.$router.push({ name: 'create'});
        }
      }
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,200&display=swap");
.section {
  padding: 1.5rem 0rem 0rem;
}

.columns.is-gapless {
  min-height: 91vh;
  /* margin-left: 5rem; */
  /* margin-right: 5rem; */
  /* background-color: red; */
}

h1 {
  font-family: "Raleway", sans-serif;
  font-size: 6rem;
}

#firebaseui-auth-container {
  padding-top: 30vh;
}


.welcome {
  padding-top: 35vh;
}

.text {
  padding-top: 19vh;
}

.shift-left {
  padding-right: 5rem;
}

.shift-right {
  padding-left: 15rem;
}

.right {
  background-color: #00d1b2;
}
</style>