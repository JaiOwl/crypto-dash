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
            <div class="btn btn-secondary" v-on:click="openPortfolio"> Open </div>
          </div>
        </div>
        <div class="row mx-0">
          <!--
          <div class="col">
            <div class="d-md-none">
              <span class="badge badge-success">
                <span class="h4">+22%</span>
              </span>
            </div>
            <div class="d-none d-md-block">

            </div>
          </div>
          <div class="col-auto px-1">
            <div class="col-auto px-1 ml-auto">
              <div class="h3 mb-0 text-right"> $3,678,000.56 </div>
              <div class="h3 text-success text-right"> +$1,702,000.56 </div>
            </div>
          </div>
          -->
        </div>
        <div class="row mx-0">
          <!--
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
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioListView',
  props: [ 'portfolio' ],
  methods: {
    openPortfolio: function () {
      this.$router.push({ name: 'Portfolio', params: { portfolioId: this.portfolio.id } });
    }
  }
};
</script>

<style>
</style>
