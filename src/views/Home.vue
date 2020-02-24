<template>
  <div class="home">home</div>
</template>

<script lang="ts">
  // 引入装饰器
  import { Component, Vue } from 'vue-property-decorator' 

  @Component({
    components: {}
  })

  export default class Home extends Vue {};
</script>

<style lang="sass" scoped>
  .home 
    color: blue
</style>