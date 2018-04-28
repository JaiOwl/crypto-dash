<template>
  <div>
    <div class="py-2 px-2">
      <div class="container-fluid">
        <transition-group name="dash-list" tag="div" class="row">
          <div class="col-sm-12 col-xl-4 col-lg-6 col-md-6 p-0 m-0" v-for="item in currencyValuesAsArray" :key="item.id">
            <CryptoCurrencyDashView :currencyValue="item">
            </CryptoCurrencyDashView>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoCurrencyDashView from './CryptoCurrencyDashView.vue';

export default {
  name: 'Dashboard',
  components: {
    'CryptoCurrencyDashView': CryptoCurrencyDashView
  },
  computed: {
    currencyValuesAsArray () {
      return this.$store.getters.currencyValuesAsArray.slice(0).sort(
        (a, b) => {
          if (a === b) return 0;
          if (a.price_usd === b.price_usd) return 0;
          return (a.price_usd < b.price_usd) ? 1 : -1; // Reverse sort
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dash-list-move {
  transition: transform 1s;
}
.dash-list-enter-active, .dash-list-leave-active {
  transition: opacity .5s;
}
.dash-list-enter, .dash-list-leave-to {
  opacity: 0;
}
</style>
