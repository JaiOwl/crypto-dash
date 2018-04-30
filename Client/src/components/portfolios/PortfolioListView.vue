<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-body p-1 m-1">
        <div class="row mx-0">
          <div class="col-auto px-1 mw-100">
            <i class="fa d-inline fa-chart-line"></i>
            <span class="h3 mb-1">
              {{portfolio.name}}
            </span>
          </div>
          <div class="col-auto px-1 ml-auto">
            <div class="btn btn-primary" v-on:click="openPortfolio"> Open </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col">
            <span class="badge badge-success">
              <span class="h3">{{totalGainedPercent.toFixed(2)}}%</span>
            </span>
          </div>
          <div class="col-auto px-1">
            <div class="col-auto px-1 ml-auto">
              <div class="h3 mb-0 text-right"> {{totalValueStr}} </div>
              <div class="h3 text-right" :class="{ 'text-success': (totalGained > 0), 'text-danger': (totalGained < 0) }">
                {{totalGainedStr}}
               </div>
            </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-auto px-1 ml-auto"> 7 days
            <span class="badge" :class="{ 'badge-success': (percentChange7days > 0), 'badge-danger': (percentChange7days < 0), 'badge-dark': (percentChange7days == 0) }">
              <span class="strong">{{percentChange7days.toFixed(2)}}%</span>
            </span>
          </div>
          <div class="col-auto px-1"> 24hrs
            <span class="badge" :class="{ 'badge-success': (percentChange24hrs > 0), 'badge-danger': (percentChange24hrs < 0), 'badge-dark': (percentChange24hrs == 0) }">
              {{percentChange24hrs.toFixed(2)}}%
            </span>
          </div>
          <div class="col-auto px-1"> hour
            <span class="badge" :class="{ 'badge-success': (percentChange1hr > 0), 'badge-danger': (percentChange1hr < 0), 'badge-dark': (percentChange1hr == 0) }">
              {{percentChange1hr.toFixed(2)}}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyToStr } from '../../services/currencyUtils';

export default {
  name: 'PortfolioListView',
  props: [ 'portfolio' ],
  methods: {
    openPortfolio: function () {
      this.$router.push({ name: 'Portfolio', params: { portfolioId: this.portfolio.id } });
    }
  },
  computed: {
    portfolioInventory: function () {
      const inventory = {};
      if (this.portfolio !== undefined) {
        this.portfolio.transactions.forEach(
          (value) => {
            const inventoryItem = inventory[value.cryptoCurrencyId] || {
              cryptoCurrencyId: value.cryptoCurrencyId,
              numberOfUnits: 0,
              initialValue: 0,
              initialCost: 0
            };

            if (value.transactionType === 'BUY') {
              inventoryItem.numberOfUnits += value.numberOfUnits;
              inventoryItem.initialValue += value.transactionValue;
              inventoryItem.initialCost += value.transactionCost;
            } else if (value.transactionType === 'SELL') {
              inventoryItem.numberOfUnits -= value.numberOfUnits;
              inventoryItem.initialValue -= value.transactionValue;
              inventoryItem.initialCost -= value.transactionCost;
            }

            inventory[value.cryptoCurrencyId] = inventoryItem;
          }
        );
      }
      return inventory;
    },
    portfolioInventoryAsArray: function () {
      const inventory = [];
      Object.keys(this.portfolioInventory).forEach(
        (key) => {
          if (this.portfolioInventory.hasOwnProperty(key)) {
            inventory.push(this.portfolioInventory[key]);
          }
        }
      );
      return inventory.sort(
        (a, b) => {
          let aCurrency = this.$store.state.currencyValues.currencyValues[a.cryptoCurrencyId];
          let bCurrency = this.$store.state.currencyValues.currencyValues[b.cryptoCurrencyId];
          let aValue = 0;
          let bValue = 0;

          if (aCurrency !== undefined) aValue = a.numberOfUnits * aCurrency.price_usd;
          if (bCurrency !== undefined) bValue = b.numberOfUnits * bCurrency.price_usd;

          if (aValue === bValue) return 0;
          return (aValue < bValue) ? 1 : -1; // Reverse order
        }
      );
    },
    totalValue: function () {
      let sum = 0;
      if (this.portfolioInventoryAsArray !== undefined) {
        this.portfolioInventoryAsArray.forEach(
          (item) => {
            const currency = this.$store.state.currencyValues.currencyValues[item.cryptoCurrencyId];
            if (currency !== undefined) sum += item.numberOfUnits * currency.price_usd;
          }
        );
      }
      return sum;
    },
    totalValueStr: function () {
      return currencyToStr('$', this.totalValue);
    },
    amountInvested: function () {
      let sum = 0;
      if (this.portfolioInventoryAsArray !== undefined) {
        this.portfolioInventoryAsArray.forEach(
          (item) => {
            sum += item.initialCost;
          }
        );
      }
      return sum;
    },
    amountInvestedStr: function () {
      return currencyToStr('$', this.amountInvested);
    },
    totalGained: function () {
      return (this.totalValue - this.amountInvested);
    },
    totalGainedPercent: function () {
      return (this.totalGained / this.amountInvested) * 100;
    },
    totalGainedStr: function () {
      return currencyToStr('$', this.totalGained);
    },
    percentChange7days: function () {
      if (this.totalValue === 0) return 0;
      let sum = 0;
      if (this.portfolioInventoryAsArray !== undefined) {
        this.portfolioInventoryAsArray.forEach(
          (item) => {
            const currency = this.$store.state.currencyValues.currencyValues[item.cryptoCurrencyId];
            if (currency !== undefined) {
              const value = item.numberOfUnits * currency.price_usd;
              sum += currency.percent_change_7d * (value / this.totalValue);
            }
          }
        );
      }
      return sum;
    },
    percentChange24hrs: function () {
      if (this.totalValue === 0) return 0;
      let sum = 0;
      if (this.portfolioInventoryAsArray !== undefined) {
        this.portfolioInventoryAsArray.forEach(
          (item) => {
            const currency = this.$store.state.currencyValues.currencyValues[item.cryptoCurrencyId];
            if (currency !== undefined) {
              const value = item.numberOfUnits * currency.price_usd;
              sum += currency.percent_change_24h * (value / this.totalValue);
            }
          }
        );
      }
      return sum;
    },
    percentChange1hr: function () {
      if (this.totalValue === 0) return 0;
      let sum = 0;
      if (this.portfolioInventoryAsArray !== undefined) {
        this.portfolioInventoryAsArray.forEach(
          (item) => {
            const currency = this.$store.state.currencyValues.currencyValues[item.cryptoCurrencyId];
            if (currency !== undefined) {
              const value = item.numberOfUnits * currency.price_usd;
              sum += currency.percent_change_1h * (value / this.totalValue);
            }
          }
        );
      }
      return sum;
    }
  }
};
</script>

<style>
</style>
