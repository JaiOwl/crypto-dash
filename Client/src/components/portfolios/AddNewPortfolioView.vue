<template>
  <div class="p-1">
    <div class="card bg-light">
      <div class="card-body p-1 m-1">
        <div v-if="!adding" class="text-center">
          <div class="btn btn-primary" v-on:click="showEditor">
            Add New Portfolio
          </div>
        </div>
        <div v-else>
          <div class="form-group row">
            <label for="portfolio-name-input" class="col-auto col-form-label">Name</label>
            <div class="col-auto">
              <input class="form-control" type="text" v-model="portfolioName" id="portfolio-name-input">
            </div>
          </div>
          <div class="row mx-0">
            <div class="col-auto px-1">
              <div class="btn btn-primary" v-on:click="hideEditor">
                Cancel
              </div>
            </div>
            <div class="col-auto px-1 ml-auto">
              <div class="btn btn-primary" v-on:click="submitRequest" :disabled="(action!==undefined)">
                 <span v-if="(action===undefined)">Add</span>
                 <span v-else>Sending...</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-0" v-if="(message!==undefined)">
          <div class="col-12 px-1">
            <div class="alert" :class="{ 'alert-success': message.status === 'SUCCESS', 'alert-warning': message.status === 'WARN', 'alert-danager': message.status === 'ERROR' }">
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
  name: 'AddNewPortfolioView',
  data: function () {
    return {
      adding: false,
      action: undefined,
      message: undefined,
      portfolioName: 'New Portfolio'
    };
  },
  methods: {
    showEditor: function () {
      this.adding = true;
      this.portfolioName = 'New Portfolio';
      delete this.message;
    },
    hideEditor: function () {
      this.adding = false;
      delete this.message;
    },
    submitRequest: function () {
      if (this.action !== undefined) return; // ignore duplicate requests

      if ((this.portfolioName != null) && (this.portfolioName.length > 0)) {
        delete this.message; // Hide existing message first
        const action = this.$store.dispatch('addNewPortfolio', { name: `${this.portfolioName}` })
          .then(
            (value) => {
              if (this.action === action) delete this.action;
              this.message = {
                status: 'SUCCESS',
                message: `Successfully added portfolio ${this.portfolioName}`
              };
              this.adding = false;
            }
          )
          .catch(
            (error) => {
              if (this.action === action) delete this.action;
              this.message = {
                status: 'ERROR',
                message: `Failed to add portfolio ${this.portfolioName} because ${error}`
              };
            }
          );
        this.action = action;
      } else {
        this.message = {
          status: 'WARN',
          message: 'Must have a Portfolio Name to continue...'
        };
      }
    }
  }
};
</script>

<style>
</style>
