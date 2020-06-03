<template>
  <aside class="list">
    <template v-for="item in this.list">
      <div
        @click="switchToTicket(item.key)"
        :class="{ hoverClick: showHover.includes(item.key)}"
        class="list-item is-active"
        :key="item.name"
      >
        <font-awesome-icon v-if="showHover.includes(item.key)" icon="hourglass-half" />
        <font-awesome-icon v-else :icon="['far', 'check-circle']" />
        {{ item.name }}
      </div>
      <transition-group name="slide-left" tag="ul" :key="'t'+item.key">
        <ul class="list-item" v-for="estimate in item.estimates" :key="item.name+''+estimate.user">
          <li>{{estimate.storyPoints}} | {{estimate.timeEstimate}} ({{estimate.user}})</li>
        </ul>
      </transition-group>
    </template>
  </aside>
</template>

<script>
export default {
  props: ["list", "remainingTickets"],
  data() {
    return {
      showHover: []
    };
  },
  methods: {
    switchToTicket(key) {
      this.$emit("switchToTicket", key);
    }
  },
  watch: {
    remainingTickets: {
      immediate: true,
      handler(prop, oldVal) {
        this.showHover = prop.map(e => e.key);
      }
    }
  }
};
</script>

<style scoped>
.list-item.is-active {
  background-color: #567fc1;
  color: #fff;
  transform: scale(1);
}

.hoverClick:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-out;
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
</style>