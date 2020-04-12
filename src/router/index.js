import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Users from '../components/users/Users'
import store from '../store/index'

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
      component: Home,
      meta: {
        auth: true
      },
      children : [
        {
          path: '/users',
          component: Users,
          meta: {
            auth: true
          }
        }
      ]
    }
  ]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果访问的路由需要token认证
  if(to.meta.auth) {
    // 检查本地是否有token
    // let token = window.sessionStorage.getItem('token')
    let token = store.state.token
    if(!token) {
      return next('/login')
    }
    next()
  }else {
    return next()
  }
})

export default router
