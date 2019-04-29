<template>
  <el-menu
    mode="vertical"
    class="leftMenu"
    background-color="#155592"
    text-color="#fff"
    active-text-color="#409eff"
  >
    <router-link to="/">
      <el-menu-item index="0">
        <i class="el-icon-s-home"></i>
        首页
      </el-menu-item>
    </router-link>
    <template v-for="item in items">
      <el-submenu v-if="item.children" :index="item.path" :key="item.path">
        <template v-slot:title>
          <i :class="item.icon"></i>
          {{item.name}}
        </template>
        <router-link v-for="(citem,cindex) in item.children" :key="cindex" :to="citem.path">
          <el-menu-item :index="citem.path">{{citem.name}}</el-menu-item>
        </router-link>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      items: [
        {
          icon: "el-icon-money",
          name: "资金管理",
          path: "fund",
          children: [{ path: "fundlist", name: "资金流水" }]
        },
        {
          icon: "el-icon-s-data",
          name: "信息管理",
          path: "info",
          children: [{ path: "info", name: "个人信息" }]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.leftMenu{
  height: 100%;
  border-right: none;
}
a {
  text-decoration: none;
}
</style>
