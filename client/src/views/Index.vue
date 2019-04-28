<template>
  <div class="Index">
    <Header/>
    <el-row class="contentWrapper">
      <el-col :span="4">
        <LeftMenu/>
      </el-col>
      <el-col :span="20">
        <router-view class="mainContent"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";

export default {
  name: "Index",
  components: { Header, LeftMenu }
};
</script>

<style lang="scss" scoped>
.Index {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .contentWrapper {
    flex: 1;
    display: flex;
    .mainContent {
      flex: 1;
    }
  }
}

</style>
