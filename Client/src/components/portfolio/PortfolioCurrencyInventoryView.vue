<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-body p-1 m-1">
        <div class="row mx-0">
          <div class="col-auto px-1 mw-100">
            <div class="h3 mb-1">
              {{currencyValue.name}}
            </div>
            <div class="badge badge-pill badge-primary px-2">
              <span class="h4 mb-0">{{numberOfUnits}}</span> {{currencyValue.symbol}}
            </div>
          </div>
          <div class="col-auto px-1 ml-auto">
            <div class="h3 mb-0 text-right"> ${{currentValue.toFixed(2)}} </div>
            <div class="h3 mb-0 text-right"
              :class="{ 'text-success': (differenceInValue > 0), 'text-danger': (differenceInValue < 0) }">
              {{differenceInValueStr}}
            </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-auto px-1 ml-auto"> 7 days
            <span class="badge" :class="{ 'badge-success': (currencyValue.percent_change_7d > 0), 'badge-danger': (currencyValue.percent_change_7d < 0), 'badge-dark': (currencyValue.percent_change_7d == 0) }">
              <span class="strong">{{currencyValue.percent_change_7d}}%</span>
            </span>
          </div>
          <div class="col-auto px-1"> 24hrs
            <span class="badge" :class="{ 'badge-success': (currencyValue.percent_change_24h > 0), 'badge-danger': (currencyValue.percent_change_24h < 0), 'badge-dark': (currencyValue.percent_change_24h == 0) }">
              {{currencyValue.percent_change_24h}}%
            </span>
          </div>
          <div class="col-auto px-1"> hour
            <span class="badge" :class="{ 'badge-success': (currencyValue.percent_change_1h > 0), 'badge-danger': (currencyValue.percent_change_1h < 0), 'badge-dark': (currencyValue.percent_change_1h == 0) }">
              {{currencyValue.percent_change_1h}}%
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
  name: 'PortfolioCurrencyInventoryView',
  props: [ 'currencyId', 'numberOfUnits', 'initialValue' ],
  computed: {
    currencyValue: function () {
      return this.$store.state.currencyValues.currencyValues[this.currencyId];
    },
    currentValue: function () {
      return (this.currencyValue.price_usd * this.numberOfUnits);
    },
    differenceInValue: function () {
      return (this.currentValue - this.initialValue);
    },
    differenceInValueStr: function () {
      return currencyToStr('$', this.differenceInValue);
    }
  }
};
</script>

<style>
</style>
