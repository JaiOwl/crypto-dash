import Vue from 'vue';
import Vuex from 'vuex';
import CurrencyValuesStore from './modules/CurrencyValuesStore';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    modules: {
      currencyValues: CurrencyValuesStore
    },
    strict: true
  }
);
