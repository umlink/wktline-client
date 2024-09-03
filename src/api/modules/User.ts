// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建新用户 POST /user/createUser */
export async function createUser(body: API.CreateUserReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/user/createUser',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 根据用户id删除用户 POST /user/delUserById */
export async function delUserById(body: API.DelUserByIdReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/user/delUserById',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取用户信息-登录信息 GET /user/getUseInfo */
export async function getUseInfo(options?: { [key: string]: any }) {
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
    };
    success: boolean;
  }>('/user/getUseInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据用户id获取用户信息 GET /user/getUserInfoById */
export async function getUserInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInfoByIdParams,
  options?: { [key: string]: any },
) {
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
    };
    success: boolean;
  }>('/user/getUserInfoById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户列表 GET /user/getUserList */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.UserBaseInfo[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/user/getUserList', {
    method: 'GET',
    params: {
      // pageNo has a default value: 1
      pageNo: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据用户id更新用户信息 POST /user/updateUserInfo */
export async function updateUserInfo(
  body: API.UpdateUserInfoReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/user/updateUserInfo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
