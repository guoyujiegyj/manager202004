# manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目开发笔记
### 模块1：登录模块：
ui:el-form, el-form-item, el-button, el-input,
思路： 
vuex里：
点击登录时执行发送请求的函数，将用户填写的信息作为参数传递过去，发送请求的函数调用actions里的请求服务器的函数request，并接受参数；request函数定义在网络模块，是通过axios.create()方法进行封装并返回instance实例；请求服务器的函数配置method，url，data参数，然后发起请求，通过.then()拿到结果，判断状态码，如果是200，保存token，并返回1(因为登录页还需要知道是否请求成功)，否则返回0，然后通过commit调用mutations的方法改变state的登录状态；login页得到mutauions返回的状态后进行判断判断，如果是1，进行跳转，通过$router进行页面跳转。
网络层里
主要进行了根路径，请求超时时间，请求拦截等等的配置，请求拦截主要是为请求头添加了token，因为只有请求时携带token，服务器才会认为你已经登录，才能正常请求数据。
config.headers.Authorization = store.state.token; 
路由配置里：
通过全局导航守卫对组件进行保护，本项目受保护的组件通过meta属性的auth属性进行标识，首先判断是否有此属性，如果有，则说明受保护，需要token认真，判断vuex的state里是否有token，如果有则next()放行；如果没有meta属性，则说明此组件不需要保护，即不需要token认真，放行即可。

### 模块2 用户模块：
ui: el-breadcrumb, el-table, el-table-column, el-tooltip， el-switch，el-pagination
思路：
用户模块主要实现了用户列表的展示，修改用户状态，
通过get方式请求数据，将请求的页码，每页的数据条数作为参数传入(pagenum,pagesize)，具体的请求服务器方法封装在网络，这里只是调用；然后通过.then() 获得返回的结果，如果正确，将用户列表数组保存到当前data，将用户的个数(total)也保存到data；通过ui组件进行数据渲染，el-table 的data属性表示这个表格所要渲染的数据对象，el-table-column是渲染的每一行数据，prop属性表示要渲染的值，即要渲染的数据对象的属性，label表示表格列的名字(在表头显示)，如果要将渲染的数据对象的属性进行状态改变，如将true和false渲染为不同图标，则要用到作用域插槽，即用template标签，他的slot-scope可以获取组件对象slot，slot的row属性即是本行数据。
<!--slot-scope获得组件对象-->
<template slot-scope="slot">
  <!--将true和false渲染为不同颜色的开关-->
  <el-switch v-model="slot.row.mg_state"></el-switch>
</template>
分页：通过currentChange进行页码点击监听，参数是当前点击的页码，当点击某一页时，将参数对象里的页码进行重新赋值为当前的页码参数，重新调用请求数据的方法即可；
修改用户状态：通过el-switch的change事件进行触发，调用网络层的方法并传参，为put请求，参数为用户id和用户状态。
查询用户：为input双向绑定queryInfo的query属性(请求用户列表时携带的数据对象)，点击时直接调用请求用户的数据即可;为input添加clearable属性即可显示出×(即清空)，点击×时若要触发事件，则需绑定@clear事件。通过clear事件，清空input时，重新获取数据。

