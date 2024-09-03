// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加任务附件 POST /task/addTaskAttachment */
export async function addTaskAttachment(
  body: API.AddTaskAttachmentReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { id?: string }; success: boolean }>(
    '/task/addTaskAttachment',
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

/** 删除 POST /task/delTaskAttachment */
export async function delTaskAttachment(
  body: API.DelTaskAttachmentReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/task/delTaskAttachment',
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

/** 获取附件（项目｜任务｜创建者） GET /task/getTaskAttachmentList */
export async function getTaskAttachmentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskAttachmentListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TaskAttachmentItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/task/getTaskAttachmentList', {
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
