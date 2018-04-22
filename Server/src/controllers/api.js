import { Router } from 'express';
import { CurrenyApiRoutes } from './CurrencyApi';
import packageJson from '../../package.json';

module.exports.ApiRoutes = class ApiRoutes {

  constructor (currencyStore) {
    this.routes = Router();
    this.currencyStore = currencyStore;
    this.currencyApi = new CurrenyApiRoutes(this.currencyStore);

    /**
     * GET API Version
     */
    this.routes.get('/version', (req, res) => {
      res.status(200);
      res.json(this.version);
    });

    // Add Currency API
    this.routes.use(this.currencyApi.router);
  }

  get router () {
    return this.routes;
  }

  get version () {
    return { service: `${packageJson.name}`, version: `${packageJson.version}` };
  }
}

