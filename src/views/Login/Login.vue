<template>
  <div class="login">
    <LoginHeader>
      <el-form slot="container" ref="ruleForm" :rules="rules" :model="ruleForm" label-position="left">
        <div class="title">
          <h3>输入账号和密码</h3>
        </div>
        <el-form-item prop="username">
          <el-input type="text" placeholder="账号" auto-complete="off" v-model="ruleForm.username"><i slot="prefix" class="fa fa-user-o"></i></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="密码" auto-complete="off" v-model="ruleForm.pwd"><i slot="prefix" class="fa fa-lock"></i></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="isLogin" @click.native.prevent="handleSubmit" type="primary" class="btn">登录</el-button>  
        </el-form-item>
        <el-form-item>
          <el-checkbox class="checkbox" v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
          <el-button @click="$router.push('/password')" type="text" class="forget">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
  import { Component, Provide, Vue } from 'vue-property-decorator'
  import { State, Getter, Mutation, Action } from 'vuex-class'
  import LoginHeader from './LoginHeader.vue'

  @Component({
    components: {
      LoginHeader
    }
  })

  export default class Login extends Vue {
    // vuex存储用户信息(调用setUser)
    @Action('setUser') setUser: any 
    // 代替data() 进行组件状态管理和类型检查?
    @Provide() ruleForm: {
      username: String;
      pwd: String;
      autoLogin: Boolean;
    } = {
      username: '',
      pwd:'',
      autoLogin: true,
    }
    //element-ui表单验证规则设置
    @Provide() rules= {
      username: [{
        required: true, trigger: 'blur', message: '请输入账号'
      }],
      pwd: [{
        required: true, trigger: 'blur', message: '请输入密码'
      }],
    }
    // 按钮加载状态
    @Provide() isLogin:boolean = false

    handleSubmit():void {
      (this.$refs.ruleForm as any).validate((valid: boolean) => {
        if (valid) {
          this.isLogin = true;
          (this as any).$axios.post('/api/users/login', this.ruleForm)
          .then((res: any) => {
            this.isLogin = false
            localStorage.setItem('tsToken', res.data.token)
            // 储存用户信息到vuex(在action的setUser解析token)
            this.setUser(res.data.token)
            // 登陆成功 转跳首页
            this.$router.push('/')
          })
          .catch(() => this.isLogin = false)
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
  .title
    margin: 0 auto 40px
    color: #505458
    text-align: center
  .btn 
    width: 100%

  i 
    font-size: 14px
    margin-left: 8px

  .forget
    float: right
  .checkbox
    float: left
</style>