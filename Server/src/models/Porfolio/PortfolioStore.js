import crypto from 'crypto';
import debug from 'debug';
import { Portfolio } from './Portfolio';

const debugLogger = debug('debug:PortfolioStore');

module.exports.PortfolioStore = class PortfolioStore {

  constructor() {
    this.portfolios = {};
  }

  getAllPortfolios () {
    return Promise.resolve({...this.portfolios});
  }

  getPortfolio (portfolioId) {
    const value = (portfolioId != null) ? this.portfolios[portfolioId] : undefined;
    return Promise.resolve(value);
  }

  setPortfolio (value) {
    let setValue = undefined;
    if ((value != null) && (value instanceof Portfolio)) {
      this.portfolios[value.id] = value;
      setValue = this.portfolios[value.id];
    }
    debugLogger(`setPortfolio for Portfolio ${(setValue !== undefined)?setValue.id:undefined}`, setValue);
    return Promise.resolve(setValue);
  }

  async deletePortfolio (portfolioId) {
    const value = await this.getPortfolio(portfolioId);
    delete this.portfolios[portfolioId];
    debugLogger(`setPortfolio for Portfolio ${portfolioId}`, value);
    return Promise.resolve(value);
  }

  generatePortfolioId () {
    let portfolioId;
    do {
      portfolioId = crypto.randomBytes(16).toString('hex');
    } while (this.portfolios[portfolioId] !== undefined);
    return portfolioId;
  }

  generatePortfolioTransactionId (portfolio) {
    let transactionId;
    let transactions;
    do {
      transactionId = `${portfolio.id}.${crypto.randomBytes(16).toString('hex')}`;
      transactions = portfolio.transactions.filter(
        (value) => {
          return (value.id === transactionId);
        }
      );
    } while (transactions.length > 0);
    return transactionId;
  }
};
