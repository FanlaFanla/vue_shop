import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
import Rights from './components/power/Rights.vue'
import Roles from './components/power/Roles'
import Category from './components/goods/Category.vue'
import Params from './components/goods/Params.vue'
import GoodsList from './components/goods/List.vue'
import Add from './components/goods/Add.vue'
import Order from './components/order/Order.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome', //路由重定向
        children: [ //在home中展示welcome组件
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/categories', component: Category },
            { path: '/params', component: Params },
            { path: '/goods', component: GoodsList },
            { path: '/goods/add', component: Add },
            { path: '/orders', component: Order }
        ]
    }
]

const router = new VueRouter({
        routes
    })
    //挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from 代表从哪个路径跳转而来
    //next函数，表示放行
    //next()放行 next('/login')强制跳转
    if (to.path === '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router