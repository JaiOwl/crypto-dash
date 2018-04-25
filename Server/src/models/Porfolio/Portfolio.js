import { PortfolioTransaction } from "./PortfolioTransaction";

module.exports.Portfolio = class Portfolio {
  constructor(
    {
      id,
      name,
      transactions = []
    }) {
    this.id           = `${id}`; // string
    this.name         = `${name}`; // string
    this.transactions = [];
    transactions.forEach(
      (value) => {
        this.transactions.push(new PortfolioTransaction(value));
      }
    );
  }
};
