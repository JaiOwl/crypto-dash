import debug from 'debug';
import * as backend from '../../services/backend';

const debugLogger = debug('debug:PortfoliosStore');
// const infoLogger = debug('info:PortfoliosStore');
const warnLogger = debug('warn:PortfoliosStore');
// const errorLogger = debug('error:PortfoliosStore');

export default {

  namespace: true,

  state: {
    portfolios: {}
  },

  mutations: {
    setPortfolio: (state, value) => {
      if (value !== undefined) {
        debugLogger(`setPortfolio`, value);
        const update = {...state.portfolios};
        update[value.id] = value;
        state.portfolios = update;
      }
    },
    removePortfolio: (state, portfolioId) => {
      if (state.portfolios[portfolioId] !== undefined) {
        const update = {...state.portfolios};
        delete update[portfolioId];
        state.portfolios = update;
      }
    }
  },

  actions: {
    setPortfolio: ({commit}, value) => {
      return commit('setPortfolio', value);
    },
    removePortfolio: ({commit}, portfolioId) => {
      return commit('removePortfolio', portfolioId);
    },
    addNewPortfolio: async ({commit}, portfolio) => {
      debugLogger('Adding New Portfolio');

      let data;
      try {
        debugLogger('Requesting Insert');
        const response = await backend.put('/api/portfolio', {...portfolio});
        if (response.status !== 200) throw new Error(`Request failed [${response.status}]`);
        data = response.data;
        debugLogger('Returned Portfolio Value');
      } catch (error) {
        warnLogger(`Failed to insert portfolio value on server => ${error.message}`, error);
        throw error;
      }
      if (data === undefined) return;

      debugLogger('Action New Portfolio Value', data);
      commit('setPortfolio', data);
    },
    updatePortfolios: async ({commit}) => {
      debugLogger('Updating Portfolio Values');

      let data;
      try {
        debugLogger('Requesting Portfolio Values');
        const response = await backend.get('/api/portfolios');
        if (response.status !== 200) throw new Error(`Request failed [${response.status}]`);
        data = response.data;
        debugLogger('Returned Portfolio Values');
      } catch (error) {
        warnLogger(`Failed to retrieve portfolio values from server => ${error.message}`, error);
        throw error;
      }
      if (data === undefined) return;

      debugLogger('Actioning Portfolio Values');
      Object.keys(data).forEach(
        (key) => {
          if (data.hasOwnProperty(key)) {
            debugLogger('Action Portfolio Value', data[key]);
            commit('setPortfolio', data[key]);
          }
        }
      );
      debugLogger('Updated Portfolio Values');
    }
  },

  getters: {
    portfoliosAsArray: (state, getters) => {
      const values = [];
      Object.keys(state.portfolios).forEach(
        (key) => {
          if (state.portfolios.hasOwnProperty(key)) {
            values.push(state.portfolios[key]);
          }
        }
      );
      return values;
    }
  }
};
