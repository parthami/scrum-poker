<template>
  <div class="columns is-desktop is-vcentered">
    <div class="column is-half" style="padding: 0px 1rem 0 1rem;">
      <video v-if="webm" width="auto" height="auto" autoplay="true" loop="true" preload="auto">
        <source :src="getSrc('webm')" type="video/webm" />
        <p>{{ '../assets/' + name +'.webm' }}</p>
      </video>
      <img v-if="png" :src="getSrc('png')" style="border: 1px solid lightgrey;"/>
    </div>
    <div class="column is-half" style="text-align:center">
      <p class="title features">{{title}}</p>
      <p>{{blurb}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "blurb", "name", "webm", "png"],
  methods: {
    getSrc(type) {
      return require("@/assets/" + this.name + "." + type);
    }
  }
};
</script>

<style>
</style>