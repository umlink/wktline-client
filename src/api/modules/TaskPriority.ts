// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加任务优先级 POST /task/addTaskPriority */
export async function addTaskPriority(
  body: API.AddTaskPriorityReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/addTaskPriority',
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

/** 删除任务优先级（已占用则不可删除） POST /task/delTaskPriority */
export async function delTaskPriority(
  body: API.DelTaskPriorityReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTaskPriority',
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

/** 获取项目优先级列表 GET /task/getTaskPriorityList */
export async function getTaskPriorityList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskPriorityListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskPriorityItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/task/getTaskPriorityList', {
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

/** 更新任务优先级 POST /task/updateTaskPriority */
export async function updateTaskPriority(
  body: API.UpdateTaskPriorityReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/updateTaskPriority',
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
