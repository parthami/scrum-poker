<template>
  <div class="modal is-active">
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
              value="http://localhost:8080/?mode=select#/room/LOFT"
            />
          </div>
          <div class="control">
            <a :class="[buttonClass,{'is-loading' : isLoading}]" @click.prevent="copyToClipboard">{{ copyLinkText }}</a>
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
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            buttonClass: 'button is-info',
            copyLinkText: 'Copy link'
        }
    },
    methods: {
        copyToClipboard: function() {
            var copyText = document.querySelector("#input");
            copyText.select();
            document.execCommand("copy");
            this.buttonClass = 'button is-success';
            this.copyLinkText ='Copied!';
        }
    }
};
</script>

<style scoped>
.box {
  text-align: center;
}

.section {
}
</style>