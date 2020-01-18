<template>
    <!DOCTYPE html>
  <div id="app">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <PokerForm></PokerForm>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import PokerForm from './components/PokerForm.vue'

export default {
  name: 'app',
  components: {
    PokerForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
