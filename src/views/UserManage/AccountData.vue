<template>
  <div class="account-data">
    <div class="add-box">
      <el-button @click="showDialog" type="primary">新增用户</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column label="角色" width="180">
        <!-- scope对应行的数据 scope数据同时绑定组件中对应的数据 -->
        <template slot-scope="scope">
          <el-select v-if="scope.row.edit" v-model="scope.row.role" @change="handleChange(scope.row)">
            <el-option v-for="option in options" :label="option.role" :value="option.role" :key="option.key"></el-option>
          </el-select>
          <!-- role即为tableDate中的role -->
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.username" ></el-input>
          <span v-else>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="des">

      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.username !=='admin'">
          <el-button @click="doEdit(scope.$index, scope.row)" v-if="!scope.row.edit" size="mini">编辑</el-button>
          <el-button @click="doFinish(scope.$index, scope.row)" v-else type="success"  size="mini">完成</el-button>
          <el-button @click="doDelete(scope.$index, scope.row._id)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddAccount @closeDialog="closeDialog" :dialogVisible="dialogVisible" :options="options"></AddAccount>
  </div>
</template>

<script lang="ts">
  // 引入装饰器
  import { Component, Provide, Vue } from 'vue-property-decorator' 
  import AddAccount from './AddAccount.vue'

  @Component({
    components: {AddAccount}
  })

  export default class AccountData extends Vue {
    @Provide() tableData: object = []

    @Provide() dialogVisible: boolean = false

    // select数据
    @Provide() options: any = [
      {
        key: "admin",
        role: "管理员",
        des: "Super Administrator. Have access to view all pages."
      },
      {
        key: "editor",
        role: "客服",
        des: "Normal Editor. Can see all pages except permission page"
      },
      {
        key: "visitor",
        role: "游客",
        des: "Just a visitor. Can only see the home page and the document page"
      }
    ]

    created() {
      this.loadData()
    }

    loadData() {
      (this as any).$axios('/api/users/allUsers')
        .then((res: any) => {
          // 为每一条数据设置编辑状态
          res.data.datas.forEach((one: any) => {
            // 为什么one: object时不能添加edit属性?
            // this.tableData as any便可以
            // ts中应先声明类型
            one.edit = false
          })
          this.tableData = res.data.datas
            
        })
    }

    handleChange(row: any) {
      this.options.map((option: any) => {
        if(option.role === row.role) {
          row.key = option.key
          row.des = option.des
        }
      })
    }

    showDialog() {
      this.dialogVisible = true
    }

    closeDialog() {
      this.dialogVisible = false
    }

    doEdit(index: number, row: any):void {
      console.log(row);
      row.edit = true
    }

    doFinish(index: number, row: any):void {
      row.edit = false;

      (this as any).$axios.post(`/api/users/editUser/${row._id}`, row)
        .then((res: any) => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        })
    }

    doDelete(index: number, id: string): void {
      (this as any).$axios.delete(`/api/users/deleteUser/${id}`)
        .then((res: any) => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        })
    }
  };
</script>

<style lang="scss" scoped>
.account-data {
  height: 100%;
  overflow: auto;
  .add-box {
    margin-bottom: 10px;
  }
}
</style>
