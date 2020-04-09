<template>
  <div class="content">
    <div class="login-box">
      <el-form ref="loginFormReset" :model="form" :rules="loginFormRules" label-width="70px">
        <el-form-item label="用户名" prop="uname">
          <el-input  v-model="form.uname">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <el-input type="password" v-model="form.upwd"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info" @click="formReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        uname: '',
        upwd: ''
      },
      loginFormRules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        upwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    formReset() {
      this.$refs.loginFormReset.resetFields()
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
