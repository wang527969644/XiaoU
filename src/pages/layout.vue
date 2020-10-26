<template>
  <fullscreen ref="fullscreen">
    <el-container>
      <!-- 左侧导航 -->
      <el-aside :width="asideWith">
        <h3 class="logo-text">小U商城后台</h3>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#262a32"
          text-color="#f1f1f1"
          active-text-color="#FFF"
          router
          :collapse-transition="false"
          :unique-opened="true"
          :collapse="isCollapse"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- <el-submenu :index="'top'+item.id" v-for="item in menus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="val in item.children" :key="val.id" :index="val.url">{{val.title}}</el-menu-item>
          </el-submenu> -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/admin">管理员管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城设置</span>
            </template>
            <el-menu-item index="/category">分类管理</el-menu-item>
            <el-menu-item index="/specs">规格管理</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <el-button
              @click="toggle"
              type="primary"
              icon="el-icon-s-fold"
              size="mini"
            ></el-button>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"
                >管理中心</el-breadcrumb-item
              >
              <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 返回按钮 -->
            <el-button
              @click="$router.go(-1)"
              size="mini"
              circle
              plain
              icon="el-icon-back"
            ></el-button>
          </div>

          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">
                <i class="el-icon-user"></i>
                个人信息
              </el-dropdown-item>
              <el-dropdown-item command="fullScreen">
                <i class="el-icon-full-screen"></i>
                全屏预览
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                <i class="el-icon-switch-button"></i>
                安全退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 二级路由的出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
import Vue from "vue";
// 导入vuex辅助方法
import { mapState, mapMutations, mapGetters } from "vuex";
// 导入vue-fullscreen全屏预览组件
import fullscreen from "vue-fullscreen";
// 注册插件
Vue.use(fullscreen);
export default {
  computed: {
    // 将vuex中state,getter中的属性映射到组件中
    ...mapState(["isCollapse", "menus", "username"]),
    ...mapGetters(["asideWith"]),
  },
  methods: {
    // 将vuex中mutations中的方法映射到组件中
    ...mapMutations(["updateIsCollapse", "menusInit", "userInfoInit"]),
    toggle() {
      // 通过this.$store.commit出发vuex中mutations中状态操作方法
      // this.$store.commit('updateIsCollapse');
      this.updateIsCollapse();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 下拉款的点击事件处理函数
    handleCommand(command) {
      // console.log(command);
      this[command]();
    },
    userInfo() {},
    // 实现全屏预览的方法
    fullScreen() {
      this.$refs.fullscreen.toggle();
    },
    // 安全退出
    logout() {
      // console.log('logout');
      // 1-删除本地存储中的用户登录信息
      sessionStorage.removeItem("userinfo");
      // 2-重定向到/login
      this.$router.push("/login");
    },
  },
  created() {
    // 初始化左侧导航菜单
    this.menusInit();
    this.userInfoInit();
  },
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b3c0d1;
  color: #333;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.logo-text {
  text-align: center;
  line-height: 60px;
  background: #444;
  color: #fff;
  font-weight: normal;
  letter-spacing: 4px;
  white-space: nowrap;
  overflow: hidden;
}
/* 导航菜单 */
.el-menu-vertical-demo {
  /* 注意: 此处的空格不能缺少 */
  height: calc(100vh - 60px);
  border-right: 0;
}
.el-menu-vertical-demo li {
  text-align: left;
}
/* 设置导航高亮样式 */
.el-menu-item.is-active {
  background: #409eff !important;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-left .el-breadcrumb {
  margin: 0 10px;
}
</style>
