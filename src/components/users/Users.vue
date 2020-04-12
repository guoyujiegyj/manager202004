<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--搜索用户-->
      <el-form label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <el-input
                placeholder="请输入内容"
                clearable
                @clear="usersData()"
                v-model="queryInfo.query"
              >
                <el-button slot="append" @click="queryUser" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!--用户类表-->
      <el-table :data="usersList" stripe style="width: 100%">
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!--通过作用域插槽获取数据(获取的是表格每一行的数据)-->
          <template slot-scope="slot">
            <el-switch v-model="slot.row.mg_state" @change="userStateChange(slot.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="slot">
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              :enterable="false"
              content="分享"
              placement="top-start"
            >
              <el-button size="mini" type="warning" icon="el-icon-share"></el-button>
            </el-tooltip>
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!--分页-->
        <el-pagination
          background=""
          @current-change="currentChange"
          :current-page="queryInfo.pagenum"
          :page-size="queryInfo.pagesize"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
      <!--添加用户的模态框-->
      <el-dialog title="添加用户" @close="addFormClose" :visible.sync="dialogVisible" width="45%">
        <el-form
          :model="addUsersInfo"
          :rules="addUsersRules"
          label-width="100px"
          ref="addFormRef"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="addUsersInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addUsersInfo.password"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addUsersInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUsersInfo.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUsers">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { usersList, changeUserState, addUser } from '../../network/home'
export default {
  data() {
    // 自定义电话校验规则
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      return callback(new Error('格式不正确'))
    }

    // 自定义邮箱校验规则
    let checkEmail = (rule, value, callback) => {
      const regEmail = /^(\S)+[@]{1}(\S)+[.]{1}(\w)+$/
      if (regEmail.test(value)) {
        return callback()
      }
      return callback(new Error('格式不正确'))
    }

    return {
      // 请求用户列表时携带的参数
      queryInfo: {
        query: '',
        // 页码
        pagenum: 1,
        // 每页的条数
        pagesize: 5
      },
      // 保存获取来得用户列表
      usersList: [],
      // 用户条数
      total: 0,
      // 控制添加用户模态框的显示隐藏变量
      dialogVisible: false,
      // 添加用户信息
      addUsersInfo: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      addUsersRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          // 使用自定义的校验规则
          { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 调用获取用户列表方法
    this.usersData()
  },
  methods: {
    // 获取用户列表
    usersData() {
      usersList(this.queryInfo).then(({ data: res }) => {
        if (res.meta.status == 200) {
          // console.log(res)
          this.usersList = res.data.users
          this.total = res.data.total
        }
      })
    },

    // 页码值改变时触发
    currentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.usersData()
    },

    // 修改用户状态,点击switch时调用。
    userStateChange(userInfo) {
      // 调用网络层的请求服务器的方法
      changeUserState(userInfo.id, userInfo.mg_state).then(res => {
        //console.log(res)
        if (res.data.meta.status == 200) {
          this.$message.success('更新成功')
        } else {
          // 失败，将页面的status改回原来的状态。
          userInfo.mg_state = !userInfo.mg_state
          this.$message.error('更新失败')
        }
      })
    },

    // 查询用户
    queryUser() {
      this.usersData()
    },
    //
    handleClose() {},

    // dialog关闭时清空表单。
    addFormClose() {
      // this.$refs.addFormRef.resetFields()
    },

    // 确认添加用户时触发
    addUsers() {
      // 先预校验，预校验成功，再发送请求
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请检查输入数据格式')
        }
        addUser(this.addUsersInfo).then(res => {
          if(res.data.meta.status==201) {
            this.$message.success('添加成功')
          }else {
            console.log(console.log(res))
            console.log('shibai')
          }
        })
      })
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
</style>
