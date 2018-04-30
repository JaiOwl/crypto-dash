<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-body p-1 m-1">
        <div class="row mx-0">
          <div class="col-auto px-1 mw-100">
            <div class="h3 mb-1">
              {{currencyValue.name}}
            </div>
          </div>
          <div class="col-auto px-1 ml-auto">
            <div class="badge badge-pill badge-primary px-2">
              <span class="h4 mb-0">{{numberOfUnits}}</span> {{currencyValue.symbol}}
            </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col">
            <div v-if="portfolioTransaction.transactionType === 'BUY'">
              <span class="text-info">
                <i class="fa d-inline fa-plus"></i> BUY
              </span>
            </div>
            <div v-if="portfolioTransaction.transactionType === 'SELL'">
              <span class="text-warning">
                <i class="fa d-inline fa-minus"></i> SELL
              </span>
            </div>
          </div>
          <div class="col px-1">
            <div class="h4 mb-0 text-right"> Value </div>
            <div class="h4 mb-0 text-right"> Cost </div>
          </div>
          <div class="col-auto px-1">
            <div class="h4 mb-0 text-right"> {{transactionValue}} </div>
            <div class="h4 mb-0 text-right"> {{transactionCost}} </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-auto px-1">
            <span class="small">
              {{portfolioTransaction.transactionDate}}
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
  name: 'PortfolioTransactionView',
  props: [ 'portfolioTransaction' ],
  computed: {
    currencyValue: function () {
      return this.$store.state.currencyValues.currencyValues[this.portfolioTransaction.cryptoCurrencyId];
    },
    numberOfUnits: function () {
      return (this.portfolioTransaction.transactionType === 'BUY') ? `+${this.portfolioTransaction.numberOfUnits}` : `-${this.portfolioTransaction.numberOfUnits}`;
    },
    transactionValue: function () {
      return currencyToStr('$', this.portfolioTransaction.transactionValue);
    },
    transactionCost: function () {
      return currencyToStr('$', this.portfolioTransaction.transactionCost);
    }
  }
};
</script>

<style>
</style>
