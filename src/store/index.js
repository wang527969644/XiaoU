//导入Vuex
import Vue from 'vue'
import Vuex from 'vuex'

//将vuex注册成vue的插件
Vue.use(Vuex)


//创建仓储对象
const store = new Vuex.Store({
    //状态数据
    state:{
        //控制侧边栏的折叠状态
        isCollapse:false,
        //菜单类别
        menus:[],
        //当前用户登陆信息
        username:''
    },
    //更新数据状态的方法
    mutations:{
        //更新isCollapse
        //第一个参数state是系统自动注入的，代表的就是当前藏书中维护数据的对象
        updateIsCollapse(state){
            state.isCollapse =!state.isCollapse
        },
        //初始化menus
        memusInit(state){
            //读取本地存储的数据
            const userInfo = JSON.parse(sessionStorage.getItem('userinfo')|| '{}')
            state.menus = userInfo.menus
        },
        userInfoInit(state){
            const userInfo = JSON.parse(sessionStorage.getItem('userinfo') || '{}')
            state.username = userInfo.username
        }
    },
    //类似于组件中的计算属性
    getters:{
        //次数需要返回值
        asideWith(state){
            return state.isCollapse?'64px':'226px'
    }
},
//异步函数：请求数据接口
actions:{},
//模块
modules:{}
})
//导出store
export default store