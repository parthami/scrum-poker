import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import './../node_modules/bulma/css/bulma.css';
import { store } from './store';

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
