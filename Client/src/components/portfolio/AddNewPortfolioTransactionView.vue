<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-body p-1 m-1">
        <div v-if="!adding" class="text-center">
          <div class="btn btn-primary" v-on:click="showEditor">
            Add New Portfolio Transaction
          </div>
        </div>
        <div v-else>
          <div class="form-group row">
            <label for="transaction-type-input" class="col-2 col-form-label">Type</label>
            <div class="col-auto">
              <select class="form-control" id="transaction-type-input" v-model="transactionType">
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="transaction-currency-input" class="col-2 col-form-label">Stock</label>
            <div class="col-auto">
              <select class="form-control" id="transaction-currency-input" v-model="cryptoCurrencyId">
                <option disabled value="">Please select</option>
                <option v-for="option in currencyValuesAsArray" v-bind:value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="transaction-units-input" class="col-2 col-form-label">Units</label>
            <div class="col-auto">
              <input class="form-control" type="number" min="0" step="1" v-model.number="numberOfUnits" id="transaction-units-input">
            </div>
          </div>
          <div class="form-group row">
            <label for="transaction-value-input" class="col-2 col-form-label">Value</label>
            <div class="col-auto">
              <input class="form-control" type="number" min="0" step="0.01" v-model.number="transactionValue" id="transaction-value-input">
            </div>
          </div>
          <div class="form-group row">
            <label for="transaction-cost-input" class="col-2 col-form-label">Cost</label>
            <div class="col-auto">
              <input class="form-control" type="number" min="0" step="0.01" v-model.number="transactionCost" id="transaction-cost-input">
            </div>
          </div>
          <div class="form-group row">
            <label for="transaction-date-input" class="col-2 col-form-label">Date</label>
            <div class="col-auto">
              <input class="form-control" type="date" v-model="transactionDate" id="transaction-date-input">
            </div>
          </div>
          <div class="row mx-0">
            <div class="col-auto px-1">
              <div class="btn btn-primary" v-on:click="hideEditor">
                Cancel
              </div>
            </div>
            <div class="col-auto px-1 ml-auto">
              <div class="btn btn-primary" v-on:click="submitRequest" :disabled="(action!=null)">
                 <span v-if="(action==null)">Add</span>
                 <span v-else>Sending...</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-0" v-if="(message!=null)">
          <div class="col-12 px-1">
            <div class="alert" :class="{ 'alert-success': message.status === 'SUCCESS', 'alert-warning': message.status === 'WARN', 'alert-danger': message.status === 'ERROR' }">
              {{message.message}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNewPortfolioTransactionView',
  props: [ 'portfolioId' ],
  data: function () {
    return {
      adding: false,
      action: undefined,
      message: null,
      transactionType: 'BUY',
      cryptoCurrencyId: null,
      numberOfUnits: 0,
      transactionValue: null,
      transactionCost: null,
      transactionDate: new Date()
    };
  },
  computed: {
    currencyValuesAsArray () {
      return this.$store.getters.currencyValuesAsArray.slice(0).sort(
        (a, b) => {
          if (a === b) return 0;
          if (a.name === b.name) return 0;
          return (a.name < b.name) ? -1 : 1;
        }
      );
    }
  },
  methods: {
    showEditor: function () {
      this.adding = true;
      this.transactionType = 'BUY';
      this.cryptoCurrencyId = null;
      this.numberOfUnits = 0;
      this.transactionValue = null;
      this.transactionCost = null;
      this.transactionDate = new Date();
      this.message = null;
    },
    hideEditor: function () {
      this.adding = false;
      this.message = null;
    },
    submitRequest: function () {
      if (this.action != null) return; // ignore duplicate requests

      let inputValid = true;
      if ((this.transactionType !== 'BUY') && (this.transactionType !== 'SELL')) {
        inputValid = false;
        this.message = {
          status: 'WARN',
          message: 'Please select the transaction type...'
        };
        return;
      }
      if ((this.cryptoCurrencyId == null) || ((this.cryptoCurrencyId != null) && (this.$store.state.currencyValues.currencyValues[this.cryptoCurrencyId] == null))) {
        inputValid = false;
        this.message = {
          status: 'WARN',
          message: 'Please select a crypto currency...'
        };
        return;
      }
      if ((this.numberOfUnits == null) || ((this.numberOfUnits != null) && (this.numberOfUnits <= 0))) {
        inputValid = false;
        this.message = {
          status: 'WARN',
          message: 'Please select the number of units traded...'
        };
        return;
      }
      if ((this.transactionValue != null) && (this.transactionValue < 0)) {
        inputValid = (this.transactionValue == null);
        if (!inputValid) {
          this.message = {
            status: 'WARN',
            message: 'Please enter a valid transaction value...'
          };
          return;
        }
      }
      if ((this.transactionCost != null) && (this.transactionCost < 0)) {
        inputValid = (this.transactionCost == null);
        if (!inputValid) {
          this.message = {
            status: 'WARN',
            message: 'Please enter a valid transaction cost...'
          };
          return;
        }
      }
      if ((this.transactionDate == null) || ((this.transactionDate != null) && (this.transactionDate.value < new Date().value))) {
        inputValid = false;
        this.message = {
          status: 'WARN',
          message: 'Please select a valid date for the transaction...'
        };
        return;
      }

      if (inputValid) {
        const currency = this.$store.state.currencyValues.currencyValues[this.cryptoCurrencyId];
        if (this.transactionValue == null) {
          this.transactionValue = currency.price_usd * this.numberOfUnits;
        }
        if (this.transactionCost == null) {
          this.transactionCost = currency.price_usd * this.numberOfUnits;
        }

        this.message = null; // Hide existing message first
        const action = this.$store.dispatch('addNewPortfolioTransaction',
          {
            portfolioId: `${this.portfolioId}`,
            transactionType: `${this.transactionType}`,
            cryptoCurrencyId: `${this.cryptoCurrencyId}`,
            numberOfUnits: (this.numberOfUnits + 0),
            transactionValue: (this.transactionValue || 0) + 0,
            transactionCost: (this.transactionCost || 0) + 0,
            transactionDate: new Date(this.transactionDate)
          }
        ).then(
          (value) => {
            if (this.action === action) this.action = null;
            this.message = {
              status: 'SUCCESS',
              message: `Successfully added portfolio transaction`
            };
            this.adding = false;
          }
        ).catch(
          (error) => {
            if (this.action === action) this.action = null;
            this.message = {
              status: 'ERROR',
              message: `Failed to add portfolio transaction because ${error}`
            };
          }
        );
        this.action = action;
      }
    }
  }
};
</script>

<style>
</style>
