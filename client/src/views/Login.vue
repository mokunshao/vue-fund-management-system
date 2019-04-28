<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">记账地带</span>
        <el-form
          :model="loginUser"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="auto"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submitButton" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <small>
            还没有账号？现在
            <router-link to="/register">注册</router-link>
          </small>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "Login",
  component: {},
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
            sessionStorage.setItem("eleToken", res.data.token);
            var decoded = jwt_decode(res.data.token);
            this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUserInfo", decoded);
            this.$router.push("/index");
          });
        }
      });
    }
  },
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "密码长度在6到30个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  background: url("../assets/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  .form_container {
    background: #fff;
    position: absolute;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .manage_tip {
      .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #606266;
        display: inline-block;
        padding-bottom: 15px;
      }
      .submitButton {
        width: 100%;
        padding: 10px;
      }
    }
  }
}
</style>
