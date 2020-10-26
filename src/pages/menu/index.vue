<template>
  <div class="menu">
    <el-row>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="$router.push('/menu/add')"
        >添加</el-button
      >
    </el-row>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" min-width="80"> </el-table-column>
      <el-table-column prop="title" label="标题" min-width="80">
      </el-table-column>
      <el-table-column prop="icon" label="类型" min-width="80">
        <template slot-scope="$scope">
          <i :class="$scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址" min-width="80">
      </el-table-column>
      <el-table-column prop="type" label="状态">
        <template slot-scope="$scope">
          <el-tag type="success" v-if="$scope.row.type == 1">正常</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="$scope">
          <!-- scope.row: 代表的是列表数据的每一行{} -->
          <el-button
            @click="edit($scope.row.id)"
            circle
            icon="el-icon-edit"
            size="mini"
            type="success"
          ></el-button>
          <el-button
            @click="del($scope.row.id)"
            circle
            icon="el-icon-delete"
            size="mini"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    edit(id){
      this.$router.push('/menu/'+id)
    },
    del(id){
      this.$myConfire(async ()=>{
        const res=await this.$http.post('/api/menudelete',{id:id})
        if(res.code == 200){
          this.$success('删除成功')

          const index  =this.list.findIndex(item=>item.id==id)
          this.list.splice(index,1)
        }else{
          this.$error('删除失败')
        }
      })
    },
    //获取菜单列表
    getMenuList() {
      this.$http.get("/api/menulist?istree=1").then((res) => {
        if (res.code == 200) {
          this.list = res.list;
        }
      });
    },
  },
  created() {
    this.getMenuList();
  },
};
</script>
<style scoped>
.menu {
  text-align: left;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
