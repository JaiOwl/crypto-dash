import { Router } from 'express';

module.exports.CurrenyApiRoutes = class CurrenyApiRoutes {

  constructor (currencyStore) {
    this.routes = Router();
    this.currencyStore = currencyStore;

    /**
     * GET All Currency Values
     */
    this.routes.get('/currency/values',
      async (req, res) => {
        res.status(200);
        res.json(await this.allCurrencyValues);
      }
    );

    /**
     * GET Specific Currency Value
     */
    this.routes.get('/currency/:currencyId/value',
      async (req, res, next) => {
        const value = await this.currencyStore.getCurrencyValue(req.params.currencyId);
        if (value !== undefined) {
          res.status(200);
          res.json(value);
        } else {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
        }
      }
    );
  }

  get router () {
    return this.routes;
  }

  get allCurrencyValues () {
    return this.currencyStore.getAllCurrencyValues();
  }
}

