import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")

// 1.安装插件
Vue.use(VueRouter)

const routes = [
  {
    // path: "/vuemall/dist/index.html",
    path: "/",
    redirect: "/vuemall/home"
  },
  {
    path: "/vuemall/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  }
]

// 2.创建实例
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
