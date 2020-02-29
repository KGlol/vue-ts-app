
/**
 * Sidebar应该获取router/index.ts中定义的asyncRouterMap路由
 */
<template>
  <el-scrollbar class="el-scrollbar">
    <!-- router代表是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
    <!-- default-active	当前激活菜单的 index -->
    <el-menu class="el-menu-slide" :default-active="$router.currentRoute.path" router>
      <template v-for="(one, ind) in router"
        v-if="one.show && one.children && one.children.length > 0">
        <!-- 只有一个子元素时渲染 -->
        <el-menu-item
          v-if="one.children.length==1"
          :key="one.name"
          :index="one.children[0].path">
          <i v-if="one.children[0].meta.icon" :class="one.children[0].meta.icon"></i>
          <span slot="title">{{one.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 多个子元素 -->
        <el-submenu v-else :index="one.children[0].path" :key="one.name">
          <template slot="title">
            <i v-if="one.meta.icon" :class="one.meta.icon"></i>
            <span v-if="one.meta.title" slot="title">{{one.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in one.children" :key="child.name" :index="child.path">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span slot="title" v-if="child.meta.title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
// 引入装饰器
import { Component, Vue } from "vue-property-decorator";
import { asyncRouterMap } from '../../router/index'
import { State, Getter, Mutation, Action } from 'vuex-class'

@Component({
  components: {}
})
export default class Sidebar extends Vue {
  // router为获取的结果
  @Getter('router') router: any
  
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
