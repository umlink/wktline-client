// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 项目添加用户 POST /task/addTaskActor */
export async function addTaskActor(body: API.AddTaskActorReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/addTaskActor',
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

/** 删除任务参与人员 POST /task/delTaskActor */
export async function delTaskActor(body: API.DelTaskActorReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTaskActor',
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

/** 获取任务下的用户列表 GET /task/getTaskActor */
export async function getTaskActor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskActorParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskActorItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/task/getTaskActor', {
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
