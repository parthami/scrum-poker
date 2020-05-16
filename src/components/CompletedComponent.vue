<template>
  <div key="2">
    <br />
    <br />
    <div id="circle"></div>
    <br />
    <h1>You have refined all the tickets in the list, any tickets will be appear here when you come back!</h1>
    <br />
    <br />
  </div>
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

h1 {
  margin: 5em;
}

#circle {
  width: 200px;
  height: 200px;
  background-color: #48c774;
  border-radius: 50%;
  display: inline-flex;
}

#circle:before {
  content: "";
  position: relative;
  width: 15px;
  height: 90px;
  background-color: #ffffff;
  left: 109px;
  top: 55px;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

#circle:after {
  content: "";
  position: relative;
  width: 15px;
  height: 30px;
  background-color: #ffffff;
  left: 52px;
  top: 96px;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#circle {
  animation: pulse 0.5s ease-out;
}

@keyframes pulse {
  0% {
    background-color: rgba(0, 0, 0, 0);
    transform: scale(0);
  }

  80% {
    transform: scale(1.1);
  }
}
</style>