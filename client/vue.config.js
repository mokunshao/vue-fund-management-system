const path = require("path");
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/")
      }
    }
  }
};
