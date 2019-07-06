module.exports = {
  css: {
    modules: true,
    sourceMap: true
  },
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "^": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
