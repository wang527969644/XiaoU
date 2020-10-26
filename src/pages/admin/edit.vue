<template>
  <el-card>
    <el-form
      label-width="120px"
      :model="formData"
      :rules="formRules"
      ref="addForm"
    >
      <el-form-item label="角色名称" prop="roleid">
        <el-select v-model="formData.roleid">
          <el-option value="" label="请选择"></el-option>
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            :label="item.rolename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员账号" prop="username">
        <el-input v-model="formData.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即更新</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
//导入获取角色列表信息的函数
import { getRoleList } from "../../request/role";
import { getInfoById } from "../../request/admin";
export default {
  data() {
    return {
      //角色列表
      roleList: [],
      //跟表单元素向绑定的数据
      formData: {
        //获取动态路由参数
        uid: this.$route.params.id,
        //角色ID
        roleid: "",
        //登陆账号
        username: "",
        //登陆密码
        password: "",
        //状态
        status: 0,
      },
      //表单校验规则
      formRules: {
        roleid: { required: true, message: "请选择", trigger: "blur" },
        username: { required: true, message: "请输入", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" },
      },
    };
  },
  created() {
    this.getRoleList();
    this.getInfo()
  },
  methods: {
    //提交表单
    submitForm() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post("/api/useredit", this.formData);
          if (res.code == 200) {
            this.$success("更新成功");
            this.resetForm();
          } else {
            this.$error("更新失败");
          }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    //重置表单
    async resetForm() {
      this.$refs.addForm.resetFields();
    },
    //获取角色列表信息
    async getRoleList() {
      const res = await getRoleList();
      if (res) {
        this.roleList = res;
      }
    },
    //获取被编辑管理员的默认信息
    async getInfo() {
      const res = await getInfoById(this.formData.uid);
      if (res) {
        //更新数据
        res.password = "";
        this.formData = res;
      }
    },
  },
};
</script>
<style scoped>
.el-form {
  width: 350px;
  margin: auto;
}
</style>
