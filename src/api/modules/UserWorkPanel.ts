// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 工时面板 添加/订阅用户 POST /work-panel/addUser */
export async function addUser(body: API.AddWorkPanelUserReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/work-panel/addUser',
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

/** 工时面板 删除用户 POST /work-panel/delUser */
export async function delUser(body: API.DelWorkPanelUserReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/work-panel/delUser',
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

/** 获取单个用户的工时记录 POST /work-panel/getLaborHourByUserId */
export async function getLaborHourByUserId(
  body: API.GetWorkLaborHourByUserIdReq,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.WorkLaborHourDetailItem[];
    success: boolean;
  }>('/work-panel/getLaborHourByUserId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户添加的用户工时统计 POST /work-panel/getLaborHourLogs */
export async function getLaborHourLogs(
  body: API.GetWorkLaborHourLogsReq,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      list?: API.WorkLaborHourLogItem[];
      total?: number;
      pageNo?: number;
      pageSize?: number;
    };
    success: boolean;
  }>('/work-panel/getLaborHourLogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户列表(只获取未订阅的用户) POST /work-panel/getUserList */
export async function getUserList(
  body: API.GetWorkPanelUserListReq,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.WorkPanelUserItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/work-panel/getUserList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
