import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// const register =()=>import('../components/login/register.vue')
const log =()=>import('../components/login/log.vue')
const vform =()=>import('../components/login/form.vue')
const system =()=>import('../components/mainView/system.vue')
const s_home=()=>import('../components/mainView/s-home.vue')
const cash=()=>import('../components/mainView/cash.vue')
const personal=()=>import('../components/mainView/personal.vue')
const router = new VueRouter({
     linkActiveClass: 'light' ,
     routes:[
        {path:'/',redirect:'/login'},
        {path:'/register',component:vform},
        {path:'/login',component:log},
        {
           path:'/system',
           component:system,
           children:[
               {path:'home',component:s_home},
               {path:'cash',component:cash},
               {path:'personal',component:personal}
           ]
         },
     ]
})
router.beforeEach((to,from, next) => {//在路由跳转之前判断
   //token未完成 等后面在写！！！
   const isLogin= localStorage.viewname? true:false //判断localStorage中是否存在，实际开发为判断localStorage中是否有token判断是否在登录状态
    if(to.path=='/login'||to.path=='/register'){//访问路径是登录或注册则继续往下
         next()
    }else{
      isLogin? next():next('/login')//如果登录了则往下执行，未登录则返回至登录界面
    }
})
export default  router