<template>
  <el-card>
    <el-form
      label-width="120px"
      :model="formData"
      :rules="formRules"
      ref="addForm"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 
            v-if: 根据条件成立与否, 决定是否渲染一个组件
            v-show: 通过css方式隐藏或显示一个组件; 频繁切换, 建议使用v-show
           -->
      <el-form-item label="上级" prop="pid" v-if="formData.type == 2">
        <el-select v-model="formData.pid" placeholder="请选择">
          <el-option :value="0" label="请选择"></el-option>
          <!-- key属性的作用:
                        在数据层和界面层建立一个一一对应的关系, 
                        方便进行局部更新
                   -->
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入菜单名称"
        ></el-input>
      </el-form-item>
      <!-- 表单重置不起作用? -->
      <el-form-item label="图标" v-if="formData.type == 1" prop="icon">
        <el-input
          v-model="formData.icon"
          placeholder="请输入菜单图标"
        ></el-input>
      </el-form-item>
      <!-- 表单重置不起作用? -->
      <el-form-item prop="url" label="地址" v-if="formData.type == 2">
        <el-input
          v-model="formData.url"
          placeholder="请输入菜单地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="100">
        <el-button type="primary" @click="submitForm">立即更新</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getMenuList, getMenuById } from "../../request/menu";
export default {
  data() {
    return {
        //上级菜单列表
      menuList: [],
      formData: {
          id:this.$route.params.id,
        // 0代表顶级菜单
        pid: 0,
        // 状态1正常 2禁用
        type: 1,
        // 标题
        title: "",
        // 图标
        icon: "",
        // 链接地址
        url: "",
        // 状态
        status: 1,
      },
      formRules: {
        type: { required: true, message: "请选择类型", trigger: "blur" },
        tittle: { required: true, message: "请输入菜单名称", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  created() {
    getMenuList().then((res) => {
      this.menuList = res;
    });
    getMenuById(this.formData.id).then(res=>{
        //更新数据
        this.formData = res
    })
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // console.log('表单校验成功');
          const res = await this.$http.post("/api/menuedit", {...this.formData,id:this.$route.params.id});
          if (res.code == 200) {
            return this.$success("更新成功");
          }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    //表单重置
    resetForm() {
      this.$refs.addFrom.resetFields();
    },
  },
};
</script>
<style scoped>
.el-form {
  width: 300px;
  margin: 0 auto;
}
</style>
