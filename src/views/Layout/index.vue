<template>
  <div class="layout">
    <!-- 头部 -->
    <LayoutHeader></LayoutHeader>
    <!-- 内容 -->
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import LayoutHeader from "./LayoutHeader.vue"

  @Component({
    components: {
      LayoutHeader
    }
  })

  export default class Layout extends Vue {
    
  }
</script>

<style lang="sass" scoped>
  .layout
    width: 100%
    heihgt: 100%
    margin: 0 auto
    background: #f5f7f9
</style>