import Vue from 'vue';
import Vuex from 'vuex';
import CurrencyValuesStore from './modules/CurrencyValuesStore';
import portfoliosStore from './modules/PortfoliosStore';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    modules: {
      currencyValues: CurrencyValuesStore,
      portfolios: portfoliosStore
    },
    strict: true
  }
);
