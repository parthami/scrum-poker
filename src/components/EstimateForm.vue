<template>
  <div>
    <div class="field">
      <label class="title">{{ value.name }}</label>
    </div>
    <hr/>
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
      
      /* eslint no-console: 0*/
      console.log(typeof this.value.estimates);
      // if(this.value.estimations == null){
      //   this.value.estimations = [];
      // }

      this.value.estimates = this.value.estimates.concat({
        key: this.value.key,
        user: store.currentUser.uid,
        storyPoints: this.storyPoints,
        timeEstimate: this.timeEstimate
      });
      this.$emit("refined", this.value);
    }
  }
};
</script>

<style scoped>
.section {
    padding: 2rem 1.5rem;
}
</style>