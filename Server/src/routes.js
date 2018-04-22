import { Router } from 'express';
import packageJson from '../package.json';
import { ApiRoutes } from './controllers/api';

module.exports.Routes = class Routes {
  constructor (currencyStore) {
    this.routes = Router();
    this.apiRoutes = new ApiRoutes(currencyStore);

    /**
     * GET test home page
     */
    this.routes.get('/', (req, res) => {
      res.render('index', { title: packageJson.name });
    });

    /**
     * Pass API requests to API route handler
     */
    this.routes.use('/api', this.apiRoutes.router);
  }

  get router () {
    return this.routes;
  }
}
