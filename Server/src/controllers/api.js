import { Router } from 'express';
import { CurrenyApiRoutes } from './CurrencyApi';
import { PortfolioApiRoutes } from './PortfolioApi';
import packageJson from '../../package.json';

module.exports.ApiRoutes = class ApiRoutes {

  constructor (currencyStore, portfolioStore) {
    this.routes = Router();
    this.currencyStore = currencyStore;
    this.portfolioStore = portfolioStore;
    this.currencyApi = new CurrenyApiRoutes(this.currencyStore);
    this.portfolioApi = new PortfolioApiRoutes(this.portfolioStore);

    /**
     * GET API Version
     */
    this.routes.get('/version', (req, res) => {
      res.status(200);
      res.json(this.version);
    });

    // Add Currency API
    this.routes.use(this.currencyApi.router);
    // Add Portfolio API
    this.routes.use(this.portfolioApi.router);
  }

  get router () {
    return this.routes;
  }

  get version () {
    return { service: `${packageJson.name}`, version: `${packageJson.version}` };
  }
}

