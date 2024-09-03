// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建任务 POST /task/createTask */
export async function createTask(body: API.CreateTaskReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: { id?: string }; success: boolean }>(
    '/task/createTask',
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

/** 删除任务 POST /task/delTask */
export async function delTask(body: API.DelTaskReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTask',
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

/** 获取子任务列表 GET /task/getChildTaskList */
export async function getChildTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChildTaskListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskDetailItem[]; total?: number; pageNo?: number; pageSize?: number };
    success: boolean;
  }>('/task/getChildTaskList', {
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

/** 获取任务列表 - （时间区间) GET /task/getIntervalTaskList */
export async function getIntervalTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIntervalTaskListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.TaskListByIntervalItem[];
    success: boolean;
  }>('/task/getIntervalTaskList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取任务详情 GET /task/getTaskDetail */
export async function getTaskDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      id?: string;
      name?: string;
      description?: string;
      projectId?: string;
      parentId?: string;
      handlerId?: string;
      statusId?: string;
      groupId?: string;
      typeId?: string;
      priority?: string;
      creatorId?: string;
      startTime?: string;
      endTime?: string;
      planHour?: number;
      laborHour?: number;
      childrenNum?: number;
      createdAt?: string;
      updatedAt?: string;
      statusName?: string;
      statusEnum?: string;
      statusColor?: string;
      typeName?: string;
      typeColor?: string;
      groupName?: string;
      creatorName?: string;
      creatorAvatar?: string;
      handlerName?: string;
      handlerAvatar?: string;
    };
    success: boolean;
  }>('/task/getTaskDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取任务列表 POST /task/getTaskList */
export async function getTaskList(body: API.GetTaskListReq, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskDetailItem[]; total?: number; pageNo?: number; pageSize?: number };
    success: boolean;
  }>('/task/getTaskList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新任务 POST /task/updateTask */
export async function updateTask(body: API.UpdateTaskReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/updateTask',
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
