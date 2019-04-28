<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "App",
  created() {
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUserInfo", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style lang="scss">
html,
body,
#app {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
}
</style>
