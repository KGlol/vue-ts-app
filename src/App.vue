<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'

@Component({
  components: {}
})
export default class App extends Vue{
  @Action('setUser') setUser: any

  created() {
    // 处理页面刷新vuex数据重置的问题
    const token = localStorage.tsToken
    token && this.setUser(token)
  }
}
</script>

<style lang="sass">
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  width: 100%
  height: 100%
</style>
