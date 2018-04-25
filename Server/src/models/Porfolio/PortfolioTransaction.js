
module.exports.PortfolioTransaction = class PortfolioTransaction {

  constructor(
    {
      id,                // (primary key) id of transaction
      portfolioId,       // (foreign key) id of portfolio the transaction belongs too
      transactionType,   // Type of transaction "BUY" || "SELL"
      cryptoCurrencyId,  // id of cryptocurrency
      numberOfUnits,     // quantity of the cryptocurrency
      transactionValue,  // total value of the cryptocurrency at time of transaction
      transactionCost,   // total transaction cost/price
      transactionDate    // date/time of transaction
    }) {
    this.id               = `${id}`;                   // string
    this.portfolioId      = `${portfolioId}`;          // string
    this.transactionType  = `${transactionType}`;      // 'BUY' || 'SELL'
    this.cryptoCurrencyId = `${cryptoCurrencyId}`;     // string
    this.numberOfUnits    = (numberOfUnits + 0);       // number
    this.transactionValue = (transactionValue + 0);    // number
    this.transactionCost  = (transactionCost + 0);     // number
    this.transactionDate  = new Date(transactionDate); // date
  }
};
