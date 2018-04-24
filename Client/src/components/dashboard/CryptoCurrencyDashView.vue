<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-body p-1 m-1">
        <div class="row mx-0">
          <div class="col-auto px-1 mw-100">
            <span class="badge badge-pill badge-primary px-2">
              <span class="">{{currencyValue.symbol}}</span>
            </span>
            <span class="h3 mb-1">
              {{currencyValue.name}}
            </span>
          </div>
          <div class="col-auto px-1 ml-auto">
            <div class="h3 mb-1"> ${{currencyValue.price_usd}} </div>
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
export default {
  name: 'CryptoCurrencyDashView',
  props: [ 'currencyValue' ]
};
</script>

<style>
</style>
