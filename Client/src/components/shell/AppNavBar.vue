<template>
  <div id="appNavBar">
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">
        <i class="fa d-inline fa-dollar-sign"></i>
        <b> Crypto-Dash</b>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/dashboard" :class="{ active: (routePath.startsWith('/dashboard')) }"><i class="fa d-inline fa-lg fa-dollar-sign"></i> Dashboard</b-nav-item>
          <b-nav-item to="/portfolios" :class="{ active: (routePath.startsWith('/portfolios')) }"><i class="fa d-inline fa-lg fa-chart-line"></i> Portfolios</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'AppNavBar',
  computed: {
    routePath () {
      return this.$store.state.route.path;
    }
  }
};
</script>

<style>
</style>
