// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录 POST /login */
export async function login(body: API.LoginReq, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
    data?: {
      id?: number;
      username?: string;
      nickname?: string;
      avatar?: string;
      role?: string;
      status?: number;
      token?: string;
      expire?: string;
    };
    success: boolean;
  }>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
