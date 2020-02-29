<template>
  <div class="FormData">FormData</div>
</template>

<script lang="ts">
  // 引入装饰器
  import { Component, Vue } from 'vue-property-decorator' 

  @Component({
    components: {}
  })

  export default class FormData extends Vue {};
</script>

<style lang="sass" scoped>
  .FormData 
    color: blue
</style>