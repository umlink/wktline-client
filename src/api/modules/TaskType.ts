// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建任务类型 POST /task/createTaskType */
export async function createTaskType(
  body: API.CreateTaskTypeReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { id?: string }; success: boolean }>(
    '/task/createTaskType',
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

/** 删除任务类型 POST /task/delTaskType */
export async function delTaskType(body: API.DelTaskTypeReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTaskType',
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

/** 获取项目类型列表 GET /task/getTaskTypeList */
export async function getTaskTypeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskTypeListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskTypeItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/task/getTaskTypeList', {
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

/** 更新任务类型 POST /task/updateTaskType */
export async function updateTaskType(
  body: API.UpdateTaskTypeReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/updateTaskType',
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
