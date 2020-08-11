import Vue from 'vue'
import VueRouter from 'vue-router'

// 未注释的组件引用是懒加载方式
// import Login from './components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
// import Home from './components/Home.vue'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
// import Welcome from './components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')

// import Users from './components/user/Users.vue'
const Users = () => import(/* webpackChunkName: "users_rights_roles" */ './components/user/Users.vue')
// import Rights from './components/power/Rights.vue'
const Rights = () => import(/* webpackChunkName: "users_rights_roles" */ './components/power/Rights.vue')
// import Roles from './components/power/Roles'
const Roles = () => import(/* webpackChunkName: "users_rights_roles" */ './components/power/Roles')

// import Category from './components/goods/Category.vue'
const Category = () => import(/* webpackChunkName: "category_params" */ './components/goods/Category.vue')
// import Params from './components/goods/Params.vue'
const Params = () => import(/* webpackChunkName: "category_params" */ './components/goods/Params.vue')

// import GoodsList from './components/goods/List.vue'
const GoodsList = () => import(/* webpackChunkName: "goodslist_add" */ './components/goods/List.vue')
// import Add from './components/goods/Add.vue'
const Add = () => import(/* webpackChunkName: "goodslist_add" */ './components/goods/Add.vue')

// import Order from './components/order/Order.vue'
const Order = () => import(/* webpackChunkName: "order" */ './components/order/Order.vue')

// import Report from './components/report/Report.vue'
const Report = () => import(/* webpackChunkName: "report" */ './components/report/Report.vue')

Vue.use(VueRouter)

// 解决vue-router在3.0版本后  重复点菜单报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome', // 路由重定向
    children: [ // 在home中展示welcome组件
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Category },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next函数，表示放行
  // next()放行 next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
