<template>
  <div class="container">
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="box">
          <div class="field">
            <label class="title">Ticket</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-model="name" />
            </div>
          </div>
          <CardSelector title="Story Points" v-model="storyPoints"></CardSelector>
          <br />
          <CardSelector title="Time Estimate" v-model="timeEstimate"></CardSelector>
          <br />
          <button v-on:click="saveEstimations" class="button is-success">Submit</button>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <ul class="list">
          <li class="list-item" v-for="item in list" v-bind:key="item">
            {{ item[0] }} - {{item[1]}} / {{item[2]}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardSelector from "./CardSelector";

export default {
  data() {
    return {
      list: [],
      name: "",
      storyPoints: "",
      timeEstimate: ""
    };
  },
  components: {
    CardSelector
  },
  methods: {
    saveEstimations() {
      this.list.push([this.name, this.storyPoints, this.timeEstimate]);
      // console.log(this.list);
    }
  }
};
</script>

<style>
</style>