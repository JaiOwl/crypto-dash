import { Router } from 'express';
import packageJson from '../../package.json';

module.exports.ApiRoutes = class ApiRoutes {

  constructor () {
    this.routes = Router();

    /**
     * GET API Version
     */
    this.routes.get('/version', (req, res) => {
      res.status(200);
      res.json({ service: `${packageJson.name}`, version: `${packageJson.version}` });
    });
  }

  get router () {
    return this.routes;
  }
}

