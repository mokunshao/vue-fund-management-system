<template>
  <div>nhaih</div>
</template>

<script>
export default {
  name: "FundList",
  methods: {
    getProfile() {
      this.$axios.get("/api/profiles").then(
        res => {
          this.tableData = res.data;
        },
        error => console.log(error)
      );
    }
  },
  data() {
    return {
      tableData: {}
    };
  },
  created() {
    this.getProfile();
  }
};
</script>
