import { defineConfig } from '@umijs/max';

export default defineConfig({
  hash: true,
  codeSplitting: {jsStrategy: 'depPerChunk'},
  chainWebpack(config) {
    config.output.chunkFilename('[contenthash:16].js');
    config.plugin('compression-webpack-plugin').use(require('compression-webpack-plugin'), [
      {
        test: /.(js|css|html)$/i, // 匹配
        threshold: 10240, // 超过10k的文件压缩
        deleteOriginalAssets: false, // 不删除源文件
      },
    ])
  },
});
