import { Router } from 'express';
import packageJson from '../package.json';
import ApiRouter from './controllers/api';

const routes = Router();

/**
 * GET test home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: packageJson.name });
});

/**
 * Pass API requests to API route handler
 */
routes.use('/api', ApiRouter);

export default routes;
