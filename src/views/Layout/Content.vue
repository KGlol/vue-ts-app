<template>
  <el-container class="layout-content">
    <!-- 左菜单 -->
    <el-aside width="200px">
      <slot name="aside"></slot>
    </el-aside>
    <!-- 页面内容 -->
    <el-main>
      <!-- 主要内容 -->
      <div class="top">
        <i class="fa fa-reorder"></i>
        <el-breadcrumb class="breadcrumb" separator="/"> 
          <el-breadcrumb-item
            v-for="one in breadCrumbItems"
            :to="{path: one.path}"
            :key="one.title">{{one.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  // 引入装饰器
  import { Component, Provide, Watch, Vue } from 'vue-property-decorator' 

  @Component({
    components: {}
  })

  export default class Content extends Vue {
    @Provide() breadCrumbItems: any //面包屑数组

    // 监听$route的变化 设置面包屑
    @Watch('$route') handleRouteChange(to: any) {
      this.setBreadCrumbItems(to)
    }

    created() {
      // this.$router与this.$route不同
      /**
       * @description: this.$router与this.$route不同
       * this.$route指当前路径
       * @return: 
       */
      this.setBreadCrumbItems(this.$route)
    }

    // 设置面包屑数组
    setBreadCrumbItems(route: any) {
      // 定义根路由title
      let breadCrumbItems: any = [{ path: '/', title: '后台管理系统' }]

      // 通过matched的路由中的父子路由编辑面包屑数组
      for(const i in route.matched) {
        if(route.matched[i].meta && route.matched[i].meta.title) {
          breadCrumbItems.push({
            path: route.matched[i].path,
            title: route.matched[i].meta.title
          })
        }
      }
      this.breadCrumbItems = breadCrumbItems
    }
  }
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>