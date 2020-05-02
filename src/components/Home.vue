<template>
  <div>
    <section class="hero is-large is-info">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-two-thirds">
              <h1 class="title">Looking to estimate some tickets?</h1>
              <h2 class="subtitle">Use Scrum Poker to quickly estimate a bunch of tickets with our easy to use UI!</h2>
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
      <span>Here's how it works!</span>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card {
  position: relative;
  float: left;
  margin-right: 10px;
  width: 150px;
  height: 220px;
  border-radius: 10px;
  background: #fff;
  -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
  box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
}

.card p {
  text-align: center;
  font: 100px/220px Georgia, Times New Roman, serif;
}

.suitdiamonds:before, .suitdiamonds:after {
  content: "♦";
  color: #4a4a4a;
}

div[class*='suit']:before {
  position: absolute;
  font-size: 35px;
  left: 5px;
  top: -5px;
}
 
div[class*='suit']:after {
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
  -webkit-transform: rotate(-10deg);
  -moz-transform: rotate(-10deg);
  -o-transform: rotate(-10deg);
  -ms-transform: rotate(-10deg);
  transform: rotate(-10deg);
}

.cards .rotate2 {
  -webkit-transform: rotate(-20deg);
  -moz-transform: rotate(-20deg);
  -o-transform: rotate(-20deg);
  -ms-transform: rotate(-20deg);
  transform: rotate(-20deg);
}
.cards .rotate3 {
  -webkit-transform: rotate(-30deg);
  -moz-transform: rotate(-30deg);
  -o-transform: rotate(-30deg);
  -ms-transform: rotate(-30deg);
  transform: rotate(-30deg);
}
</style>