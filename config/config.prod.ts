import { defineConfig } from '@umijs/max';

export default defineConfig({
  hash: true,
  chainWebpack(config) {
    config.output.chunkFilename('[contenthash:16].js');
  },
});
