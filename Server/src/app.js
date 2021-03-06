import express from 'express';
import path from 'path';
import logger from 'morgan-debug';
import bodyParser from 'body-parser';
import { Routes } from './routes';
import { CryptoCurrencyStore } from './models/CryptoCurrencyStore';
import { CryptoCurrencyManager } from './models/CryptoCurrencyManager';
import { CoinMarketCapApiClient } from './models/CoinMarketCapApi/CoinMarketCapApiClient';
import { PortfolioStore } from './models/Porfolio/PortfolioStore';

const {
  COIN_MARKER_API_UPDATE_INTERVAL = (60 * 1000)
} = process.env;

const {
  PUBLIC_DIR = '../public',
  VIEWS_DIR = '../views'
} = process.env;

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, VIEWS_DIR));
app.set('view engine', 'pug');

app.use(logger('debug', 'combined', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, PUBLIC_DIR), { index: 'index.html' }) );

// Routes
const currencyStore = new CryptoCurrencyStore();
const coinMarketCapApiClient = new CoinMarketCapApiClient();
const currencyManager = new CryptoCurrencyManager(
  {
    updateInterval: COIN_MARKER_API_UPDATE_INTERVAL,
    updater:        coinMarketCapApiClient,
    currencyStore:  currencyStore
  }
);
if ( app.get('env') !== 'test' ) {
  // Only instruct to poll API if not testing
  currencyManager.startUpdating(); // TODO - include stop at a later date
}
const portfolioStore = new PortfolioStore();
const routes = new Routes(currencyStore, portfolioStore);
app.use('/', routes.router );

// Default index
app.use('^(?!/api/*).*', express.static(path.join(__dirname, PUBLIC_DIR), { index: 'index.html' }) );

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
