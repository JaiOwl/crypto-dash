import { Router } from 'express';
import { Portfolio } from '../models/Porfolio/Portfolio';
import { PortfolioTransaction } from '../models/Porfolio/PortfolioTransaction';

module.exports.PortfolioApiRoutes = class PortfolioApiRoutes {

  constructor (portfolioStore) {
    this.routes = Router();
    this.portfolioStore = portfolioStore;

    /**
     * GET All Portfolios
     */
    this.routes.get('/portfolios',
      async (req, res) => {
        res.status(200);
        res.json(await this.allPortfolios);
      }
    );

    /**
     * GET Specific Portfolio
     */
    this.routes.get('/portfolio/:portfolioId',
      async (req, res, next) => {
        const value = await this.portfolioStore.getPortfolio(req.params.portfolioId);
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

    /**
     * PATCH Specific Portfolio with updated values (only suppports name)
     */
    this.routes.patch('/portfolio/:portfolioId',
      async (req, res, next) => {
        let value = await this.portfolioStore.getPortfolio(req.params.portfolioId);
        if (value !== undefined) {
          if ((req.body.name !== undefined) && (typeof(req.body.name) == 'string')) {
            const update = new Portfolio(value);
            update.name = req.body.name;
            value = this.portfolioStore.setPortfolio(update);
            // apply update
            res.status(200);
            res.json(value);
          } else {
            const err = new Error('Invalid parameters');
            err.status = 422;
            next(err);
          }
        } else {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
        }
      }
    );

    /**
     * PUT Add New Portfolio
     */
    this.routes.put('/portfolio',
      async (req, res, next) => {
        if ((req.body.name !== undefined) && (typeof(req.body.name) == 'string')) {
          const update = new Portfolio(
            {
              id: this.portfolioStore.generatePortfolioId(),
              name: req.body.name
            }
          );
          const value = this.portfolioStore.setPortfolio(update);
          // apply update
          res.status(200);
          res.json(value);
        } else {
          const err = new Error('Invalid parameters');
          err.status = 422;
          next(err);
        }
      }
    );

    /**
     * PUT Add New Portfolio Transaction
     */
    this.routes.put('/portfolio/:portfolioId/transaction',
      async (req, res, next) => {
        let portfolio = await this.portfolioStore.getPortfolio(req.params.portfolioId);
        if (portfolio !== undefined) {
          const transactionContent = {
            id:               this.portfolioStore.generatePortfolioTransactionId(portfolio),
            portfolioId:      req.params.portfolioId,
            transactionType:  req.body.transactionType || "BUY",
            cryptoCurrencyId: req.body.cryptoCurrencyId,
            numberOfUnits:    req.body.numberOfUnits,
            transactionValue: req.body.transactionValue,
            transactionCost:  req.body.transactionCost,
            transactionDate:  new Date(req.body.transactionDate)
          };
          let valid = true;
          valid &= (transactionContent.transactionType === 'BUY') || (transactionContent.transactionType === 'SELL');
          valid &= (transactionContent.cryptoCurrencyId != null) && (typeof(transactionContent.cryptoCurrencyId) == 'string');
          valid &= (transactionContent.numberOfUnits != null) && (typeof(transactionContent.numberOfUnits) == 'number');
          valid &= (transactionContent.transactionValue != null) && (typeof(transactionContent.transactionValue) == 'number');
          valid &= (transactionContent.transactionCost != null) && (typeof(transactionContent.transactionCost) == 'number');
          valid &= (transactionContent.transactionDate != null) && (transactionContent.transactionDate.toJSON() != null);
          if (valid) {
            const update = new Portfolio(portfolio);
            update.transactions.push(new PortfolioTransaction(transactionContent));
            const value = this.portfolioStore.setPortfolio(update);
            // apply update
            res.status(200);
            res.json(value);
          } else {
            const err = new Error('Invalid parameters');
            err.status = 422;
            next(err);
          }
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

  get allPortfolios () {
    return this.portfolioStore.getAllPortfolios();
  }
}

