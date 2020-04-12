import axios from 'axios'
import store from '../store/index'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    time: 5000
  })
  
  // 设置请求拦截
  instance.interceptors.request.use( config => {
        // 设置请求头    
        config.headers.Authorization = store.state.token; 
        // console.log(config)       
        return config;    
    },    
    error => {        
        //return Promise.error(error);    
        console.log(error)
    })

  return instance(config)
}
