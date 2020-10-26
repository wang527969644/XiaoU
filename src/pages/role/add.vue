<template>
  <el-card>
    <el-form
      label-width="120px"
      :model="formData"
      :rules="formRules"
      ref="addForm"
    >
      <el-form-item label="名称" prop="rolename">
        <el-input
          v-model="formData.rolename"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
          ref="tree"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary">立即添加</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {getMenuList} from '../../request/menu'
export default {
  name: "",
  data() {
    return {
      //和表单数据进行双向绑定
      formData: {
        //角色名称
        rolename: "",
        //权限列表
        meus: "",
        //状态
        status: 1 || 2,
      },
      //表单校验规则
      formRules: {
        rolename: { require: true, message: "请输入角色名称", trigger: "blur" },
        rolename: { require: true, message: "请选择状态", trigger: "blur" },
      },
      //树形结构的数据模型
      menuList: [],
      defaultProps: {
        //children是用来指定下级菜单的属性名
        children: "children",
        //告诉树形控件，菜单标题的属性
        label: "title",
      },
    };
  },
  methods: {
    submitForm() {
      //进行表单校验
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // 提交数据
          // 将树形组件的选中的数据更新到this.formData.menus
          // 获取树形控件中被勾选的节点
          // [1,2,4,5]
          const menus = this.$refs.tree.getCheckedKeys()
          this.formData.menus = menus.join(',')
          this.$http.post('/api/roleadd',this.formData)
          .then(res=>{
              if(res.code==200){
                  this.$success('添加成功')
              }else{
                  this.$error('添加失败')
              }
          })
        }else{
            console.log('表单校验不通过')
        }
      });
    },
    resetForm(){
        //通过this.$refs.addForm可以获取当前表单的虚拟DOM对象
         this.$refs.addForm.resetFields()
    },
    async getMenuList(){
        const res=await getMenuList()
        if(res){
            //更新数据
            this.menuList = res
        }
    }
  },
  created(){
      this.getMenuList()
  }
};
</script>
<style scoped>
</style>
