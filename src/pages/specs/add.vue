<template>
  <el-card>
    <el-form label-width="120px" :model="formData" :rules="rules" ref="addForm">
      <el-form-item label="属性名" prop="specsname">
        <el-input v-model="formData.specsname"></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="attrs">
        <div v-for="(key, index) in attrList" :key="index" class="input">
          <el-input v-model="key.value"></el-input>
          <el-button type="success" @click="addAttr" v-if="index == 0"
            >添加属性</el-button
          >
          <el-button type="danger" @click="delAttr(index)" v-else
            >删除属性</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="add">立即更新</el-button>
        <el-button type="success" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getSpecsById } from "../../request/specs";
export default {
  name: "",
  data() {
    //自定义表单校验规则
    var validateAttr = (rule, value, callback) => {
      this.attrList.forEach((item) => {
        if (item.value == "") {
          callback(new Error("请输入属性值"));
        }
      });
      callback();
    };
    return {
      //根据ID获取的商品规格
      list: [],
      //表单绑定
      formData: {
        //商品规格名称
        specsname: "",
        //商品规格属性值 提交的类型为字符串，形如: 值1,值2,值3
        attrs: "",
        //状态1正常2禁用
        status: 1,
      },
      //属性值
      attrList: [{ value: "" }],
      //表单提交验证
      rules: {
        specsname: { required: true, message: "请输入", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" },
        //自定义表单校验规则
        attrs: { validator: validateAttr, trigger: "blur" },
      },
    };
  },
  created() {},
  methods: {
    //属性添加
    addAttr() {
      if (this.attrList >= 8) {
        return false;
      }
      this.attrList.push({ value: "" });
    },
    //属性删除
    delAttr(i) {
      this.attrList.splice(i, 1);
    },
    //立即添加
    add() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          //将添加后的属性值更新到表单绑定值之中
          this.formData.attrs = this.attrList.map((k) => k.value).join(",");
          const res = await this.$http.post("/api/specsadd", this.formData);
          if (res.code == 200) {
            this.$router.push("/specs");
            return this.$success("添加成功");
          } else {
            this.$error("添加失败");
          }
        }
      });
    },
    //根据ID获取当前商品规格
    async getSpecsById(id) {
      const res = await getSpecsById(id)
      if(res.code == 200){
        this.list
      }
    },
    //取消
    cancel() {
      this.$refs.addForm.resetFields();
      this.attrList = [{ value: "" }];
    },
  },
};
</script>
<style scoped>
form {
  width: 500px;
}
.input {
  display: flex;
  margin: 5px 0;
}
.input .el-input {
  margin-right: 10px;
}
</style>
