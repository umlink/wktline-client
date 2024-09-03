// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增一条消息 POST /message/addMsg */
export async function addMsg(body: API.CreateMessageReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/message/addMsg',
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

/** 消息详情 POST /message/getMsgDetail */
export async function getMsgDetail(
  body: API.GetMessageDetailReq,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      id?: string;
      title?: string;
      content?: string;
      taskId?: string;
      taskName?: string;
      contentType?: string;
      msgType?: string;
      projectId?: string;
      receiverId?: string;
      receiverName?: string;
      receiverAvatar?: string;
      senderId?: string;
      senderName?: string;
      senderAvatar?: string;
      createdAt?: string;
    };
    success: boolean;
  }>('/message/getMsgDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取消息列表 GET /message/getMsgList */
export async function getMsgList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMsgListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.MessageItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/message/getMsgList', {
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

/** 消息详情 POST /message/getMsgUnreadCount */
export async function getMsgUnreadCount(
  body: API.GetMessageUnReadCountReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { count?: number }; success: boolean }>(
    '/message/getMsgUnreadCount',
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

/** 已读消息 POST /message/readMsg */
export async function readMsg(body: API.ReadMessageReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/message/readMsg',
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
