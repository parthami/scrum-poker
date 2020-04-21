<template>
  <!DOCTYPE html>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Navbar />
    <router-view></router-view>
    <!-- <PokerForm></PokerForm> -->
  </div>
</template>

<script>
// import PokerForm from './components/PokerForm.vue';
import Navbar from './components/Navbar.vue';
export default {
  name: "app",
  components: {
    Navbar
    // PokerForm
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
