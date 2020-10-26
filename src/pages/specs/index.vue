<template>
  <el-card>
    <el-button
      @click="$router.push('/specs/add')"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="100"> </el-table-column>
      <el-table-column prop="specsname" label="属性名称" min-width="100">
      </el-table-column>
      <el-table-column prop="attrs" label="属性值" min-width="150">
        <template v-slot="scope">
          <div class="attrs">
            <el-tag type="success" v-for="k in scope.row.attrs" :key="k.id">
              {{ k }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="status" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
          <el-tag type="error" v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click='$router.push("/specs/"+scope.row.id)'
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getSpecsList } from "../../request/specs";
export default {
  name: "",
  data() {
    return {
      //请求的商品规格
      list: [],
      size: 10,
      page: 1,
    };
  },
  created() {
    this.getSpecsList();
  },
  methods: {
    async getSpecsList() {
      const list = await getSpecsList({ size: this.size, page: this.page });
      if (list) {
        this.list = list;
      }
    },
    del(id){
      this.$myConfire(async ()=>{
        const res = await this.$http.post('/api/specsdelete',{id})
        if(res.code ==200){
          this.$success('删除成功') 
        }else{
          this.$error('删除失败')
        }
        //更新删除后的列表
        const i = this.list.findIndex(item=>item.id==id)
        this.list.splice(i,1)
      })
    },
  },
};
</script>
<style scoped>
.attrs {
  display: flex;
  margin-left: 5px;
}
</style>
