<template>
  <el-card>
    <el-form label-width="120px" :rules="rules" :model="formData" ref="addForm">
      <el-form-item label="轮播图名称" prop="title" required>
        <el-input v-model="formData.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="fileChange"
          :limit="1"
          :on-exceed="limitTips"
        >
          <i class="el-icon-plus" v-if="formData.img==''"></i>
          <el-image v-else :src='categoryImg + formData.img'></el-image>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
         <el-button @click="submitForm" type="primary">立即更新</el-button>    
           <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getBannerById, getBannerList } from "../../request/banner";
export default {
  data() {
    return {
      //表单验证规则
      rules: {
        title: { required: true, message: "请填写", trigger: "blur" },
      },
      //和表单进行双向数据绑定
      formData: {
        //获取的ID
        id:this.$route.params.id,
        //轮播图名称
        title: "",
        //图片(文件)
        img: "",
        //状态1正常2禁用
        status: 1,
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.getBannerById();
  
  },
  methods: {
    //根据当前的ID查找出信息
    async getBannerById(id) {
      const res = await getBannerById(this.formData.id);
      this.formData = res
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //立即更新
    submitForm() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          const fd = new FormData();
          for (let k in this.formData) {
            fd.append(k, this.formData[k]);
          }
          fd.append('id',this.$route.params.id)
          const res = await this.$http.post("/api/banneredit", fd);
          if (res.code == 200) {
            this.$success('更新成功');
            this.$router.push('/banner');
          } else {
            this.$error(res.msg);
          }
        } else {
          this.$error("表单验证不通过");
        }
      });
    },
    //重置
    resetForm() {
      this.$refs.addForm.resetFields();
    },
    fileChange(file) {
      this.formData.img = file.raw;
    },
    limitTips() {
      this.$error("最多只能上传一张图片");
    },
  },
};
</script>
<style scoped>
</style>
