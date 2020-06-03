<template>
  <div class="container">
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="box main">
          <transition name="fade" mode="out-in">
            <template v-if="!refinedAllTickets">
              <EstimateForm v-model="currentTicket" v-if="hasLoaded" v-on:refined="updateTickets"></EstimateForm>
            </template>
            <template v-else>
              <CompletedComponent key="2"></CompletedComponent>
            </template>
          </transition>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <p class="title is-4">{{ roomName }}</p>
          <p class="subtitle is-6">Room owner: {{ admin }}</p>
          <div class="button is-link" @click="showShareModal = !showShareModal">Share</div>
        </div>
        <template v-if="!hasLoaded">
          <progress class="progress is-small is-primary" max="100">15%</progress>
        </template>
        <template v-else>
          <TicketListComponent :list="list" :remainingTickets="remainingTickets" v-on:switchToTicket="currentTicket = list[$event]"></TicketListComponent>
        </template>
        <div class="box">
          <button class="button is-success">Add</button>
        </div>
      </div>
    </div>
    <TicketPopup v-on:newTickets="list = $event"></TicketPopup>
    <ShareComponent :visible="showShareModal" v-on:closeModal="showShareModal = $event" />
  </div>
</template>

<script>
import TicketPopup from "./TicketPopup";
import TicketListComponent from "./TicketListComponent";
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
      showShareModal: false,
      toRefineList: this.remainingTickets,
    };
  },
  components: {
    TicketPopup,
    TicketListComponent,
    ShareComponent: () => import("./ShareComponent"),
    CompletedComponent: () => import("./CompletedComponent"),
    EstimateForm: () => import("./EstimateForm")
  },
  methods: {
    saveEstimations() {
      this.list.push({
        name: this.name,
        storyPoints: this.storyPoints,
        timeEstimate: this.timeEstimate
      });
    },
    async getRoomDetails() {
      const data = await store.get(this.roomName).then(data => {
        if (!data) {
          return this.$router.push("/404");
        }
        return data;
      });

      this.admin = data.admin;
      this.list = data.tickets;
      this.roomName = data.name;
      this.listPointer = 0;
      this.currentTicket = this.remainingTickets[this.listPointer];

      store.updateVisitedRooms(this.roomName);
    },
    updateTickets() {
      if (this.hasLoaded) {
        store.updateTickets(this.roomName, this.list);
        this.currentTicket = this.remainingTickets[this.listPointer];
      }
    }
  },
  created() {
    this.getRoomDetails().then(() => {
      this.hasLoaded = true;
    });
  },
  computed: {
    refinedAllTickets() {
      let estimatedTicketsCount = 0;

      for (let ticket of this.list) {
        for (let estimate of ticket.estimates) {
          if (estimate.user == store.currentUser.displayName) {
            estimatedTicketsCount++;
          }
        }
      }

      return estimatedTicketsCount == this.list.length && this.list.length > 0;
    },
    remainingTickets() {
      let filteredTickets = [];

      for (let ticket of this.list) {
        var haveIRefinedThis = false;

        for (let estimate of ticket.estimates) {
          if (estimate.user == store.currentUser.displayName) {
            haveIRefinedThis = true;
          }
        }

        if (!haveIRefinedThis) {
          filteredTickets.push(ticket);
        }
      }

      return filteredTickets;
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}

.main {
  min-height: 550px;
}
</style>