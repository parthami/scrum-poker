<template>
  <div class="section">
    <h1 class="subtitle is-3">{{ title }}</h1>
    <div class="field">
      <div class="columns is-desktop is-multiline is-centered">
        <p class="column is-1" v-for="cardValue in cardValues" v-bind:key="cardValue">
          <button @click.prevent="cardSelected(cardValue)" :class="[buttonClass, {'is-link': value == cardValue}]">{{cardValue}}</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
  data() {
    return {
      buttonClass: 'button',
      cardValues: ["?", "0", "1", "2", "3", "5", "8", "13"]
    };
  },
  methods: {
    cardSelected(cardValue) {
      this.$emit("input", cardValue);
    }
  }
};
</script>

<style>
</style>