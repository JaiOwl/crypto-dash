<template>
  <div>
    <AppNavBar></AppNavBar>
    <router-view/>
  </div>
</template>

<script>
import AppNavBar from './AppNavBar.vue';

export default {
  name: 'AppShell',
  components: {
    'AppNavBar': AppNavBar
  },
  data () {
    return {
      pageName: 'AppShell Page'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
