<template>
  <div class="container">
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="box">
          <EstimateForm v-model="currentTicket" v-if="hasLoaded" v-on:refined="updateTickets"></EstimateForm>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <p class="title is-4">{{ roomName }}</p>
          <p class="subtitle is-6">Admin: {{ admin}}</p>
          <ul class="list">
            <li
              class="list-item"
              v-for="item in list"
              v-bind:key="item.key"
            >
            <span v-if="currentTicket.key == item.key">(X)</span>
            
              {{ item.name}} - {{item.storyPoints}} | {{item.timeEstimate}}
            </li>
          </ul>
          <button class="button is-success">Add</button>
        </div>
      </div>
    </div>
    <TicketPopup v-on:newTickets="list = $event"></TicketPopup>
  </div>
</template>

<script>
// import EstimateForm from "./EstimateForm";
// import CardSelector from "./CardSelector";
import TicketPopup from "./TicketPopup";
import { store } from "../store.js";

export default {
  data() {
    return {
      list: [],
      currentTicket: { name: "notLoaded" },
      listPointer: null,
      name: "not loaded",
      roomName: this.$route.params.id,
      admin: "Parth",
      storyPoints: "",
      timeEstimate: "",
      hasLoaded: false
    };
  },
  components: {
    // CardSelector,
    TicketPopup,
    EstimateForm: () => import("./EstimateForm")
  },
  methods: {
    saveEstimations() {
      var ticket = {
        name: this.name,
        storyPoints: this.storyPoints,
        timeEstimate: this.timeEstimate
      };
      this.list.push(ticket);
      /* eslint no-console: 0*/
      console.log(this.list);
      // console.log(store.get(.));
    },
    async getRoomDetails() {
      const data = await store.get(this.roomName);
      /* eslint no-console: 0*/
      console.log("Got room details");
      this.admin = data.admin;
      this.list = data.tickets;
      this.roomName = data.name;
      this.listPointer = 0;
      this.currentTicket = this.list[this.listPointer];
    },
    updateTickets() {
      if (this.hasLoaded) {
        store.updateTickets(this.roomName, this.list);
        this.currentTicket = this.list[this.currentTicket.key+1];
      }
    }
  },
  created() {
    this.getRoomDetails();
    this.hasLoaded = true;
  },
};
</script>

<style scoped>
.container {
  padding-top: 2rem;
  text-align: center;
}
</style>