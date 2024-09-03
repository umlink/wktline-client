// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 授权登录 POST /auth */
export async function auth(body: API.AuthReq, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
    data?: {
      id?: string;
      username?: string;
      nickname?: string;
      avatar?: string;
      role?: string;
      status?: number;
      token?: string;
      expire?: string;
    };
    success: boolean;
  }>('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
