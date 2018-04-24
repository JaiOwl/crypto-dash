import Vue from 'vue';
import App from './App';
import router from './router';
// eslint-disable-next-line no-unused-vars
import store from './store';
import { sync } from 'vuex-router-sync';

import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/fontawesome-all.min.css';
import './assets/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
const unsync = sync(store, router);

const UPDATE_POLL_INTERVAL = 30 * 1000;
let updateInterval;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('updateCurrencyValues');
    updateInterval = setInterval(
      () => { this.$store.dispatch('updateCurrencyValues'); },
      UPDATE_POLL_INTERVAL
    );
  },
  destroyed () {
    if (updateInterval !== undefined) {
      clearInterval(updateInterval);
      updateInterval = undefined;
    }
    unsync();
  }
});
