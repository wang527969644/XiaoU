<template>
  <el-card>
    <el-button
      @click="$router.push('/goods/add')"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column label="一级分类" prop="firstcatename" min-width="80">
      </el-table-column>
      <el-table-column label="二级分类" prop="secondcatename" min-width="80">
      </el-table-column>
      <el-table-column label="商品名称" prop="goodsname" min-width="80">
      </el-table-column>
      <el-table-column label="商品图片" prop="img" min-width="80">
        <template v-slot="scope">
          <el-image
            :src="categoryImg + scope.row.img"
            :style="{ width: '100px' }"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="销售价格" prop="price" min-width="80">
        <template v-slot="scope">
          <span style="color: red">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格" prop="market_price" min-width="80">
        <template v-slot="scope">
          <span>{{ scope.row.market_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" prop="isnew" min-width="80">
        <template v-slot="scope">
          <el-tooltip
            :content="scope.row.isnew == 1 ? '是' : '否'"
            placement="top"
          >
            <el-switch
              @change="updateState(scope.row, 'isnew')"
              v-model="scope.row.isnew"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" prop="ishot" min-width="80">
        <template v-slot="scope">
          <el-tooltip
            :content="scope.row.ishot == 1 ? '是' : '否'"
            placement="top"
          >
            <el-switch
              @change="updateState(scope.row, 'ishot')"
              v-model="scope.row.ishot"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" min-width="80">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="error" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="firstcatename" min-width="100">
        <template v-slot="scope">
          <el-button
            @click="$router.push('/goods/' + scope.row.id)"
            type="primary"
            circle
            icon="el-icon-edit"
            size="mini"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            circle
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size='size'
      :page-sizes="[1, 2, 5, 10, 15]"
      layout="sizes,prev, pager, next"
      :total="total"
      @current-change="pageChange"
      @size-change="sizeChange"
    ></el-pagination>
  </el-card>
</template>

<script>
import { getGoodsList, getTotal, updateGoodsInfo } from "../../request/goods";
export default {
  name: "",
  data() {
    return {
      //商品列表
      list: [],
      //页码
      page: 1,
      //每页显示条数
      size: 5,
      //数据总条数
      total: 0,
    };
  },
  async created() {
    this.getGoodsList();
    this.total = await getTotal();
  },
  methods: {
    //更新状态
    async updateState(info, attr) {
      let postData = { id: info.id };
      postData[attr] = info[attr];
      const res = updateGoodsInfo(postData);
      if (res) {
        this.$success("更新成功");
      } else {
        this.$error("更新失败");
      }
    },
    //页码的page监听
    pageChange(page) {
      console.log(page)
      this.page = page;
      this.getGoodsList();
    },
    //监听size的更新
    sizeChange(size) {
          console.log(typeof size)
      this.size = size;
      this.getGoodsList();
    },
    async getGoodsList() {
      const res = await getGoodsList();
      if (res) {
        return (this.list = res);
      }
    },
  },
};
</script>
<style scoped>
</style>
