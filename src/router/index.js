import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import layout from '@/pages/layout'

//菜单管理
import menu from '../pages/menu/index'
import menuEdit from '../pages/menu/edit'
import menuAdd from '../pages/menu/add'
//角色管理
import role from '../pages/role/index'
import roleEdit from '../pages/role/edit'
import roleAdd from '../pages/role/add'
Vue.use(Router)
//管理员管理
import admin from '../pages/admin/index'
import adminAdd from '../pages/admin/add'
import adminEdit from '../pages/admin/edit'
//分类管理
import category from '../pages/category/index'
import categoryAdd from '../pages/category/add'
import categoryEdit from '../pages/category/edit'
//商品规格
import specs from '../pages/specs/index'
import specsAdd from '../pages/specs/add'
import specsEdit from '../pages/specs/edit'
//商品管理
import goods from '../pages/goods/index'
import goodsAdd from '../pages/goods/add'
import goodsEdit from '../pages/goods/edit'
//会员管理
import member from '../pages/member/index'
import memberEdit from '../pages/member/edit'
//轮播图管理
import banner from '../pages/banner/index'
import bannerAdd from '../pages/banner/add'
import bannerEdit from '../pages/banner/edit'
//秒杀活动
import seckill from '../pages/seckill/index'
import seckillAdd from '../pages/seckill/add'
import seckillEdit from '../pages/seckill/edit'
//首页树状图
import home from '../pages/home'
const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        title:'登录'
      }
    },
    {
      path:"/",
      component:layout,
      redirect:'/home',
      children:[
        {
          path:"/menu",
          component:menu,
          meta:{
            title:'菜单管理'
          }
        },
        {
          path:'/menu/add',
          component:menuAdd,
          meta:{
            title:'菜单添加'
          }
        },
        {
          path:"/menu/:id",
          component:menuEdit,
          meta:{
            title:'菜单修改'
          }
        },
        {
          path:'/role',
          component:role,
          meta:{
            title:'角色管理'
          }
        },
        {
          path:'/role/add',
          component:roleAdd,
          meta:{
            title:'角色添加'
          }
        },
        {
          path:'/role/:id',
          component:roleEdit,
          meta:{
            title:'角色修改'
          }
        },
        {
          path:'/admin',
          component:admin,
          meta:{
            title:'管理员管理'
          }
        },
        {
          path:'/admin/add',
          component:adminAdd,
          meta:{
            title:'管理员添加'
          }
        },
        {
          path:'/admin/:id',
          component:adminEdit,
          meta:{
            title:'管理员修改'
          }
        },
        {
          path:'/category',
          component:category,
          meta:{
            title:'商品分类'
          }
        },
        {
          path:'/category/add',
          component:categoryAdd,
          meta:{
            title:'商品分类添加'
          }
        },
        {
          path:'/category/:id',
          component:categoryEdit,
          meta:{
            title:'商品分类修改'
          }
        },
        {
          path:'/specs',
          component:specs,
          meta:{
            title:'商品规格'
          }
        },
        {
          path:'/specs/add',
          component:specsAdd,
          meta:{
            title:'商品规格添加'
          }
        },
        {
          path:'/specs/:id',
          component:specsEdit,
          meta:{
            title:'商品规格修改'
          },
        },
        {
          path:'/goods',
          component:goods,
          meta:{
            title:'商品管理'
          }
        },
        {
          path:'/goods/add',
          component:goodsAdd,
          meta:{
            title:'商品管理添加'
          }
        },
        {
          path:'/goods/:id',
          component:goodsEdit,
          meta:{
            title:'商品管理修改'
          }
        },
        {
          path:'/member',
          component:member,
          meta:{
            title:'会员管理'
          }
        },
        {
          path:'/member/:id',
          component:memberEdit,
          meta:{
            title:'会员管理修改'
          }
        },
        {
          path:'/banner',
          component:banner,
          meta:{
            title:'轮播图管理'
          }
        },
        {
          path:'/banner/add',
          component:bannerAdd,
          meta:{
            title:'轮播图管理添加'
          }
        },
        {
          path:'/banner/:id',
          component:bannerEdit,
          meta:{
            title:'轮播图管理修改'
          }
        },
        {
          path:'/seckill',
          component:seckill,
          meta:{
            title:'秒杀管理'
          }
        },
        {
          path:'/seckill/add',
          component:seckillAdd,
          meta:{
            title:'秒杀管理添加'
          }
        },
        {
          path:'/seckill/:id',
          component:seckillEdit,
          meta:{
            title:'秒杀管理修改'
          }
        },
        {
          path:'/home',
          component:home
        }
      ]
    }
  ]
})
  router.beforeEach((to,from,next)=>{
    if(to.path != '/login'){
      const user = JSON.parse(sessionStorage.getItem('userinfo') || '{}')
      if(!user.token){
        return next("/login")
      }
      return next()
    }
    next()
  })
export default router
