<template>
  <transition appear name="fade">
    <div class="container">
      <div class="field">
        <label class="label">Room name</label>
        <div class="control">
          <input class="input" type="text" placeholder="e.g. Platform Team" v-model="name" />
        </div>
        <p v-if="showErrorMessage" class="help is-danger">This room already exists.</p>
      </div>

      <div class="field">
        <label class="label">Initial ticket list</label>
        <input class="input" type="text" placeholder="..." v-model="rawTickets" />
      </div>

      <div class="field">
        <div class="control has-text-centered">
          <button
            :disabled="isDisabled"
            class="button is-success is-outlined"
            @click="createRoom()"
          >Start!</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      name: "",
      rawTickets: "",
      showErrorMessage: false
    };
  },
  methods: {
    createRoom() {
      this.showErrorMessage = false;
      var ticketList = this.rawTickets.toString().split(",");
      var tickets = [];

      for (let key = 0; key < ticketList.length; key++) {
        tickets.push({
          key: key,
          name: ticketList[key],
          storyPoints: "",
          timeEstimate: "",
          estimates: []
        });
      }

      store.get(this.name).then(result => {
        if (result) {
          this.showErrorMessage = true;
        } else {
          store.createRoom(this.name, tickets);
          store.createVisitedRooms();
          this.$router.push({ name: "room", params: { id: this.name } });
        }
      });
    }
  },
  computed: {
    isDisabled() {
      return this.rawTickets == "" || this.name == "";
    }
  },
  watch: {
    name() {
      if(this.showErrorMessage) {
        this.showErrorMessage = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 4rem;
}

.button {
  width: 50%;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}
</style>