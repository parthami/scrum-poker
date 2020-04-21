<template>
  <div>
    <div class="field">
      <label class="title">{{ value.name }}</label>
    </div>
    <CardSelector title="Story Points" v-model="storyPoints"></CardSelector>
    <br />
    <CardSelector title="Time Estimate" v-model="timeEstimate"></CardSelector>
    <br />
    <button v-on:click="saveEstimations" class="button is-success">Submit</button>
  </div>
</template>

<script>
import CardSelector from "./CardSelector";
import { store } from "../store.js";

export default {
  data() {
    return {
      storyPoints: "",
      timeEstimate: ""
    };
  },
  props: ["value"],
  components: {
    CardSelector
  },
  methods: {
    saveEstimations() {
      this.value.storyPoints = this.storyPoints;
      this.value.timeEstimate = this.timeEstimate;
      this.value.user = store.currentUser.uid;
      this.$emit("refined", this.value);
    }
  }
};
</script>

<style>
</style>