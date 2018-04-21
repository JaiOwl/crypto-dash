import Vue from 'vue';
import App from './App';
import router from './router';
// eslint-disable-next-line no-unused-vars
import store from './store';
import { sync } from 'vuex-router-sync';

import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
const unsync = sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  destroyed: () => {
    unsync();
  }
});
