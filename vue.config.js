module.exports = {
  css: {
    modules: true,
    sourceMap: true
  },
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "**": {
        target: "http://0.0.0.0:3000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
