<template>
  <el-card>
    <el-form label-width="123px" :model="formData" :rules="rules" ref="addForm">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select
              v-model="formData.first_cateid"
              placeholder="请选择"
              @change="firstChange"
            >
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="second_cateid">
            <el-select v-model="formData.second_cateid" placeholder="请选择">
              <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname">
            <el-input
              v-model="formData.goodsname"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input
              v-model="formData.price"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input
              v-model="formData.market_price"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="img">
            <el-upload
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="fileChange"
              :auto-upload="false"
              :limit="1"
              :on-exceed="limitTips"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品规格" prop="specsid">
            <el-select
              v-model="formData.specsid"
              placeholder="请选择"
              @change="goodsChange"
            >
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性值" prop="specsattr">
            <el-select v-model="formData.specsattr" placeholder="请选择">
              <el-option
                v-for="(item, index) in specsAttr"
                :key="index"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品" prop="isnew">
            <el-radio-group v-model="formData.isnew">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖" prop="ishot">
            <el-radio-group v-model="formData.ishot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="详细描述" name="secodn">
          <el-form-item prop="description" label-width="0">
            <vue-wangeditor
              ref="editor"
              width="1000px"
              style="height: 500px"
              v-model="formData.description"
              id="editor"
            ></vue-wangeditor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
//导入vue-wangendtor
import vueWangeditor from "vue-wangeditor";

import $axios from "../../common/http";
//获取商品分类
import { getGoodsList } from "../../request/category";
//获取规格列表
import { getSpecsList } from "../../request/specs";
export default {
  components: {
    vueWangeditor,
  },
  data() {
    const validDesc = (rule, value, callback) => {
      const html = this.$refs.editor.getHtml();
      if (html.trim() == "<p><br><p>") {
        return callback(new Error("请输入商品介绍"));
      }
      callback();
    };
    return {
      list: [],
      // tab标签页
      activeName: "first",
      //一级分类
      cateList: [],
      //二级分类
      secondCateList: [],
      //规格列表
      specsList: [],
      specsAttr: [],
      //表单绑定
      formData: {
        first_cateid: "", //一级分类编号 (必须
        second_cateid: "", // 二级分类编号(必须)
        goodsname: "", // 商品名称(必须)
        price: "", // 商品价格
        market_price: "", // 市场价格
        img: "", // 商品图片（文件）
        description: "", // 商品描述
        specsid: "", // 商品规格编号 (必须)
        specsattr: "", // 商品规格属性 (必须)
        isnew: "", // 是否新品 1表示新品
        ishot: "", // 是否热卖推荐 1表示热卖
        status: "", // 状态1正常2禁用
      },
      //表单验证规则
      rules: {
        first_cateid: { required: true, message: "请选择", trigger: "blur" },
        second_cateid: { required: true, message: "请选择", trigger: "blur" },
        goodsname: { required: true, message: "请填写", trigger: "blur" },
        price: { required: true, message: "请填写", trigger: "blur" },
        goodsname: { required: true, message: "请填写", trigger: "blur" },
        market_price: { required: true, message: "请填写", trigger: "blur" },
        description: { validator: validDesc, trigger: "blur" },
        specsid: { required: true, message: "请选择", trigger: "blur" },
        specsattr: { required: true, message: "请选择", trigger: "blur" },
        isnew: { required: true, message: "请选择", trigger: "blur" },
        ishot: { required: true, message: "请选择", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" },
      },
      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.getGoodsList();
    this.getSpecsList();
  },
  mounted() {},
  methods: {
    //一级分类
    async getSpecsList() {
      const res = await getGoodsList();
      this.cateList = res;
    },
    //规格列表
    async getGoodsList() {
      const res = await getSpecsList();
      this.specsList = res;
    },
    handleClick() {},
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件数量超出提示
    limitTips() {
      this.$error("只能穿一张");
    },
    //监听文件域的更新
    fileChange(file) {
      this.formData.img = file.raw;
    },
    //一级菜单change
    firstChange(id) {
      //根据ID找到对应的二级分类
      const index = this.cateList.findIndex((item) => item.id == id);
      //更新二级分类
      this.secondCateList = this.cateList[index].children;
    },
    //监听商品规格更新
    goodsChange(id) {
      //根据ID找到对应的规格属性
      const index = this.specsList.findIndex((item) => item.id == id);
      //更新规格属性
      this.specsAttr = this.specsList[index].attrs;
    },
    //表单提交
    submitForm() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          //创建Formdata实例对象
          const fd = new FormData();
          for (let k in this.formData) {
            fd.append(k, this.formData[k]);
          }
          //手动获取富文本编辑器内容
          fd.append("description", this.$refs.editor.getHtml());
          const res = await this.$http.post("/api/goodsadd", fd);
          if (res.code == 200) {
            this.$success("添加成功");
          } else {
            this.$error("添加失败");
          }
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
