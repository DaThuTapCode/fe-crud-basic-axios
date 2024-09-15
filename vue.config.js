const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    port: 3000,
    client: {
      overlay: false // Tắt overlay
    }
  },
  transpileDependencies: true
});
