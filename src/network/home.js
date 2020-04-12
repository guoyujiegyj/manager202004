import { request } from './request'

// 请求左侧导航菜单数据
export function asideData() {
  return request({
    url: 'menus',
  })
  
}

// 请求用户列表数据
export function usersList(params) {
  return request({
    url: 'users',
    params
  })
}

// 修改用户状态
export function changeUserState(id, type) {
  return request({
    method: 'put',
    url:  `users/${id}/state/${type}`
  })
}

// 添加用户
export function addUser(data) {
  return request({
    method: 'post',
    url: 'users',
    data
  })
}