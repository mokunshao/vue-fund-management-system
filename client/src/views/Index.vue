<template>
  <div class="Index">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Index",
  components: { Header }
};
</script>

<style lang="scss" scoped>
.Index {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
