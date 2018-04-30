<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-body p-1 m-1">
        <div class="row mx-0">
          <div class="col-auto px-1 mw-100">
            <span class="h2 mb-1">
              <i class="fa d-inline far fa-money-bill-alt"></i> Summary
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioSummaryView',
  props: [ 'portfolio' ]
};
</script>

<style>
</style>
