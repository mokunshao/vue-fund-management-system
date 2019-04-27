<template>
  <header class="header">
    <el-row>
      <el-col :span="6" class="logoContainer">
        <img src="@/assets/logo.png" alt="logo" class="logo">
        <span class="title">资金管理系统</span>
      </el-col>
      <el-col :span="6" class="userInfo">
        <img src="@/assets/avatar.png" alt="avater" class="avatar">
        <div class="welcome">
          <div class="welcomeMessage">欢迎</div>
          <div class="username">YourName</div>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userInfo: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding: 5px;
  background: #495A80;
  color: #fff;
  .logoContainer {
    .logo {
      height: 50px;
      width: 50px;
      margin-right: 5px;
      vertical-align: middle;
      display: inline-block;
    }
    .title {
      vertical-align: middle;
      font-size: 22px;
      font-family: "Microsoft YaHei";
      letter-spacing: 3px;
    }
  }

  .userInfo {
    text-align: right;
    float: right;
    padding-right: 10px;
    padding: 5px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      display: inline-block;
      margin-right: 5px;
    }
    .welcome {
      display: inline-block;
      vertical-align: middle;
      .welcomeMessage {
        font-size: 12px;
      }
      .username {
        text-align: center;
        font-size: 14px;
        color: #409eff;
        font-weight: bolder;
      }
    }
  }
}
</style>
