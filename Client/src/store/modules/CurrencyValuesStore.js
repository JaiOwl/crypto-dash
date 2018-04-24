import debug from 'debug';
import * as backend from '../../services/backend';

debug.enable('debug:*,info:*,warn:*,error:*');

const debugLogger = debug('debug:CurrencyValuesStore');
// const infoLogger = debug('info:CurrencyValuesStore');
const warnLogger = debug('warn:CurrencyValuesStore');
// const errorLogger = debug('error:CurrencyValuesStore');

export default {

  namespace: true,

  state: {
    currencyValues: {}
  },

  mutations: {
    setCurrencyValue: (state, value) => {
      if (value !== undefined) {
        debugLogger(`setCurrencyValue`, value);
        const update = {...state.currencyValues};
        update[value.id] = value;
        state.currencyValues = update;
      }
    },
    removeCurrencyValue: (state, currencyId) => {
      if (state.currencyValues[currencyId] !== undefined) {
        const update = {...state.currencyValues};
        delete update[currencyId];
        state.currencyValues = update;
      }
    }
  },

  actions: {
    setCurrencyValue: ({commit}, value) => {
      return commit('setCurrencyValue', value);
    },
    removeCurrencyValue: ({commit}, currencyId) => {
      return commit('removeCurrencyValue', currencyId);
    },
    updateCurrencyValues: async ({commit}) => {
      debugLogger('Updating Currency Values');

      let data;
      try {
        debugLogger('Requesting Currency Values');
        const response = await backend.get('/api/currency/values');
        if (response.status !== 200) throw new Error(`Request failed [${response.status}]`);
        data = response.data;
        debugLogger('Returned Currency Values');
      } catch (error) {
        warnLogger(`Failed to retrieve curency values from server => ${error.message}`, error);
        throw error;
      }
      if (data === undefined) return;

      debugLogger('Actioning Currency Values');
      Object.keys(data).forEach(
        (key) => {
          if (data.hasOwnProperty(key)) {
            debugLogger('Action Currency Value', data[key]);
            commit('setCurrencyValue', data[key]);
          }
        }
      );
      debugLogger('Updated Currency Values');
    }
  },

  getters: {
    currencyValuesAsArray: (state, getters) => {
      const values = [];
      Object.keys(state.currencyValues).forEach(
        (key) => {
          if (state.currencyValues.hasOwnProperty(key)) {
            values.push(state.currencyValues[key]);
          }
        }
      );
      return values;
    }
  }
};
