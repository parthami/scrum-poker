<template>
  <div>
    <section class="hero is-large is-info">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-two-thirds">
              <h1 class="title">Looking to estimate some tickets?</h1>
              <h2
                class="subtitle"
              >Try out Scrum Poker to quickly estimate tickets asynchronously with your team!</h2>
            </div>
            <div class="column is-one-third">
              <div class="cards">
                <div class="card suitdiamonds rotate3">
                  <p>3</p>
                </div>
                <div class="card suitdiamonds rotate2">
                  <p>5</p>
                </div>
                <div class="card suitdiamonds rotate1">
                  <p>8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <home-media-component
        name="room"
        png="true"
        title="Refining tickets as a team"
        blurb=""
      ></home-media-component>
      <home-media-component
        name="dashboard"
        png="true"
        title="Visited Rooms"
        blurb="A dashboard to view recently visited rooms,sorted by when you last visited them"
      ></home-media-component>
    </section>
    <div class="is-divider"></div>
    <section class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <p class="title features" style="text-align:center">~ Features used ~</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-3 is-vertical is-parent">
          <div class="tile is-child box vue">
            <p class="title">Vue Router</p>
          </div>
          <div class="tile is-child box vue">
            <p class="title">Vue Transitions</p>
          </div>
        </div>
        <div class="tile is-3 is-vertical is-parent">
          <div class="tile is-child box vue">
            <p class="title">Vuex</p>
          </div>
          <div class="tile is-child box vue is-hidden-touch">
            <p class="title"></p>
          </div>
        </div>
        <div class="tile is-3 is-vertical is-parent">
          <div class="tile is-child box firebase">
            <p class="title">Firebase Cloud Firestore</p>
          </div>
          <div class="tile is-child box firebase">
            <p class="title">Firebase UI</p>
          </div>
        </div>
        <div class="tile is-3 is-vertical is-parent">
          <div class="tile is-child box firebase">
            <p class="title">Firebase Hosting</p>
          </div>
          <div class="tile is-child box firebase is-hidden-touch">
            <p class="title"></p>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <nav class="level">
        <div class="level-item">
          <img class="logo" src="../assets/bulma.png" />
        </div>
        <div class="level-item">
          <img class="logo" src="../assets/vuejs.png" />
        </div>
        <div class="level-item">
          <img class="logo" src="../assets/firebase.png" />
        </div>
      </nav>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>scrum-poker</strong> by Parth Chandratreya
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import HomeMediaComponent from "./HomeMediaComponent.vue";
export default {
  components: {
    HomeMediaComponent
  }
};
</script>

<style scoped>
.card {
  position: relative;
  float: left;
  margin-right: 10px;
  width: 150px;
  height: 220px;
  border-radius: 10px;
  background: #fff;
  -webkit-box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
}

.card p {
  text-align: center;
  font: 100px/220px Georgia, Times New Roman, serif;
}

.suitdiamonds:before,
.suitdiamonds:after {
  content: "♦";
  color: #4a4a4a;
}

div[class*="suit"]:before {
  position: absolute;
  font-size: 35px;
  left: 5px;
  top: -5px;
}

div[class*="suit"]:after {
  position: absolute;
  font-size: 35px;
  right: 5px;
  bottom: -5px;
}

.cards {
  width: 350px;
  height: 250px;
  position: relative;
}

.cards > .card {
  position: absolute;
  top: 0;
  left: 0;
}

.cards .rotate1 {
  /* animation: rotate10 0.5s; */
  /* animation-fill-mode: forwards; */
}

.cards .rotate2 {
  /* top: 10px; */
  animation: rotate10 1s;
  transform-origin: bottom left;
  animation-fill-mode: forwards;
}
.cards .rotate3 {
  /* top: 20px; */
  animation: rotate20 1.5s;
  transform-origin: bottom left;
  animation-fill-mode: forwards;
}

@keyframes rotate10 {
  100% {
    -webkit-transform: rotate(-10deg);
    -moz-transform: rotate(-10deg);
    -o-transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }
}

@keyframes rotate20 {
  100% {
    -webkit-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    -o-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
}

@keyframes rotate30 {
  100% {
    -webkit-transform: rotate(-30deg);
    -moz-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    transform: rotate(-30deg);
  }
}

.logo {
  max-height: 200px;
  max-width: 200px;
}

.features {
  font-family: "Raleway", sans-serif;
}

.tile > .title {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}

.vue {
  background-color: antiquewhite;
}

.firebase {
  background-color: #fad7d7;
}
</style>