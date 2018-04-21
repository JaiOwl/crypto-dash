<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    routePath () {
      return this.$store.state.route.path;
    }
  }
};
</script>

<style>
</style>
