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
          <aside class="list">
            <template v-for="item in list">
              <div class="list-item is-active" :key="item.name">{{ item.name }}</div>
              <transition-group name="slide-left" tag="ul" :key="'t'+item.key">
                <ul
                  class="list-item"
                  v-for="estimate in item.estimates"
                  :key="item.name+''+estimate.user"
                >
                  <li>{{estimate.storyPoints}} | {{estimate.timeEstimate}} ({{estimate.user}})</li>
                </ul>
              </transition-group>
            </template>
          </aside>
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
      this.currentTicket = this.list[this.listPointer];
      store.updateVisitedRooms(this.roomName);
    },
    updateTickets() {
      if (this.hasLoaded) {
        store.updateTickets(this.roomName, this.list);
        this.currentTicket = this.list[this.currentTicket.key + 1];
      }
    }
  },
  created() {
    this.getRoomDetails()
      .then(() => {
        this.hasLoaded = true;
        /* eslint no-console: 0*/
        // store.getTicketsForRoom(this.roomName);
        // console.log(this.list);
      });
  },
  computed: {
    refinedAllTickets() {
      let estimatedTicketsCount = 0;
      for (let ticket of this.list) {
        for (let estimate of ticket.estimates) {
          /* eslint no-console: 0*/
          console.log(estimate.user);
          console.log(store.currentUser.displayName);
          if (estimate.user == store.currentUser.displayName) {
            estimatedTicketsCount++;
          }
        }
      }
      /* eslint no-console: 0*/
      console.log(estimatedTicketsCount);
      return estimatedTicketsCount == this.list.length && this.list.length > 0;
    }
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

.main {
  min-height: 550px;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1s ease;
}

.slide-left-enter,
.slide-left-leave {
  transform: translateX(10px);
  opacity: 0;
  color: green;
}

.slide-left-move {
  transition: all 1s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>