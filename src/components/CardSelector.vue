<template>
  <div class="section">
    <h1 class="subtitle is-3">{{ title }}</h1>
    <div class="field">
      <div class="columns is-desktop is-multiline is-centered">
        <p class="column is-1" v-for="cardValue in cardValues" v-bind:key="cardValue">
          <button v-on:click="cardSelected(cardValue)" :class="[buttonClass, {'is-link': selectedButtonId == cardValue}]">{{cardValue}}</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      buttonClass: 'button',
      selectedButtonId: null,
      cardValues: ["?", "0", "1", "2", "3", "5", "8", "13"]
    };
  },
  methods: {
    cardSelected(cardValue) {
      this.selectedButtonId = cardValue;
      this.$emit("input", cardValue);
    }
  }
};
</script>

<style>
</style>