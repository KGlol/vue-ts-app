<template>
<div class="table-data">
  <div class="search-box">
    <el-input  size="small" v-model="searchVal" placeholder="请输入课程名"></el-input>
    <el-button size="small" @click="handleSearch"  type="primary" icon="el-icon-search">搜索</el-button>
  </div>
  <el-table :data="tableData" border style="width:100%" :height="tableHeight" class="table-box">
    <el-table-column label="序号" type="index" width="60"></el-table-column>
    <!-- prop=title对应数据对象里的title字段 -->
    <el-table-column label="课程名称" prop="title"></el-table-column>
    <el-table-column label="课程等级" prop="level" width="120"></el-table-column>
    <el-table-column label="技术栈" prop="type" width="120"></el-table-column>
    <el-table-column label="报名人数" prop="count" width="120"></el-table-column>
    <el-table-column label="上线日期" prop="date" width="160"></el-table-column>
    <el-table-column label="操作" width="160">
      <!-- 获取指定行的下标index和内容row -->
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5,10,20]"
      :page-size="size"
      :total="total"
      layout="total,sizes,prev,pager,next,jumper">
    </el-pagination>
  </div>
  <EditDialog @closeDialog="closeDialog" :dialogVisible="dialogVisible" :dialogData="dialogData"></EditDialog>
</div>
</template>

<script lang="ts">
  // 引入装饰器
  import { Component, Provide, Vue } from 'vue-property-decorator' 
  import EditDialog from './EditDialog.vue'

  @Component({
    components: {
      EditDialog
    }
  })

  export default class TableData extends Vue {
    @Provide() searchVal: string = '' //搜索值
    @Provide() tableHeight: number = document.body.offsetHeight - 270 //表格高(可视高度)
    @Provide() tableData: any = [] //表格数据
    @Provide() pageNum: number = 1 //当前页
    @Provide() size: number = 5 //请求页数
    @Provide() total: number = 0 //总页数
    @Provide() dialogVisible: boolean = false // 编辑组件可见性
    @Provide() dialogData: object = {
      titel: '',
      type: '',
      level: '',
      count: '',
      date: '',
      _id: ''
    }

    created() {
      this.loadData()
    }

    loadData(): void {
      (this as any).$axios(`/api/profiles/loadMore/${this.pageNum}/${this.size}`)
        .then((res: any) => {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        })
    }

    handleSearch(): void{
      this.searchVal ? this.loadSearchResult() : this.loadData()
    }

    loadSearchResult() {
      (this as any).$axios(`/api/profiles/search/${this.searchVal}/${this.pageNum}/${this.size}`)
        .then((res: any) => {
          this.tableData = res.data.datas.list
          this.total = res.data.datas.total
        })
    }

    // 默认带有参数
    handleSizeChange(val: number): void {
      this.size = val
      this.pageNum = 1
      this.searchVal ? this.loadSearchResult() : this.loadData()
    }
    handleCurrentChange(val: number): void {
      this.pageNum = val
      this.searchVal ? this.loadSearchResult() : this.loadData()
    }

    handleEdit(index: number, row: object) {
      this.dialogData = row
      this.dialogVisible = true
    }

    handleDelete(index: number, row: any) {
      (this as any).$axios.delete(`/api/profiles/delete/${row._id}`)
        .then((res: any) => {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.tableData.splice(index, 1)
        })
    }

    closeDialog() {
      this.dialogVisible = false
    }
  };
</script>

<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pagination {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
