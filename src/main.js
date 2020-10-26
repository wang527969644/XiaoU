// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入element-uinpm
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; 
import './assets/css/reset.css' 
//导入axios
import './common/element'
import  './common/http';
//将element-ui注册成VUE插件：将element-ui中提供的组件注册成全局组件
// 导入vuex仓库
import store from './store';
Vue.use(ElementUI)


Vue.config.productionTip = false

Vue.prototype.categoryImg = 'http://localhost:3000'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
