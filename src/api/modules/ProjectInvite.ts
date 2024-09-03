// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除邀请码 POST /project/delInviteCode */
export async function delInviteCode(body: API.DelInviteCodeReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/delInviteCode',
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

/** 生成项目邀请链接 POST /project/genInviteCode */
export async function genInviteCode(
  body: API.GenProjectInviteCodeReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { code?: string }; success: boolean }>(
    '/project/genInviteCode',
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

/** 根据邀请码获取邀请信息 GET /project/getInviteInfo */
export async function getInviteInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInviteInfoParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      code?: string;
      projectId?: string;
      projectName?: string;
      inviterId?: string;
      inviterName?: string;
      inviterAvatar?: string;
      joinedCount?: number;
      deadline?: string;
      maxInviteCount?: number;
      joined?: boolean;
    };
    success: boolean;
  }>('/project/getInviteInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取项目下的邀请地址列表 POST /project/getInviteList */
export async function getInviteList(
  body: API.GetProjectMyInviteListReq,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.ProjectMyInviteItem[];
    success: boolean;
  }>('/project/getInviteList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 加入项目 POST /project/inJoinInvite */
export async function inJoinInvite(
  body: API.InJoinInviteProjectReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/inJoinInvite',
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
