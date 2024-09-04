import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  title: 'wktline-项目管理',
  favicons: ['https://static.web3ling.com/004b68991c74c3d0fd97f61bc4bd97b0.ico'],
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes,
  npmClient: 'yarn',
  tailwindcss: {},
  cssLoaderModules: {
    exportLocalsConvention: 'camelCase',
  },
  theme: {
    '@primary-color': '#00b96b',
  },
  cssMinifier: 'none',
  proxy: {
    '/wkt-api': {
      target: 'http://127.0.0.1:9002',
      changeOrigin: true,
      pathRewrite: { '^/wkt-api': '' },
    },
  },
});
