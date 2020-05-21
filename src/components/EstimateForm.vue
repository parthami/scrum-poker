<template>
  <div>
    <div class="field">
      <transition name="slide-fade">
        <label class="title" :key="value.name">{{ value.name }}</label>
      </transition>
    </div>
    <hr />
    <CardSelector title="Story Points" v-model="storyPoints"></CardSelector>
    <br />
    <CardSelector title="Time Estimate" v-model="timeEstimate"></CardSelector>
    <br />
    <button @click="saveEstimations" class="button is-success" :disabled="notAllSelected">Submit</button>
  </div>
</template>

<script>
import CardSelector from "./CardSelector";
import { store } from "../store.js";

export default {
  data() {
    return {
      storyPoints: "",
      timeEstimate: "",
      selectedButtons: null,
      show: false
    };
  },
  props: ["value"],
  components: {
    CardSelector
  },
  computed: {
    notAllSelected() {
      return this.storyPoints == "" || this.timeEstimate == "";
    }
  },
  methods: {
    saveEstimations() {
      this.value.storyPoints = this.storyPoints;
      this.value.timeEstimate = this.timeEstimate;
      this.value.user = store.currentUser.displayName;

      /* eslint no-console: 0*/
      console.log(typeof this.value.estimates);
      // if(this.value.estimations == null){
      //   this.value.estimations = [];
      // }

      this.value.estimates = this.value.estimates.concat({
        key: this.value.key,
        user: store.currentUser.displayName,
        storyPoints: this.storyPoints,
        timeEstimate: this.timeEstimate
      });
      this.$emit("refined", this.value);
      this.storyPoints = "";
      this.timeEstimate = "";
    }
  }
};
</script>

<style scoped>
.section {
  padding: 2rem 1.5rem;
}

.title {
  display: inline-block;
}

.slide-fade-enter-active {
  transition: all 1s ease;
}

.slide-fade-enter, .slide-fade-leave{
  transform: translateY(-10px) !important;
  opacity: 0;
}
</style>