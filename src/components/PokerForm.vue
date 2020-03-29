<template>
  <div class="container">
    <Navbar/>
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
            <li
              class="list-item"
              v-for="item in list"
              v-bind:key="item"
            >{{ item.name}} - {{item.storyPoints}} / {{item.timeEstimate}}</li>
          </ul>
        <button class="button is-success">Add</button>
    </div>  
      </div>
    </div>
    <TicketPopup v-on:newTickets="list = $event"></TicketPopup>
  </div>
</template>

<script>
import CardSelector from "./CardSelector";
import TicketPopup from "./TicketPopup";
import Navbar from "./Navbar"

export default {
  data() {
    return {
      list: [],
      name: "",
      storyPoints: "",
      timeEstimate: "",
    };
  },
  components: {
    CardSelector,
    TicketPopup,
    Navbar,
  },
  methods: {
    saveEstimations() {
      var ticket = {
        name: this.name,
        storyPoints: this.storyPoints,
        timeEstimate: this.timeEstimate
      };
      this.list.push(ticket);
      // console.log(this.list);
    }
  }
};
</script>

<style>
</style>