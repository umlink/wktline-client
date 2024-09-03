// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加任务工时 POST /task/addLaborHour */
export async function addLaborHour(
  body: API.AddTaskLaborHourReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/addLaborHour',
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

/** 删除任务工时记录 POST /task/delLaborHour */
export async function delLaborHour(
  body: API.DelTaskLaborHourReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delLaborHour',
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

/** 获取实际工时记录列表 POST /task/getLaborHourList */
export async function getLaborHourList(
  body: API.GetTaskLaborHourReq,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskLaborHourItem[]; total?: number; pageNo?: number; pageSize?: number };
    success: boolean;
  }>('/task/getLaborHourList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新任务工时记录 POST /task/updateLaborHour */
export async function updateLaborHour(
  body: API.UpdateTaskLaborHourReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/updateLaborHour',
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
