
<template>
  <el-dialog title="编辑课程" :visible.sync="dialogVisible" :close-on-click-model="false" :show-close="false">
    <el-form ref="ruleForm" :model="dialogData" :rules="rules"  label-width="100px" size="small" class="form-box">
      <!-- el-form-item上的prop用于标记表单单项的记号,rules中对应键值的表单验证 -->
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="dialogData.title" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程等级" prop="level">
        <el-select v-model="dialogData.level" placeholder="请选择课程等级">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名人数" prop="count">
        <el-input v-model="dialogData.count" placeholder="请输入报名人数"></el-input>
      </el-form-item>
      <el-form-item label="上线时间" prop="date">
        <el-date-picker type="date" placeholder="选择日期" v-model="dialogData.date" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="技术栈" prop="type">
        <!-- <el-input v-model="dialogData.type" placeholder="请输入课程名称"></el-input> -->
        <el-radio-group v-model="dialogData.type" prop="type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="nodejs" name="type"></el-radio>
          <el-radio label="angular" name="type"></el-radio>
          <el-radio label="flutter" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('closeDialog')" size="small">取消</el-button>
      <el-button @click="doEdit('ruleForm')" type="primary" size="small">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
  // 引入装饰器
  import { Component, Prop, Provide, Vue } from 'vue-property-decorator' 

  @Component({
    components: {}
  })

  export default class EditDialog extends Vue {
    // 属性或参数中使用!:表示强制解析(告诉ts这里一定有值),常用于vue-decorator中的@prop
    @Prop(Boolean) dialogVisible!: boolean
    @Prop(Object) dialogData!: {
      title: string,
      type: string,
      level: string,
      count: string,
      date: string,
      _id: string,
    }

    @Provide() rules:any = {
    title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
    level: [{ required: true, message: "请选择课程等级", trigger: "change" }],
    count: [{ required: true, message: "请输入报名人数", trigger: "blur" }],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择日期",
        trigger: "change"
      }
    ],
    type: [
      {
        required: true,
        message: "请选择技术栈",
        trigger: "change"
      }
    ]
  };

    doEdit(formName: any) {
      (this.$refs.ruleForm as any).validate((valid: boolean) => {
        if(valid) {
          (this as any).$axios.post(`/api/profiles/edit/${this.dialogData._id}`)
            .then((res:any) => {
              // console.log(res.data);
              this.$emit('closeDialog')
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            })
        }
      })
    }
  };
</script>

<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>
