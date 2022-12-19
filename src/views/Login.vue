<template>
  <div class="login-box">
    <div class="login-input-box center">
      <h1>信贷管理系统</h1>
      <el-form :model="loginform" :rules="rules" ref="loginform">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginform.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-goods"
            v-model="loginform.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { doLogin } from "@/apis/user";
export default {
  data() {
    return {
      loginform: {
        username: "admin",
        password: "approve123456.",
      },
      rules: {
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations({
      changeLogin: "user/changeIsLogin",
      changeUserInfo: "user/changeUserInfo",
    }),
    // 登录方法
    async doLogin(form) {
      /* try {
        var res = await this.$ajax.post("/user/login", {
          account: username,
          password: password,
        });
        let token;
        let userInfo;
        if (res?.data?.token) {
          userInfo = jwt.decode(res.data.token, "jindu520");
          console.log(userInfo);
        }
        if (res.code === 20000) {
          // 改变登陆状态
          this.changeLogin(true);
          // 改变用户信息
          this.changeUserInfo({
            username: username,
          });
          this.$router.push("/");
        } else {
          alert("登录失败！！！");
        }
      } catch (e) {
        console.log(e, "err");
      } */
      const [res, err] = await doLogin(form);
      let userInfo;
      if (err) {
        this.$message.error("请求异常：" + err.message);
      }
      if (res.code === 20000) {
        // 改变登陆状态
        this.changeLogin(true);
        // 改变用户信息
        this.changeUserInfo({
          username: form.username,
        });
        this.$router.push(this.$route.query.redirect || "/");
      } else {
        this.$message.error("登录失败！！！");
      }
    },
    onSubmit() {
      this.$refs.loginform.validate((valid) => {
        if (valid) {
          // 登录流程
          this.doLogin(this.loginform);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  height: 100%;
  background: url(../assets/bg2.jpg) no-repeat;
  background-size: cover;

  .login-input-box {
    width: 650px;
    height: 320px;
    padding: 0 30px;
    background-color: #fff;
    ::v-deep .el-input__inner {
      background-color: #f8f8f8;
    }
    h1 {
      text-align: center;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
