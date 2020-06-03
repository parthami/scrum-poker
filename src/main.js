import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import './../node_modules/bulma/css/bulma.css';
import { store } from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCheckCircle, faHourglassHalf );
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    store.getFirebase().auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next({ name: 'signInUp', query: {room: to.params.id }});
      }
    });
  }

  next();
});


Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
