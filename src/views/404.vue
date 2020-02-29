<template>
  <div class="not-found">
    <div class="pic-404">
      <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="">
    </div>
    <div class="not-exist">
      <span>页面不存在</span>
      <span>你可以尝试
        <a class="link" @click="$router.go(-1)">返回上一页</a>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  // 引入装饰器
  import { Component, Vue } from 'vue-property-decorator' 

  @Component({
    components: {}
  })

  export default class NotFound extends Vue {};
</script>

<style lang="scss" scoped>
.not-found {
  height: 100%;
  display: flex;
  .pic-404 {
    text-align: center;
    width: 60%;
    padding: 50px;
    &__parent {
      width: 600px;
    }
  }
  .not-exist {
    padding: 150px 0;
    overflow: hidden;
    span {
      display: block;
      line-height: 60px;
      font-size: 18px;
      color: #8b7b8b;
      .link {
        color: #5cacee;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
