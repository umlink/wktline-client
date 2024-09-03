// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加测试用例参与人 POST /test-case/addCaseActors */
export async function addCaseActors(
  body: API.AddTestCaseActorsReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test-case/addCaseActors',
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

/** 添加修改锁 POST /test-case/addCaseLock */
export async function addCaseLock(body: API.AddTestCaseLockReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test-case/addCaseLock',
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

/** 创建测试用例 POST /test-case/createCase */
export async function createCase(body: API.CreateTestCaseReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test-case/createCase',
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

/** 删除测试用例 POST /test-case/dekCase */
export async function dekCase(body: API.DelTestCaseReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test-case/dekCase',
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

/** 添加测试用例参与人 POST /test-case/delCaseActors */
export async function delCaseActors(
  body: API.DelTestCaseActorsReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test-case/delCaseActors',
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

/** 删除修改锁 POST /test-case/delCaseLock */
export async function delCaseLock(body: API.DelTestCaseLockReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test-case/delCaseLock',
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

/** 测试用例详情 GET /test-case/getCaseDetail */
export async function getCaseDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseDetailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      id?: string;
      name?: string;
      description?: string;
      value?: string;
      progress?: number;
      status?: string;
      creatorId?: string;
      creatorName?: string;
      creatorAvatar?: string;
      actorIds?: string[];
      editorId?: string;
      editorName?: string;
      editorAvatar?: string;
    };
    success: boolean;
  }>('/test-case/getCaseDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取测试用例列表 POST /test-case/getCaseList */
export async function getCaseList(body: API.GetTestCaseListReq, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.TestCaseItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/test-case/getCaseList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新测试用例 POST /test-case/updateCase */
export async function updateCase(body: API.UpdateTestCaseReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test-case/updateCase',
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
