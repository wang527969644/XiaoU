<template>
  <div>
    <el-button
      @click="$router.push('/banner/add')"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >添加轮播</el-button
    >
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="title" label="轮播图名称" width="180">
        </el-table-column>
        <el-table-column prop="img" label="图片" width="180">
          <template v-slot="scope">
            <el-image :src="categoryImg + scope.row.img"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
            <el-tag type="error" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
  </div>
</template>

<script>
import { getBannerList } from "../../request/banner";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getBannerList();
  },
  methods: {
    async getBannerList() {
      const res = await getBannerList();
      if (res) {
        this.list = res;
      }
    },
    del(id) {
      this.$myConfire(async () => {
        const res = await this.$http.post("/api/bannerdelete", { id });
        if (res.code == 200) {
          const index = this.list.forEach(item=>{item.id == id})
             //更新数据
          this.list.splice(index,1)
          location.reload()
          return this.$success(res.msg);
        }
        this.$error("删除失败");
      });
    },
    edit(id) {
      this.$router.push(`/banner/${id}`);
    },
  },
};
</script>
<style scoped>
</style>
