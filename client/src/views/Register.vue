<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">资金管理系统</span>
        <el-form
          :model="registerUser"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="auto"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submitButton" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
          <small>
            已经注册？现在
            <router-link to="/login">登录</router-link>
          </small>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  component: {},
  methods: {
    validatePass2(rule, value, callback) {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(() => {
              this.$message({ message: "账号注册成功", type: "success" });
              this.$router.push("/login");
            });
        }
      });
    }
  },
  data() {
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "employee"
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "用户名长度在2到30个字符之间",
            trigger: "blur"
          }
        ],
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
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "密码长度在6到30个字符之间",
            trigger: "blur"
          },
          { validator: this.validatePass2, trigger: "blur" }
        ],
        identity: [{ required: true, message: "身份不能为空" }]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.register {
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
