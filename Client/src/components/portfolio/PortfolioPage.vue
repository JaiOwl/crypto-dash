<template>
  <div>{{pageName}} - {{portfolioId}}</div>
</template>

<script>
export default {
  name: 'Portfolio',
  props: [ 'portfolioId' ],
  data () {
    return {
      pageName: 'Portfolio Page'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
