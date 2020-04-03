<template>
  <div class="container">
    <div class="field">
      <label class="label">Room name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Platform Team" v-model="name" />
      </div>
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
        <div class="control">
          <button class="button is-link" @click="createRoom()">Submit</button>
        </div>
      </div>
    </div>
</template>

<script>
import { store } from "../store.js";

export default {
    data() {
        return {
            name: ''
        };
    },
    methods: {
        createRoom() {
            store.createRoom(this.name);
            this.$router.push('room');
        }
    },
};
</script>

<style scoped>
.container {
  padding-top: 2rem;
}
</style>