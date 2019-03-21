module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "http://api.shanyuhai.top/",
        target: "http://localhost:5126/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
