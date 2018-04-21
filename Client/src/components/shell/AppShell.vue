<template>
  <div>
    {{pageName}}

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppShell',
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
