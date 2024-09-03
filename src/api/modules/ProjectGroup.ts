// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建项目分组 POST /project/createProjectGroup */
export async function createProjectGroup(
  body: API.CreateProjectGroupReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: { id?: string }; success: boolean }>(
    '/project/createProjectGroup',
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

/** 删除项目分组 POST /project/delProjectGroup */
export async function delProjectGroup(
  body: API.DelProjectGroupReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/delProjectGroup',
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

/** 获取项目分组列表 GET /project/getProjectGroupList */
export async function getProjectGroupList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectGroupListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.ProjectGroupItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/project/getProjectGroupList', {
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

/** 更新项目分组 POST /project/updateProjectGroup */
export async function updateProjectGroup(
  body: API.UpdateProjectGroupReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/updateProjectGroup',
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
