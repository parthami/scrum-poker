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
          <div class="button is-link" @click="showShareModal = !showShareModal">Share</div>
        </div>
        <aside class="list">
          <template v-for="item in list">
            <div class="list-item is-active" v-bind:key="item.key">
              {{ item.name }}
              <!-- <div v-if="currentTicket.key == item.key" class="circle" v-bind:key="item.key"></div> -->
            </div>
            <ul class="list-item" v-for="item in item.estimates" v-bind:key="item.key">
              <li>{{item.storyPoints}} | {{item.timeEstimate}} ({{item.user}})</li>
            </ul>
          </template>
        </aside>
        <div class="box">
          <button class="button is-success">Add</button>
        </div>
      </div>
    </div>
    <TicketPopup v-on:newTickets="list = $event"></TicketPopup>
    <ShareComponent v-if="showShareModal" v-on:closeModal="showShareModal = $event"/>
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
      hasLoaded: false,
      showShareModal: false
    };
  },
  components: {
    // CardSelector,
    TicketPopup,
    ShareComponent: () => import("./ShareComponent"),
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
        this.currentTicket = this.list[this.currentTicket.key + 1];
      }
    }
  },
  created() {
    this.getRoomDetails();
    this.hasLoaded = true;
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}

.list-item.is-active {
  background-color: #567fc1;
  color: #fff;
}

aside {
  text-align: left;
}

.menu-label {
  font-size: 1em;
}

.circle {
  width: 10px;
  height: 10px;
  background: lightgreen;
  border-radius: 50%;
}
</style>