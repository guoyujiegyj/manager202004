import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../network/request' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录标识，
    // isLogin: false
    token: ''
  },
  mutations: {
    // 修改是否登录标识
    changeIsLogin(state, token) {
      // alert("a")
      state.token = token
    }
  },
  actions: {
    // 登录请求
    asyncLogin({commit}, config) {
      // 调用封装的网络请求方法 request；
      return request({
        url: 'login',
        method: 'post',
        data: config
      })
      // 将返回的数据的data结构出来，保存在变量res
      .then(({data:res})=>{
        if(res.meta.status!==200){
          return 0
        }
        else {
          //console.log(res)
          //window.sessionStorage.setItem('token', res.data.token)
          // 调用mutations的方法
          commit('changeIsLogin', res.data.token)
          return 1
        }
      })
    }
  },
  modules: {
  }
})
