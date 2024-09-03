// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建任务类型 POST /task/createTaskOperationLog */
export async function createTaskOperationLog(
  body: API.CreateTaskOperationLogReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { id?: number }; success: boolean }>(
    '/task/createTaskOperationLog',
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

/** 删除任务操作日志 POST /task/delTaskOperationLog */
export async function delTaskOperationLog(
  body: API.DelTaskOperationLogReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTaskOperationLog',
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

/** 获取任务操作日志 GET /task/getTaskOperationLogList */
export async function getTaskOperationLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskOperationLogListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      list?: API.TaskOperationLogItem[];
      pageNo?: number;
      pageSize?: number;
      total?: number;
    };
    success: boolean;
  }>('/task/getTaskOperationLogList', {
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
