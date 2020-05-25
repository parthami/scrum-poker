<template>
<body>
  <section>
    <div class="container has-text-centered">
      <h1>Visited Rooms</h1>
    </div>
    <section>
      <transition-group
        name="staggered-fade"
        :css="false"
        tag="div"
        class="container"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
      >
        <div
          v-for="([roomName, date], index) in list"
          class="list"
          :key="roomName"
          :data-index="index"
        >
          <div class="list-item">
            <div class="columns">
              <router-link class="column is-four-fifths" :to="'room/' + roomName">
                <a>{{ roomName }}</a>
              </router-link>
              <div class="column">Visited {{ date | turnIntoDate }}</div>
            </div>
          </div>
        </div>
      </transition-group>
    </section>
  </section>
</body>
</template>

<script>
/* eslint-disable no-console*/
import { store } from "../store.js";
import * as timeago from "timeago.js";
import * as Velocity from "velocity-animate";

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async loadList() {
      const data = await store.getVisitedRooms();
      this.list = Object.entries(data.rooms).sort((a, b) => b[1] - a[1]);
    },
    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150;
      console.log(delay);
      setTimeout(function() {
        Velocity(el, { opacity: 1 }, { complete: done });
      }, delay);
    }
  },
  filters: {
    turnIntoDate(seconds) {
      1500;
      return timeago.format(seconds);
    }
  },
  created() {
    this.loadList();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap");

h1 {
  font-family: "Oswald", sans-serif;
  font-size: 3rem;
}

.time {
  text-align: right;
}

.list:not(:last-child) {
  margin-bottom: 0;
}
</style>