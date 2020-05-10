<template>
  <transition name="modal">
    <div v-if="visible" class="modal is-active">
      <div class="modal-background" @click.prevent="$emit('closeModal', false)"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Share!</h1>
          <div class="field has-addons has-addons-centered">
            <div class="control is-expanded">
              <input
                class="input"
                id="input"
                type="text"
                :value="url"
              />
            </div>
            <div class="control">
              <a class="button is-info" @click.prevent="copyToClipboard">Copy</a>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click.prevent="$emit('closeModal', false)"
      ></button>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["visible"],
  methods: {
    copyToClipboard: function() {
      var copyText = document.querySelector("#input");
      copyText.select();
      document.execCommand("copy");
      this.$emit("closeModal", false);
    }
  },
  computed: {
    url() {
      return window.location.href;
    }
  }
};
</script>

<style scoped>
.box {
  text-align: center;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>