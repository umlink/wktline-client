import { defineConfig } from '@umijs/max';

export default defineConfig({
  hash: true,
  esbuildMinifyIIFE: true,
  codeSplitting: { jsStrategy: 'depPerChunk' },
  chainWebpack(config) {
    config.output.chunkFilename('[contenthash:16].js');
    config.plugin('compression-webpack-plugin').use(require('compression-webpack-plugin'), [
      {
        test: /.(js|css|html)$/i, // 匹配
        threshold: 10240, // 超过10k的文件压缩
        deleteOriginalAssets: false, // 不删除源文件
      },
    ]);
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: -12,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 30,
            },
            reactBeautifulDnd: {
              test: /[\\/]node_modules[\\/]react-beautiful-dnd[\\/]/,
              name: 'react-beautiful-dnd',
              chunks: 'all',
              priority: 15,
            },
            reactGantt: {
              test: /[\\/]node_modules[\\/]@umlink\/rc-gantt[\\/]/,
              name: 'rc-gantt',
              chunks: 'all',
              priority: 15,
            },
            reactQuill: {
              test: /[\\/]node_modules[\\/]react-quill[\\/]/,
              name: 'react-quill',
              chunks: 'all',
              priority: 15,
            },
            antd: {
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              name: 'antd',
              chunks: 'all',
              priority: 20, // 优先级高于 vendors
            },
            tributejs: {
              test: /[\\/]node_modules[\\/]tributejs[\\/]/,
              name: 'tributejs',
              chunks: 'all',
              priority: 20, // 优先级高于 vendors
            },
            antdPlot: {
              test: /[\\/]node_modules[\\/]@ant-design\/plots[\\/]/,
              name: 'antd-plots',
              chunks: 'all',
              priority: 1, // 优先级高于 vendors
            },
            dndKit: {
              test: /[\\/]node_modules[\\/](@dnd-kit)[\\/]/,
              name: 'dnd-kit',
              chunks: 'all',
              priority: 15,
            },
            simpleMindMap: {
              test: /[\\/]node_modules[\\/]simple-mind-map[\\/]/,
              name: 'simple-mind-map',
              chunks: 'all',
              priority: 15,
            },
          },
        },
      },
    });
  },
});
