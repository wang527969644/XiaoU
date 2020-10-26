<template>
  <el-card>
    <el-form label-width="120px" :model="cateInfo" :rules="rules" ref="addForm">
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="cateInfo.pid">
          <el-option value="" label="请选择"></el-option>
          <el-option :value="0" label="顶级分类"></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input
          v-model="cateInfo.catename"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload='false'
          :on-change="fileChange"
          :limit = '1'
          :on-exceed="limitTips"
        >
          <i class="el-icon-plus" v-if='cateInfo.img==""'></i>
          <el-image v-else :src='categoryImg+cateInfo.img'></el-image>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" porp="status">
        <el-radio-group v-model="cateInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
         <el-button @click="submitForm" type="primary">立即更新</el-button>    
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getGoodsEdit,getGoodsList } from "../../request/category";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //一级分类
      list: [],
      //和表单进行双向数据绑定
      cateInfo: {
        id:this.$route.params.id,
        // 上级分类
        pid: "",
        // 分类名称
        catename: "",
        // 分类图片
        img: "",
        // 状态
        status: 1,
      },
      //表单验证规则
      rules: {
        pid: { required: true, message: "请选择", trigger: "blur" },
        catename: { required: true, message: "请填写", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" },
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //获取这个文件图片的信息
    fileChange(file){
      this.cateInfo.img = file.raw
    },
    submitForm() {
      this.$refs.addForm.validate(async (valid)=>{
        if(valid){
          //将表单的数据转换为forData模式
          const fd = new FormData()
          for(let k in this.cateInfo){
            fd.append(k,this.cateInfo[k])
          }
          const res = await this.$http.post('/api/cateadd',fd)
          if(res.code == 200){
            this.$success('更新成功')
           this.$router.push('/category')
          }else{
            this.$error('更新失败')
          }
        }else{
          console.log('表单更新不通过')
        }
      })
    },
    //获取当前被编辑的信息
    async getGoodsEdit() {
      const res = await getGoodsEdit(this.cateInfo.id)
      if (res) {
        this.cateInfo = res;
      }
    },
    //获取商品列表信息
    async getGoodsList(){
      const res = await getGoodsList()
      if(res){
        this.list = res
      }
    },
    //超出图片限制时的后调函数
    limitTips(){
      this.$error('此处只能传一张图片')
    }
  },
  created() {
    this.getGoodsEdit()
    this.getGoodsList()
  },
};
</script>
<style scoped>
</style>
