<template>
  <div class="content">
    <div class="login-box">
      <el-form ref="loginFormReset" :model="form" :rules="loginFormRules" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input  v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="formReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { request, intercepter } from '../network/request'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 将actions的函数映射为本组件的函数
    ...mapActions(['asyncLogin']),
    // 表单重置
    formReset() {
      this.$refs.loginFormReset.resetFields()
    },
    // 点击登录触发
    login() {
      // 预校验
      this.$refs.loginFormReset.validate(vali=>{
        // 如果预校验成功。
        if(vali) {
          // 调用actions 里的登录请求方法
          this.asyncLogin(this.form)
          .then(res=>{
            if(res){
              this.$message.success('登录成功')
              this.$router.push('/home')
            }else {
              this.$message.error("登录失败")
            }
          })
          .catch(error=>{
            console.log("shibai")
          })
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  height: 100%;
  background: #2b4b6b;
}
.login-box {
  width: 400px;
  height: 300px;
  background: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 60px 30px 20px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
