<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  component: {}
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.register {
  position: relative;
  height: 100%;
  width: 100%;
  background: url("../assets/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  .form_container {
    width: 500px;
    height: 210px;
    position: absolute;
    border: 1px black solid;
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
        color: #fff;
      }
    }
  }
}
</style>
