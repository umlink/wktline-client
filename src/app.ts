import Api from '@/api/modules';
import { RequestConfig } from '@@/plugin-request/request';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const toLogin = () => (location.href = `/login?target=${encodeURIComponent(location.href)}`);

export async function getInitialState(): Promise<Partial<API.UserBaseInfo> | undefined> {
  const isLoginPage = location.pathname.includes('/login');
  const res = await Api.User.getUseInfo().catch(() => {
    if (isLoginPage) return;
    toLogin();
  });
  if (!res?.data && !isLoginPage) {
    toLogin();
  }
  if (res?.data && isLoginPage) {
    location.href = '/';
  }
  return res?.data;
}
export const request: RequestConfig = {
  timeout: 20000,
  baseURL: '/wkt-api',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  errorConfig: {
    errorHandler() {
      console.log('errorHandler');
    },
    errorThrower() {},
  },
  requestInterceptors: [
    (config: AxiosRequestConfig) => {
      return config;
    },
  ],
  responseInterceptors: [
    (response: AxiosResponse) => {
      return response;
    },
  ],
};
