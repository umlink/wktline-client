// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建任务状态 POST /task/createTaskStatus */
export async function createTaskStatus(
  body: API.CreateTaskStatusReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { id?: string }; success: boolean }>(
    '/task/createTaskStatus',
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

/** 删除任务状态 POST /task/delTaskStatus */
export async function delTaskStatus(body: API.DelTaskStatusReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTaskStatus',
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

/** 获取项目状态列表 GET /task/getTaskStatusList */
export async function getTaskStatusList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskStatusListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskStatusItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/task/getTaskStatusList', {
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

/** 更新任务状态详情 POST /task/updateTaskStatus */
export async function updateTaskStatus(
  body: API.UpdateTaskStatusReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/updateTaskStatus',
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

/** 更新任务状态排序 POST /task/updateTaskStatusSort */
export async function updateTaskStatusSort(
  body: API.UpdateTaskStatusSortReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/updateTaskStatusSort',
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
