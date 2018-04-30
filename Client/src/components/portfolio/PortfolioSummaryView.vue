<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-header p-1 m-1">
        <div class="row mx-0">
          <div class="col">
            <div class="h2">
              <i class="fa d-inline far fa-money-bill-alt"></i> Summary
            </div>
          </div>
          <div class="col-auto px-1">
            <span class="badge badge-pill" :class="{ 'badge-success': (totalGainedPercent > 0), 'badge-danger': (totalGainedPercent < 0) }">
              <div class="h3 mb-0"> {{totalGainedPercent.toFixed(2)}}%</div>
            </span>
          </div>
        </div>
      </div>
      <div class="card-body p-1 m-1">
        <div class="row mx-0">
          <div class="col-auto">
            <div class="h3 mb-1"> Total </div>
          </div>
          <div class="col"> </div>
          <div class="col-auto px-1">
            <div class="h3 mb-1"> {{totalValueStr}} </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-auto">
            <div class="h3 mb-1"> Investment </div>
          </div>
          <div class="col"> </div>
          <div class="col-auto px-1">
            <div class="h3 mb-1"> {{amountInvestedStr}} </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-auto">
            <div class="h3 mb-1"> Gains </div>
          </div>
          <div class="col"> </div>
          <div class="col-auto px-1">
            <div class="h3 mb-1" :class="{ 'text-success': (totalGained > 0), 'text-danger': (totalGained < 0) }">
              {{totalGainedStr}}
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
  name: 'PortfolioSummaryView',
  props: [ 'portfolio', 'portfolioInventoryAsArray' ],
  computed: {
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
      if (this.amountInvested === 0) return 0;
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
