<template>
  <div class="content">
    <el-container>
      <el-header>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            text-color="#fff"
            :unique-opened="true"
            router
            background-color="#333744"
            active-text-color="#409eff"
>
            <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <!--一级菜单文本-->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item
                :index="'/'+subitem.path+''"
                v-for="subitem in item.children"
                :key="subitem.id"
              >
                <template slot="title">{{subitem.authName}}</template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { asideData } from '../network/home'
export default {
  data() {
    return {
      // 左侧导航菜单数据
      menuList: []
    }
  },
  created() {
    this.getAsideData()
  },
  methods: {
    // 退出登录
    logout() {
      // window.sessionStorage.clear('token')
      // 清除vuex里保存的token
      this.$store.state.token=''
      this.$router.push('/login')
    },
    // 请求左侧导航菜单数据
    getAsideData() {
      asideData().then(({ data: res }) => {
        // console.log(res)
        if (res.meta.status == 200) {
          this.menuList = res.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  text-align: center;
  background: #373d41;
  .el-button {
    float: right;
    margin-top: 9px;
  }
}
.el-aside {
  background: #333744;
}
.el-main {
  background: #eaedf1;
}
.content {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-menu {
  border-right: 0;
}
</style>
