<template>
  <div class="login">
    <div class="login-box">
      <h3 class="title">小U商城后台管理系统</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="请输入账号"
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          >
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        user: [{ required: true, message:"请输入用户名",trigger: "blur" }],
        password: [{ required: true, message:"请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
         const res = await this.$http.post("/api/userlogin",this.ruleForm)
            if(res.code == 200){
                sessionStorage.setItem('userinfo',JSON.stringify(res.list))
                this.$router.push("/")
                this.$message("登陆成功")
            }else{
                this.$message('登陆失败')
            }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../assets/imgs/loginbg.jpeg");
  background-size: cover;
}
.login-box {
    padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
}
.el-button--primary {
  width: 100%;
}
.title{
    color:#409eff;
    margin-bottom: 30px;
    text-align: center;
}
</style>
