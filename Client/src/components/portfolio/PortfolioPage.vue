<template>
  <div>
    <div class="row mx-0">
        <div class="col-sm-12 col-xl-4 col-lg-6 col-md-12 p-0 m-0">
          <!-- Summary -->
          <PortfolioSummaryView :portfolio="portfolio">
          </PortfolioSummaryView>
        </div>
        <div class="col-sm-12 col-xl-4 col-lg-6 col-md-12 p-0 m-0">
          <div class="p-1">
            <div class="card bg-light">
              <div class="card-header p-1 m-1">
                <div class="row mx-0">
                  <div class="col">
                    <div class="h2">
                      <i class="fa d-inline far fa-book"></i> Investments </div>
                  </div>
                  <div class="col-auto px-1">
                    <span class="badge badge-pill badge-primary">
                      <div class="h3 mb-0"> {{portfolioInventoryAsArray.length}}</div>
                    </span>
                  </div>
                </div>
              </div>
              <div class="card-body p-1 m-1">
                <transition-group name="dash-list" tag="div" class="row mx-0">
                  <div class="col-12 p-0 m-0 mb-1" v-for="item in portfolioInventoryAsArray" :key="item.cryptoCurrencyId">
                    <PortfolioCurrencyInventoryView :currencyId="item.cryptoCurrencyId" :numberOfUnits="item.numberOfUnits" :initialValue="item.initialValue">
                    </PortfolioCurrencyInventoryView>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-xl-4 col-lg-6 col-md-12 p-0 m-0">
          <div class="p-1">
            <div class="card bg-light">
              <div class="card-header p-1 m-1">
                <div class="row mx-0">
                  <div class="col">
                    <div class="h2">
                      <i class="fa d-inline far fa-history"></i> Transactions </div>
                  </div>
                  <div class="col-auto px-1">
                    <span class="badge badge-pill badge-primary">
                      <div class="h3 mb-0"> {{portfolio.transactions.length}}</div>
                    </span>
                  </div>
                </div>
              </div>
              <div class="card-body p-1 m-1">
                <transition-group name="dash-list" tag="div" class="row mx-0">
                  <div class="col-12 p-0 m-0 mb-1" :key="'AddNewPortfolioTransactionView'">
                    <AddNewPortfolioTransactionView :portfolioId="portfolioId">
                    </AddNewPortfolioTransactionView>
                  </div>
                  <div class="col-12 p-0 m-0 mb-1" v-for="item in portfolioTransactions" :key="item.id">
                    <PortfolioTransactionView :portfolioTransaction="item">
                    </PortfolioTransactionView>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import PortfolioSummaryView from './PortfolioSummaryView.vue';
import PortfolioCurrencyInventoryView from './PortfolioCurrencyInventoryView.vue';
import PortfolioTransactionView from './PortfolioTransactionView';
import AddNewPortfolioTransactionView from './AddNewPortfolioTransactionView';

export default {
  name: 'Portfolio',
  props: [ 'portfolioId' ],
  components: {
    'PortfolioSummaryView': PortfolioSummaryView,
    'PortfolioCurrencyInventoryView': PortfolioCurrencyInventoryView,
    'PortfolioTransactionView': PortfolioTransactionView,
    'AddNewPortfolioTransactionView': AddNewPortfolioTransactionView
  },
  computed: {
    portfolio: function () {
      return this.$store.state.portfolios.portfolios[this.portfolioId];
    },
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
          let bCurrency = this.$store.state.currencyValues.currencyValues[a.cryptoCurrencyId];
          let aValue = 0;
          let bValue = 0;

          if (aCurrency !== undefined) aValue = a.numberOfUnits * aCurrency.price_usd;
          if (bCurrency !== undefined) bValue = b.numberOfUnits * bCurrency.price_usd;

          if (aValue === bValue) return 0;
          return (aValue < bValue) ? -1 : 1; // Reverse order
        }
      );
    },
    portfolioTransactions: function () {
      let transactions = [];

      if (this.portfolio !== undefined) {
        transactions = [...this.portfolio.transactions];
      }

      return transactions.sort(
        (a, b) => {
          if (a.transactionDate.value === b.transactionDate.value) return 0;
          return (a.transactionDate.value < b.transactionDate.value) ? -1 : 1; // reverse order - recent top
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
