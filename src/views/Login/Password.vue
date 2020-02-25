<template>
  <div class="password">
    <LoginHeader>
      <el-form slot="container" label-position="left" :rules="rules" ref="ruleForm" :model="ruleForm">
        <div class="title">
          <h3>找回密码</h3>
        </div>
        <el-form-item prop="username">
          <el-input type="text" placeholder="用户名" auto-complete="off" v-model="ruleForm.username">
            <i class="fa fa-user-o" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" placeholder="邮箱" auto-complete="off" v-model="ruleForm.email">
            <i class="fa fa-envelope-o" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native.prevent="handleSubmit" :loading="isLoading" class="btn" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Provide } from 'vue-property-decorator'
  import LoginHeader from './LoginHeader.vue'
  import router from '../../router'

  @Component({
    components: {
      LoginHeader
    }
  })

  export default class Password extends Vue {
    @Provide() isLoading:Boolean = false
    @Provide() ruleForm:{
      username: String;
      email: String;
    } = {
      username: '',
      email: '',
    }
    @Provide() rules = {
      username: [{
        required: true, message: '请输入用户名', trigger: 'blur'
      }],
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确邮箱地址', trigger: 'blur,change' },
      ],
    }
    handleSubmit() {
      (this.$refs.ruleForm as any).validate((valid: Boolean) => {
        if(valid) {
          this.isLoading = true;
          (this as any).$axios
            .post('/api/users/findPwd', this.ruleForm)
            .then((res: any) => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.isLoading = false
              this.$router.push('/login')
            })
            .catch(() => {
              this.isLoading = false
            })
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
</style>