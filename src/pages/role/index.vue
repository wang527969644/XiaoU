<template>
  <el-card>
    <el-button
      @click="$router.push('/role/add')"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-divider />
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="80"> </el-table-column>
      <el-table-column prop="rolename" label=" 角色名称" min-width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <!-- 
           老的写法:
           slot-scope=""
           新的写法
           v-slot
         -->
        <template v-slot="scope">
          <el-button
            @click="edit(scope.row.id)"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
//导入获取角色列表的方法
import {getRoleList} from '../../request/role'
export default {
  name: "",
  data() {
    return {
        //角色列表
        list:[]
    };
  },
  created() {
      this.getList()
  },
  mounted() {},
  methods: {
      del(id){
          this.$myConfire(async ()=>{
              const res = await this.$http.post("/api/roledelete",{id})
              if(res.code ==200){
                  this.$success('删除成功')

                  //删除数据
                  const index = this.list.findIndex(item=>item.id == id)
                  //删除数组中的数据
                  this.list.splice(index,1)
              }
          })
      },
      edit(id){
          this.$router.push(`/role/${id}`)
      },
      async getList(){
          const res = await getRoleList()

          //更新数据
          if(res){
              this.list= res
          }
      }
  },
};
</script>
<style scoped>
</style>
