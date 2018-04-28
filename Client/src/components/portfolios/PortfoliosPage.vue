<template>
  <div>
    <div class="py-2 px-2">
      <div class="container-fluid">
        <transition-group name="dash-list" tag="div" class="row">
          <div class="col-sm-12 col-xl-4 col-lg-6 col-md-6 p-0 m-0" v-for="item in portfoliosAsArray" :key="item.id">
            <PortfolioListView :portfolio="item">
            </PortfolioListView>
          </div>
          <div class="col-sm-12 col-xl-4 col-lg-6 col-md-6 p-0 m-0" :key="'addNewPortfolio'">
            <AddNewPortfolioView>
            </AddNewPortfolioView>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioListView from './PortfolioListView.vue';
import AddNewPortfolioView from './AddNewPortfolioView.vue';

export default {
  name: 'Portfolios',
  components: {
    'PortfolioListView': PortfolioListView,
    'AddNewPortfolioView': AddNewPortfolioView
  },
  computed: {
    portfoliosAsArray () {
      return this.$store.getters.portfoliosAsArray.slice(0).sort(
        (a, b) => {
          if (a === b) return 0;
          if (a.name === b.name) return 0;
          return (a.name < b.name) ? -1 : 1;
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.portfolio-list-move {
  transition: transform 1s;
}
.portfolio-list-enter-active, .portfolio-list-leave-active {
  transition: opacity .5s;
}
.portfolio-list-enter, .portfolio-list-leave-to {
  opacity: 0;
}
</style>
