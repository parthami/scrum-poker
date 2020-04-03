<template>
  <div class="modal" v-bind:class="{'is-active': modalActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add some ticket numbers</p>
        <button v-on:click="modalActive = false" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <input class="input" type="text" placeholder="..." v-model="rawTickets" />
      </section>
      <footer class="modal-card-foot">
        <button v-on:click="convertRawtoList(rawTickets)" class="button is-success">Save changes</button>
        <button v-on:click="modalActive = false" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rawTickets: "",
      modalActive: false
    };
  },
  methods: {
    convertRawtoList(str) {
      var ticketList = str.toString().split(",");
      var tickets = [];
      for (var ticketId of ticketList) {
        // alert(ticketId);
        var ticket = { name: ticketId, storyPoints: "", timeEstimate: "" };
        tickets.push(ticket);
      }
      this.$emit("newTickets", tickets);
      this.modalActive = false;
    }
  }
};
</script>

<style>
</style>