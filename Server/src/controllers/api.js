import { Router } from 'express';
import packageJson from '../../package.json';

const routes = Router();

/**
 * GET API Version
 */
routes.get('/version', (req, res) => {
  res.status(200);
  res.json({ service: `${packageJson.name}`, version: `${packageJson.version}` });
});

export default routes;
