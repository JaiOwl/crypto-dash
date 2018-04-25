
module.exports.CryptoCurrencyValue = class CryptoCurrencyValue {
  constructor(
    {
      id,
      name,
      symbol,
      rank,
      price_usd,
      price_btc,
      volume_24h_usd,
      market_cap_usd,
      available_supply,
      total_supply,
      max_supply,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
      last_updated
    }) {
    this.id                 = `${id}`; // string
    this.name               = `${name}`; // string
    this.symbol             = `${symbol}`; // string
    this.rank               = rank; // number
    this.price_usd          = price_usd; // number
    this.price_btc          = price_btc; // number
    this.volume_24h_usd     = volume_24h_usd; // number
    this.market_cap_usd     = market_cap_usd; // number
    this.available_supply   = available_supply; // number
    this.total_supply       = total_supply; // number
    this.max_supply         = max_supply; // number || undefined
    this.percent_change_1h  = percent_change_1h; // number
    this.percent_change_24h = percent_change_24h; // number
    this.percent_change_7d  = percent_change_7d; // number
    this.last_updated       = new Date(last_updated);
  }
};
