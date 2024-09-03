// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建任务分组 POST /task/createTaskGroup */
export async function createTaskGroup(
  body: API.CreateTaskGroupReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { id?: string }; success: boolean }>(
    '/task/createTaskGroup',
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

/** 删除任务分组 POST /task/delTaskGroup */
export async function delTaskGroup(body: API.DelTaskGroupReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTaskGroup',
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

/** 获取项目分组列表 GET /task/getTaskGroupList */
export async function getTaskGroupList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskGroupListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskGroupItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/task/getTaskGroupList', {
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

/** 更新任务分组 POST /task/updateTaskGroup */
export async function updateTaskGroup(
  body: API.UpdateTaskGroupReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/updateTaskGroup',
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
