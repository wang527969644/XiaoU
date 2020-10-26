//导入vue
import Vue from 'vue'
//导入axios
import axios from 'axios'
import {Message} from 'element-ui'



//将axios挂载到VUE原型
Vue.prototype.$http = axios

//配置请求拦截器
axios.interceptors.request.use(function(config){
  const userinfo = JSON.parse(sessionStorage.getItem("userinfo") || '{}')
  config.headers.authorization=userinfo.token
  return config
})
//配置相应拦截器
axios.interceptors.response.use(function(config){
    if(config.data.data ==403){
        Message({
            type:"error",
            message:"错了"
        })
        location.href="#/login"
    }
  return config.data
})

export default axios