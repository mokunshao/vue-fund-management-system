<template>
  <header class="header">
    <el-row>
      <el-col :span="6" class="logoContainer">
        <img src="@/assets/logo.png" alt="logo" class="logo">
        <span class="title">资金管理系统</span>
      </el-col>
      <el-col :span="6" class="userInfo">
        <img :src="userInfo.avatar" alt="avater" class="avatar">
        <div class="welcome">
          <div class="welcomeMessage">欢迎</div>
          <div class="username">{{userInfo.name}}</div>
        </div>
        <!-- <span class="showDropdown"> -->
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- </span> -->
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    handleCommand(command) {
      // this.$message("click on item " + command);
      switch (command) {
        case "myInfo":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      console.log(111);
    },
    logout() {
      sessionStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding: 5px;
  background: #1d1d1d;
  color: #818181;
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
