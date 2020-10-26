<template>
  <div>
    <el-button
      @click="$router.push('/seckill/add')"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >添加活动</el-button
    >
    <el-card>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="title" label="活动名称" width="180">
        </el-table-column>
        <el-table-column prop="begintime" label="开始时间" width="180">
            <template v-slot='scope'>
                {{scope.row.begintime | moments}}
            </template>
        </el-table-column>
        <el-table-column prop="endtime" label="结束时间">
            <template v-slot='scope'>
                {{scope.row.endtime | moments}}
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
            <template v-slot='scope'>
                 <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
                 <el-tag type="error" v-else>禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操纵">
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
import { getSeckillList } from "../../request/seckill";
import moment from 'moment'
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getSeckillList();
  },
  filters:{
      moments(e){
          return moment.unix(e/1000).format('YYYY-MM-DD h:mm:ss')
      }
  },
  methods: {
    async getSeckillList() {
      const res = await getSeckillList();
      if(res){
          this.list = res
      } 
    },
    //修改
    edit(id){
        this.$router.push(`/seckill/${id}`)
    },
    //删除
    del(id){
      this.$myConfire(async ()=>{
        const res = await this.$http.post('/api/seckdelete',{id})
        if(res.code ==200){
          const index = this.list.findIndex(item=>item.id==id)
          this.list.splice(index,1)
          return  this.$success('删除成功')
        }
        return this.$error('删除失败')
      })
    },
  },
};
</script>
<style scoped>
</style>
