const { generateService } = require('@umijs/openapi');

generateService({
  projectName: 'modules',
  schemaPath: 'http://127.0.0.1:9002/api.json',
  serversPath: './src/api',
  apiPrefix: '',
  isCamelCase: false,
  requestImportStatement: 'import {request} from "@umijs/max";',
  dataFields: ['code', 'data', 'message', 'success'],
  hook: {
    /** 自定义函数名称 */
    customFunctionName: (data: any) => {
      return data.path.split('/').pop();
    },
  },
}).then();
