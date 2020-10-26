<template>
  <el-card>
    <el-button
      @click="$router.push('/category/add')"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" min-width="100"> </el-table-column>
      <el-table-column prop="catename" label="分类名称" min-width="100">
      </el-table-column>
      <el-table-column prop="img" label="分类图片">
        <template v-slot="scope">
          <el-image
            v-if="scope.row.img != ''"
            :src="categoryImg + scope.row.img"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="error" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="edit(scope.row.id)"
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
import { getGoodsList } from "../../request/category";
export default {
  name: "",
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    edit(id) {
        this.$router.push(`/category/${id}`)
    },
    del(id) {
      this.$myConfire(async () => {
        const res = await this.$http.post("/api/catedelete", { id });
        if (res.code == 200) {
          const index = this.list.findIndex((item) => item.id == id);
          this.list.splice(index, 1);
         return this.$success("删除成功");
        }
        this.$error('删除失败')
      });
    },
    async getGoodsList() {
      const list = await getGoodsList();
      this.list = list;
    },
  },
};
</script>
<style scoped>
</style>
