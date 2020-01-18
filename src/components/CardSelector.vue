<template>
  <div class="section">
    <h1 class="subtitle is-3">{{ title }}</h1>
    <div class="columns is-desktop is-multiline is-centered">
    <p class="column is-1" v-for="cardValue in cardValues" v-bind:key="cardValue">
        <button v-on:click="clicked(cardValue)" class="button">{{cardValue}}</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {
            cardValues: ['?', '0', '1', '2', '3', '5', '8' ,'13']
        }
    },
    methods: {
        clicked(cardValue) {
            this.$emit('input', cardValue);
        }
    }
};
</script>

<style>
</style>