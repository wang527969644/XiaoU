<template>
  <el-card>
    <el-form label-width="120px" :model="formData" :rules="rules" ref="addForm">
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <div class="block">
          <!-- <span class="demonstration">带快捷选项</span> -->
          <el-date-picker
          
            :v-model="formData.begintime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select
          v-model="formData.first_cateid"
          placeholder="请选择"
          @change="firstChange"
        >
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select
          v-model="formData.second_cateid"
          placeholder="请选择"
          @change="secondChange"
        >
          <el-option
            v-for="item in list2"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="goodsid">
        <el-select v-model="formData.goodsid" placeholder="请选择">
          <el-option
            v-for="item in goods"
            :key="item.id"
            :label="item.catename"
            :value="item.pid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
         <el-button @click="submitForm" type="primary">立即添加</el-button>    
           <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getGoodsList } from "../../request/category";
export default {
  name: "",
  data() {
    return {
      // fid: 0,
      // sid: 0,
      //一级分类
      list: [],
      //二级分类
      list2: [],
      //选择商品
      goods: [],
      //商品列表属性
      formData: {
        //限时秒杀名称
        title: "",
        //开始时间
        begintime: "",
        //结束时间
        endtime: "",
        //商品一级分类编号
        first_cateid: "",
        //商品二级分类编号
        second_cateid: "",
        //商品编号
        goodsid: "",
        //状态1正常2禁用
        status: 1,
      },
      //表单验证规则
      rules: {
        title: { required: true, message: "请填写", trigger: "blur" },
        first_cateid: { required: true, message: "请选择", trigger: "blur" },
        second_cateid: { required: true, message: "请选择", trigger: "blur" },
        goodsid: { required: true, message: "请选择", trigger: "blur" },
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // async function getSeckillAdd(){
    //     const res = await $http.post('/api/seckadd')
    // },
    //监听一级分类
    firstChange(id) {
      const index = this.list.findIndex((item) => item.id == id);
      //更新二级分类
      this.list2 = this.list[index].children;
      // this.fid = index;
    },
    //监听二级分类
    async secondChange(id) {
      // this.sid = id;
      console.log(this.list2)
      const res = await this.$http.get("/api/cateinfo", { params: { id } });
      //更新选择商品分类
      if (res.code == 200) {
        this.goods = [res.list];
      }
    },
    //获取分类列表
    async getGoodsList() {
      const res = await getGoodsList();
      if (res) {
        this.list = res;
      }
    },
    submitForm() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post("/api/seckadd",this.formData);
          if(res.code == 200){
            this.$success(res.msg)
            return this.$router.push('/seckill')
          }
          return this.$error('添加失败')
        }else{
          this.$error('请完善信息')
        }
      });
    },
    resetForm() {
      this.$router.push('/seckill')
    },
  },
};
</script>
<style scoped>
</style>
