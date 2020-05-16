<template>
    <div class="container">
      <div class="field">
        <label class="label">Room name</label>
        <div class="control">
          <input class="input" type="text" placeholder="e.g. Platform Team" v-model="name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Initial ticket list</label>
        <input class="input" type="text" placeholder="..." v-model="rawTickets" />
      </div>
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" />
            Lock room?
          </label>
        </div>
      </div>

      <div class="field">
        <div class="control has-text-centered">
          <button class="button is-success is-outlined" @click="createRoom()">Start!</button>
        </div>
      </div>
    </div>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      name: "",
      rawTickets: null
    };
  },
  methods: {
    createRoom() {
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

      store.createRoom(this.name, tickets);

      this.$router.push("room/" + this.name);
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 4rem;
}
</style>