import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home
    }
  ]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果访问的路由需要token认证
  if(to.meta.auth) {
    // 检查本地是否有token
    let token = window.sessionStorage.getItem(token)
    if(!token) {
      next('/login')
    }
    next()
  }else {
    next()
  }
})

export default router
